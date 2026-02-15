import sys
import os

# Add the project root to sys.path to allow imports from backend.app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app, db
# Import models to ensure they are registered with SQLAlchemy
from backend.app.models import User, Category, Transaction

def init_db():
    app = create_app()
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("Database tables created successfully!")

if __name__ == "__main__":
    init_db()
