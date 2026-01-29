from app.db.session import engine
from sqlalchemy import text

def check_connection():
    try:
        # Connecting to the database and execute a simple query
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            print(" Connection Successful! The Backend can talk to the Database.")
    except Exception as e:
        print(f" Connection Failed: {e}")

if __name__ == "__main__":
    check_connection()