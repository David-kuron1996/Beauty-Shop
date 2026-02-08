from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.database import get_db
from app.config import settings
from app.models import User
from app.schemas import UserCreate, Token, UserOut, UserUpdate
# Ensure these are correctly defined in your auth_service.py
from app.services.auth_service import (
    hash_password, 
    verify_password, 
    create_access_token
)

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])

# This tells FastAPI where to look for the token (the login endpoint)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

# --- Authentication Logic ---

@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_data.email,
        password=hash_password(user_data.password),
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone_number=user_data.phone,
        address=user_data.address
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user_data: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# --- Dependency Logic (The Missing Piece) ---

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Decodes the JWT token to identify the user for protected routes like Cart and Orders.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=UserOut)
def update_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    for key, value in user_update.dict(exclude_unset=True).items():
        if key == "password" and value:
            setattr(current_user, "password", hash_password(value))
        elif key == "phone":
            setattr(current_user, "phone_number", value)
        elif key == "is_admin":
            continue
        elif key == "email" and value != current_user.email:
            if db.query(User).filter(User.email == value).first():
                raise HTTPException(status_code=400, detail="Email already registered")
            setattr(current_user, key, value)
        else:
            setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user