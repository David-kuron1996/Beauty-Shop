from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, products, orders, cart, admin, mpesa
from app.config import settings  # Import settings

app = FastAPI(title="Beauty Shop API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth)
app.include_router(products)
app.include_router(orders)
app.include_router(cart)
app.include_router(admin)
app.include_router(mpesa)

@app.get("/")
def root():
    return {
        "message": "Welcome to Beauty Shop API"
    }