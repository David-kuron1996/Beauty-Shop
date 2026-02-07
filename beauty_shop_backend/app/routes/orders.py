from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel  # Added for Option A
from app.database import get_db
from app.models import User, Order, CartItem
from app.routes.auth import get_current_user
from app.utils.mpesa import initiate_stk_push
from app.utils.invoice import generate_invoice_pdf
from app.utils.email import send_invoice_email
import uuid

# 1. Define the schema to fetch phone number from the request body
class CheckoutRequest(BaseModel):
    phone_number: str

router = APIRouter()

@router.post("/checkout")
def checkout(
    payload: CheckoutRequest, # Now we fetch data from the customer's request
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # 1. Validate Cart
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # 2. Get Phone Number from the Request (No more hardcoding!)
    user_phone = payload.phone_number 

    # 3. Build Detailed Items List
    items_for_pdf = []
    for item in cart_items:
        items_for_pdf.append({
            "name": item.product.name,
            "quantity": item.quantity,
            "price": item.product.price
        })

    # 4. Financials
    total = sum(item.product.price * item.quantity for item in cart_items)
    invoice_no = f"INV-{uuid.uuid4().hex[:6].upper()}"
    
    # 5. Save Order & Clear Cart
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

    # 6. Generate PDF Invoice
    pdf_path = generate_invoice_pdf(invoice_no, total, current_user.email, items_for_pdf)

    # 7. M-Pesa Trigger using the dynamic phone number
    try:
        mpesa_response = initiate_stk_push(
            phone=user_phone,
            amount=int(total),
            invoice_no=invoice_no
        )
    except Exception as e:
        mpesa_response = {"error": "M-Pesa Service Unavailable", "details": str(e)}

    # 8. Send Email in Background
    background_tasks.add_task(
        send_invoice_email, 
        recipient_email=current_user.email, 
        invoice_no=invoice_no, 
        pdf_path=pdf_path
    )

    return {
        "message": "Checkout initiated.",
        "order_details": {
            "invoice": invoice_no, 
            "total": total,
            "items": items_for_pdf
        },
        "mpesa_status": mpesa_response
    }