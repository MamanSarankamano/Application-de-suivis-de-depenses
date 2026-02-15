#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de test pour vérifier que l'API backend fonctionne correctement
"""

import requests
import json
from datetime import date

# Configuration
BASE_URL = "http://localhost:5000/api"
TEST_USER = {
    "username": "testuser_" + str(date.today().strftime("%Y%m%d")),
    "email": f"test_{date.today().strftime('%Y%m%d')}@example.com",
    "password": "Test@123456"
}

def print_section(title):
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def test_register():
    """Test de l'inscription"""
    print_section("TEST 1: Inscription d'un nouvel utilisateur")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=TEST_USER,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            print("✅ Inscription réussie!")
            return True
        elif response.status_code == 400 and "déjà utilisé" in response.json().get("msg", ""):
            print("⚠️  L'utilisateur existe déjà (c'est normal si vous avez déjà testé)")
            return True
        else:
            print("❌ Échec de l'inscription")
            return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def test_login():
    """Test de la connexion"""
    print_section("TEST 2: Connexion de l'utilisateur")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={
                "username": TEST_USER["username"],
                "password": TEST_USER["password"]
            },
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200 and "access_token" in data:
            print("✅ Connexion réussie!")
            return data["access_token"]
        else:
            print("❌ Échec de la connexion")
            return None
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return None

def test_get_categories(token):
    """Test de récupération des catégories"""
    print_section("TEST 3: Récupération des catégories par défaut")
    
    try:
        response = requests.get(
            f"{BASE_URL}/categories",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        
        print(f"Status Code: {response.status_code}")
        categories = response.json()
        print(f"Nombre de catégories: {len(categories)}")
        print(f"Catégories: {json.dumps(categories, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200 and len(categories) > 0:
            print("✅ Catégories récupérées avec succès!")
            return categories
        else:
            print("❌ Échec de récupération des catégories")
            return []
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return []

def test_create_transaction(token, category_id):
    """Test de création d'une transaction"""
    print_section("TEST 4: Création d'une transaction")
    
    transaction_data = {
        "type": "expense",
        "amount": 50.00,
        "date": str(date.today()),
        "category_id": category_id,
        "description": "Test - Achat de courses"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/transactions",
            json=transaction_data,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 201:
            print("✅ Transaction créée avec succès!")
            return data.get("id")
        else:
            print("❌ Échec de création de la transaction")
            return None
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return None

def test_get_transactions(token):
    """Test de récupération des transactions"""
    print_section("TEST 5: Récupération des transactions")
    
    try:
        response = requests.get(
            f"{BASE_URL}/transactions?page=1&per_page=10",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Nombre de transactions: {len(data.get('data', []))}")
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            print("✅ Transactions récupérées avec succès!")
            return True
        else:
            print("❌ Échec de récupération des transactions")
            return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def test_get_stats(token):
    """Test de récupération des statistiques"""
    print_section("TEST 6: Récupération des statistiques")
    
    try:
        # Test summary
        response = requests.get(
            f"{BASE_URL}/transactions/stats/summary",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Statistiques globales: {json.dumps(data, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            print("✅ Statistiques récupérées avec succès!")
            return True
        else:
            print("❌ Échec de récupération des statistiques")
            return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def main():
    """Fonction principale de test"""
    print("\n" + "🚀 "*20)
    print("  TESTS DE L'API BACKEND - SUIVI DÉPENSES")
    print("🚀 "*20)
    
    # Test 1: Inscription
    if not test_register():
        print("\n⚠️  Continuons quand même avec les autres tests...")
    
    # Test 2: Connexion
    token = test_login()
    if not token:
        print("\n❌ Impossible de continuer sans token d'authentification")
        return
    
    # Test 3: Catégories
    categories = test_get_categories(token)
    if not categories:
        print("\n❌ Impossible de continuer sans catégories")
        return
    
    # Test 4: Création de transaction
    category_id = categories[0]["id"]
    transaction_id = test_create_transaction(token, category_id)
    
    # Test 5: Récupération des transactions
    test_get_transactions(token)
    
    # Test 6: Statistiques
    test_get_stats(token)
    
    # Résumé final
    print_section("RÉSUMÉ DES TESTS")
    print("✅ Tous les tests principaux ont été exécutés!")
    print("\n📝 Prochaines étapes:")
    print("   1. Ouvrez votre navigateur")
    print("   2. Allez sur: file:///C:/Users/MAMAN SARAN KAMANO/Desktop/Projet_Individuel/frontend/register.html")
    print("   3. Créez un compte avec:")
    print(f"      - Username: {TEST_USER['username']}")
    print(f"      - Email: {TEST_USER['email']}")
    print(f"      - Password: {TEST_USER['password']}")
    print("   4. Connectez-vous et testez l'application!")
    print("\n" + "="*60)

if __name__ == "__main__":
    main()
