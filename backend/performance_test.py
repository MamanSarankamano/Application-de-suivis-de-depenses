import time
import sys
import os
import random
from datetime import datetime, timedelta

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app, db
from backend.app.models import User, Category, Transaction
from flask_jwt_extended import create_access_token

def seed_data(app, num_transactions=5000):
    with app.app_context():
        db.create_all()
        # Clean up existing data
        db.session.query(Transaction).delete()
        db.session.query(Category).delete()
        db.session.query(User).delete()
        db.session.commit()

        # Create user
        user = User(username="perf_tester", email="perf@test.com")
        user.set_password("password")
        db.session.add(user)
        db.session.flush()

        # Create categories
        categories = []
        for i in range(5):
            cat = Category(name=f"Category {i}", user_id=user.id)
            db.session.add(cat)
            categories.append(cat)
        db.session.flush()

        # Bulk insert transactions
        transactions = []
        today = datetime.now()
        for i in range(num_transactions):
            date = today - timedelta(days=random.randint(0, 365))
            t_type = random.choice(['revenu', 'depense'])
            t = Transaction(
                amount=random.uniform(10.0, 1000.0),
                type=t_type,
                date=date.date(),
                description=f"Transaction {i}",
                category_id=random.choice(categories).id,
                user_id=user.id
            )
            transactions.append(t)
        
        db.session.bulk_save_objects(transactions)
        db.session.commit()
        print(f"Seeded {num_transactions} transactions.")
        return user.id

def test_performance():
    app = create_app()
    app.config.update({
        "TESTING": True,
        # Use a file-based sqlite for persistence during test or in-memory if preferred, 
        # but persistent is better to simulate real disk I/O to some extent.
        # We'll use the default from config which is sqlite:///expense_tracker.db
    })

    user_id = seed_data(app)

    with app.app_context():
        token = create_access_token(identity=str(user_id))
        headers = {"Authorization": f"Bearer {token}"}
        client = app.test_client()

        # Test 1: Get Paginated Transactions (Page 1, 20 items)
        start_time = time.time()
        response = client.get('/api/transactions?page=1&per_page=20', headers=headers)
        end_time = time.time()
        duration = end_time - start_time
        print(f"GET /api/transactions (Page 1): {duration:.4f} seconds")
        
        score_deduction = 0
        if duration > 0.5:
            print("  -> WARNING: Response slow (>0.5s).")
            score_deduction += 2
        elif duration > 0.2:
            print("  -> NOTICE: Response slightly slow (>0.2s).")
            score_deduction += 1
        
        # Verify pagination structure
        data = response.get_json()
        if 'meta' not in data or 'data' not in data:
             print("  -> ERROR: Pagination structure missing.")
             score_deduction += 5

        # Test 2: Get Summary Stats
        start_time = time.time()
        client.get('/api/transactions/stats/summary', headers=headers)
        end_time = time.time()
        print(f"GET /api/transactions/stats/summary: {end_time - start_time:.4f} seconds")

        # Test 3: Get Monthly Stats
        start_time = time.time()
        client.get('/api/transactions/stats/monthly', headers=headers)
        end_time = time.time()
        print(f"GET /api/transactions/stats/monthly: {end_time - start_time:.4f} seconds")

        return max(1, 10 - score_deduction)

if __name__ == "__main__":
    score = test_performance()
    print(f"\nPerformance Score: {score}/10")
