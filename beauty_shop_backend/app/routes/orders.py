from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Order, CartItem
from app.routes.auth import get_current_user
from app.utils.mpesa import initiate_stk_push
from app.utils.invoice import generate_invoice_pdf
import uuid

router = APIRouter()

@router.post("/checkout")
def checkout(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # 1. Validate Cart
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # 2. Check for Phone Number (Checks both 'phone' and 'phone_number' attribute names)
    user_phone = getattr(current_user, 'phone_number', None) or getattr(current_user, 'phone', None)
    
    if not user_phone:
        raise HTTPException(status_code=400, detail="Phone number missing in user profile")

    # 3. Financials & Invoice Prep
    total = sum(item.product.price * item.quantity for item in cart_items)
    invoice_no = f"INV-{uuid.uuid4().hex[:6].upper()}"
    
    # 4. Save Order & Clear Cart
    new_order = Order(
        user_id=current_user.id,
        total_amount=total,
        invoice_number=invoice_no,
        status="pending"
    )
    db.add(new_order)
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    db.refresh(new_order)

    # 5. Generate PDF
    pdf_path = generate_invoice_pdf(invoice_no, total, current_user.email)

    # 6. M-Pesa Trigger
    mpesa_response = initiate_stk_push(
        phone=user_phone,
        amount=int(total),
        invoice_no=invoice_no
    )

    return {
        "message": "Checkout initiated",
        "order_details": {"id": new_order.id, "invoice": invoice_no, "total": total},
        "pdf_location": pdf_path,
        "mpesa_status": mpesa_response
    }