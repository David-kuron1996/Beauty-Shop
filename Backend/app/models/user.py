from sqlalchemy import Column,String,Integer,Boolean,DateTime
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer,primary_key=True,index=True)
    fullname= Column(String,nullable= False,index=True)
    email=Column(String,nullable= False,index=True)
    hashed_password= Column(String,nullable=False)
    is_Admin=Column(Boolean,default=False)
    is_Active =Column(Boolean,default=False)
    created_at=Column(DateTime(timezone=True), server_default=func.now())
    
    #relationship
    orders = relationship("Order",back_populates="user")