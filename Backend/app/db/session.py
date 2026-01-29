from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

#Creating Engine
engine = create_engine(settings.Database_URL)

#Creating session factory
SessionLocal = sessionmaker(autocommit = False,autoflush= False, bind= engine)