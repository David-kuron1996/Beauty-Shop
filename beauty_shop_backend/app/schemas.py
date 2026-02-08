from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# Auth
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_admin: Optional[bool] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None
    is_admin: bool = False
    class Config: from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Product & Category
class CategorySchema(BaseModel):
    id: int
    name: str
    class Config: from_attributes = True

class ProductSchema(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    category_id: int
    class Config: from_attributes = True

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category_id: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None

# Cart
class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemResponse(BaseModel):
    id: int
    product: ProductSchema
    quantity: int
    class Config: from_attributes = True

# Order/Invoice
class OrderResponse(BaseModel):
    id: int
    total_amount: float
    invoice_number: Optional[str] = None
    status: str
    created_at: datetime
    class Config: from_attributes = True

class OrderItemResponse(BaseModel):
    id: int
    product_name: str
    quantity: int
    price: float
    class Config: from_attributes = True

# Mpesa
class MpesaPaymentRequest(BaseModel):
    phone_number: str
    amount: int
    order_id: int

class MpesaCallbackResponse(BaseModel):
    MerchantRequestID: str
    CheckoutRequestID: str
    ResultCode: int
    ResultDesc: str
    CallbackMetadata: Optional[Dict[str, Any]] = None

class MpesaTransactionStatus(BaseModel):
    status: str