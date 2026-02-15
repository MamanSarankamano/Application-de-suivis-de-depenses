import requests
import time

BASE_URL = "http://127.0.0.1:5000/api"

def test_api_flow():
    print("--- Démarrage des tests d'intégration ---")
    
    # 1. Register
    user_data = {
        "username": f"user_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "password": "password123"
    }
    print(f"Inscription de {user_data['username']}...")
    res = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    print(f"Status: {res.status_code}")
    
    # 2. Login
    print("Connexion...")
    res = requests.post(f"{BASE_URL}/auth/login", json={
        "username": user_data["username"],
        "password": user_data["password"]
    })
    token = res.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    print("Connecté avec succès.")
    
    # 3. Get Default Categories
    print("Récupération des catégories par défaut...")
    res = requests.get(f"{BASE_URL}/categories", headers=headers)
    categories = res.json()
    print(f"Catégories trouvées: {[c['name'] for c in categories]}")
    
    cat_id = categories[0]['id']
    
    # 4. Add Transaction
    print("Ajout d'une transaction...")
    res = requests.post(f"{BASE_URL}/transactions", json={
        "amount": 1200.50,
        "type": "revenu",
        "category_id": cat_id,
        "description": "Salaire Test",
        "date": "2024-02-11"
    }, headers=headers)
    print(f"Transaction ajoutée (ID: {res.json().get('id')})")
    
    # 5. Check Summary
    print("Vérification du solde...")
    res = requests.get(f"{BASE_URL}/transactions/stats/summary", headers=headers)
    print(f"Résumé: {res.json()}")

if __name__ == "__main__":
    try:
        test_api_flow()
    except Exception as e:
        print(f"Erreur: {e}. Assurez-vous que le serveur Flask (run.py) est lancé.")
