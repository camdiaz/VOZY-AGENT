from app.app import app
from app.database import db

def init_database():
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")

if __name__ == "__main__":
    init_database()
