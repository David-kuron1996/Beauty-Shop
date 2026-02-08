from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, categories, products, orders, admin, mpesa

app = FastAPI(title="Beauty Shop API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*", # Allows all origins (localhost, IPs, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(admin.router)
app.include_router(mpesa.router)

@app.get("/")
def root():
    return {"message": "Welcome to Beauty Shop API"}