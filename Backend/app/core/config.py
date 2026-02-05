from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    Database_URL: str
    
    # This part tells Pydantic to read the .env file
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()