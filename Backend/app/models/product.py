from sqlalchemy import Column,String,Integer,Boolean,DateTime,Numeric,ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Product(Base):
    __tablename__= "products"
    
    id = Column(Integer, primary_key=True,index=True)
    name =Column(String,index=True,nullable=False)
    description=Column(String,nullable=False)
    price =Column(Numeric(10,2),nullable=False)
    stock_qty =Column(Integer,default=0)
    image_url =Column(String(500))
    
    #linking it with categoryapp
    category_id =Column(Integer,ForeignKey("categories.id"))
    
    #building the relationship 
    category = relationship("Category", back_populates ="products")