from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Order, CartItem, Product # Added Product for price lookup
from app.schemas import OrderResponse
from app.routes.auth import get_current_user # Use the dependency we just fixed!
from app.utils.helpers import generate_simulated_invoice
import uuid

router = APIRouter()

@router.post("/checkout", response_model=OrderResponse)
def checkout(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # 1. Get Cart Items for the LOGGED IN user
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # 2. Calculate Total (Ensure your CartItem model has a relationship to Product)
    total = sum(item.product.price * item.quantity for item in cart_items)
    
    # 3. Simulate Invoice
    invoice_no = f"INV-{uuid.uuid4().hex[:6].upper()}"
    
    # 4. Create Order linked to the authenticated user
    new_order = Order(
        user_id=current_user.id,
        total_amount=total,
        invoice_number=invoice_no,
        status="pending" # Better to stay 'pending' until M-Pesa is successful!
    )
    
    db.add(new_order)
    
    # 5. Clear cart after creating the order
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    
    db.commit()
    db.refresh(new_order)
    
    return new_order