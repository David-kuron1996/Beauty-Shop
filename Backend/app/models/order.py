from sqlalchemy import Column,String,Integer,Boolean,DateTime,ForeignKey,Numeric
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Order(Base):
    __tablename__= "orders"
    
    id= Column(Integer,primary_key=True,index=True)
    total_price=Column(Numeric(10,2), nullable = True)
    status = Column(String)
    mpesa_checkout_id =Column(String)
    mpesa_receipt =Column(String,index=True)
    phone_number=Column(String)
    created_at =Column(DateTime(timezone=True), server_default=func.now())
    
    #LINKING the order to the user
    user_id = Column(Integer,ForeignKey("users.id"))
    
    #relationship
    user =relationship("User",back_populates="orders")