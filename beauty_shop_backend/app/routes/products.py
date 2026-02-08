from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Product, Category, User
from app.schemas import ProductSchema, ProductCreate, ProductUpdate
from app.routes.auth import get_current_user

router = APIRouter(prefix="/api/v1/products", tags=["products"])

@router.get("/", response_model=List[ProductSchema])
def get_products(
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
        
    return query.offset(skip).limit(limit).all()

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductSchema, status_code=status.HTTP_201_CREATED)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not getattr(current_user, 'is_admin', False):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Check if category exists
    if not db.query(Category).filter(Category.id == product_data.category_id).first():
        raise HTTPException(status_code=400, detail="Category not found")
        
    new_product = Product(**product_data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not getattr(current_user, 'is_admin', False):
        raise HTTPException(status_code=403, detail="Not authorized")
        
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    for key, value in product_update.dict(exclude_unset=True).items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not getattr(current_user, 'is_admin', False):
        raise HTTPException(status_code=403, detail="Not authorized")
        
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        db.delete(product)
        db.commit()