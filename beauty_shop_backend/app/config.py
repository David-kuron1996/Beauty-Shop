
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql+psycopg2://user:password@localhost/beauty_shop_db"
    
    # Security
    SECRET_KEY: str = "some_long_random_string_here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # M-Pesa (optional)
    MPESA_CONSUMER_KEY: Optional[str] = None
    MPESA_CONSUMER_SECRET: Optional[str] = None
    MPESA_SHORTCODE: Optional[str] = None
    MPESA_PASSKEY: Optional[str] = None
    
    # Email (optional)
    MAIL_USERNAME: Optional[str] = None
    MAIL_PASSWORD: Optional[str] = None
    MAIL_FROM: Optional[str] = None
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Export settings instance
settings = Settings()