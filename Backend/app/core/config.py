from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    
    Database_URL :str
    
    #Telling the pydantic model to look for .env
    
model_config=SettingsConfigDict(env_file=".env", extra = "ignore")

settings = Settings()