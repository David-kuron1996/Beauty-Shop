from sqlalchemy import Column,String,Integer,Boolean,DateTime,Numeric
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Category(Base):
    __tablename__="categories"
    
    id = Column(Integer,primary_key = True,index=True)
    name = Column(String, nullable=False)
    description= Column(String,nullable = False)
    
    #linking it with products
    products = relationship("Product", back_populates="category")
    