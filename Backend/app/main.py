from fastapi import FastAPI
from app.api.v1.auth import router as auth_router # Or wherever your auth file is

app = FastAPI()

# This is the part that connects your code to the URL
app.include_router(auth_router)