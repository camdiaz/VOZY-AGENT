from flask_sqlalchemy import SQLAlchemy
from app.config import DATABASE_URL
from flask import Flask

db = SQLAlchemy()

def init_db():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    db.init_app(app)
    with app.app_context():
        db.create_all()
