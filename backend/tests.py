import pytest
from backend.app import create_app, db
from backend.app.models import User, Category, Transaction
from flask_jwt_extended import create_access_token

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "JWT_SECRET_KEY": "test-secret"
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def auth_header(app):
    with app.app_context():
        user = User(username="testuser", email="test@example.com")
        user.set_password("Test@1234")
        db.session.add(user)
        db.session.commit()
        token = create_access_token(identity=str(user.id))
        return {"Authorization": f"Bearer {token}"}

def test_register(client):
    response = client.post("/api/auth/register", json={
        "username": "newuser",
        "email": "new@example.com",
        "password": "Test@1234"
    })
    assert response.status_code == 201
    assert b"User registered successfully" in response.data

def test_login(client):
    # First register
    client.post("/api/auth/register", json={
        "username": "loginuser",
        "email": "login@example.com",
        "password": "Test@1234"
    })
    # Then login
    response = client.post("/api/auth/login", json={
        "username": "loginuser",
        "password": "Test@1234"
    })
    assert response.status_code == 200
    assert "access_token" in response.get_json()

def test_create_transaction(client, auth_header):
    # Need a category first
    client.post("/api/categories", json={"name": "Test Cat"}, headers=auth_header)
    
    response = client.post("/api/transactions", json={
        "type": "depense",
        "amount": 50.0,
        "category_id": 1,
        "description": "Test Transaction",
        "date": "2023-10-01"
    }, headers=auth_header)
    
    assert response.status_code == 201
    assert b"Transaction created" in response.data
