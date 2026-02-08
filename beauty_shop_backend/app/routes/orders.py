from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Order, OrderItem, CartItem, User
from app.schemas import OrderResponse
from app.routes.auth import get_current_user
import uuid

router = APIRouter(prefix="/api/v1/orders", tags=["orders"])

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get cart items
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total
    total_amount = sum(item.product.price * item.quantity for item in cart_items)
    
    # Create order
    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        invoice_number=f"INV-{uuid.uuid4().hex[:8].upper()}",
        status="pending"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    # Create order items
    for item in cart_items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.product.price
        )
        db.add(order_item)
    
    # Clear cart
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    
    return new_order

@router.get("/", response_model=List[OrderResponse])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    if order.user_id != current_user.id and not getattr(current_user, 'is_admin', False):
        raise HTTPException(status_code=403, detail="Not authorized")
        
    return order