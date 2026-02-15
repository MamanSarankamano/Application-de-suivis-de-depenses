import sys
import os
import random
from datetime import datetime, timedelta
from decimal import Decimal

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app, db
from backend.app.models import User, Category, Transaction

def seed_database():
    """Peuple la base de données avec des données de test réalistes"""
    app = create_app()
    
    with app.app_context():
        # Ensure tables exist
        db.create_all()
        print("Début du peuplement de la base de données...")
        
        # Créer des utilisateurs de test
        users_data = [
            {"username": "demo_user", "email": "demo@expense-tracker.com", "password": "Demo@1234"},
            {"username": "alice_martin", "email": "alice.martin@email.com", "password": "Alice@2024"},
            {"username": "bob_dupont", "email": "bob.dupont@email.com", "password": "Bob@2024"},
        ]
        
        users = []
        for user_data in users_data:
            # Vérifier si l'utilisateur existe déjà
            existing_user = User.query.filter_by(username=user_data['username']).first()
            if existing_user:
                print(f"Utilisateur {user_data['username']} existe déjà, réutilisation...")
                users.append(existing_user)
                continue
                
            user = User(username=user_data['username'], email=user_data['email'])
            user.set_password(user_data['password'])
            db.session.add(user)
            db.session.flush()
            
            # Créer des catégories par défaut pour chaque utilisateur
            categories_data = [
                {'name': 'Salaire', 'color': '#16A34A', 'type': 'revenu'},
                {'name': 'Freelance', 'color': '#10B981', 'type': 'revenu'},
                {'name': 'Investissements', 'color': '#059669', 'type': 'revenu'},
                {'name': 'Alimentation', 'color': '#DC2626', 'type': 'depense'},
                {'name': 'Transport', 'color': '#F59E0B', 'type': 'depense'},
                {'name': 'Logement', 'color': '#1E3A8A', 'type': 'depense'},
                {'name': 'Loisirs', 'color': '#3B82F6', 'type': 'depense'},
                {'name': 'Shopping', 'color': '#EC4899', 'type': 'depense'},
                {'name': 'Santé', 'color': '#8B5CF6', 'type': 'depense'},
                {'name': 'Éducation', 'color': '#6366F1', 'type': 'depense'},
            ]
            
            for cat_data in categories_data:
                category = Category(
                    name=cat_data['name'], 
                    color=cat_data['color'], 
                    user_id=user.id
                )
                db.session.add(category)
            
            users.append(user)
            print(f"[+] Utilisateur cree: {user_data['username']}")
        
        db.session.commit()
        
        # Descriptions réalistes pour les transactions
        transaction_descriptions = {
            'Alimentation': [
                'Courses Carrefour', 'Restaurant Japonais', 'Boulangerie', 
                'Marché local', 'Livraison pizza', 'Café Starbucks',
                'Supermarché Auchan', 'Fast-food', 'Épicerie du coin'
            ],
            'Transport': [
                'Essence Total', 'Ticket bus mensuel', 'Uber trajet maison-bureau',
                'Réparation voiture', 'Parking centre-ville', 'Train Paris-Lyon',
                'Métro forfait', 'Taxi', 'Péage autoroute'
            ],
            'Logement': [
                'Loyer mensuel', 'Électricité EDF', 'Internet/Box', 
                'Assurance habitation', 'Eau', 'Charges copropriété',
                'Réparations appartement', 'Meubles IKEA'
            ],
            'Loisirs': [
                'Cinéma UGC', 'Abonnement Netflix', 'Concert', 
                'Salle de sport', 'Livre Amazon', 'Jeux vidéo Steam',
                'Sortie bowling', 'Parc d\'attractions', 'Abonnement Spotify'
            ],
            'Shopping': [
                'Vêtements H&M', 'Chaussures Nike', 'Électronique Fnac',
                'Cosmétiques Sephora', 'Décoration maison', 'Cadeaux anniversaire',
                'Accessoires', 'Bijoux'
            ],
            'Santé': [
                'Pharmacie', 'Consultation médecin', 'Dentiste',
                'Lunettes opticien', 'Médicaments', 'Salle de sport',
                'Compléments alimentaires', 'Assurance santé'
            ],
            'Éducation': [
                'Livres scolaires', 'Formation en ligne Udemy', 'Cours de langue',
                'Fournitures bureau', 'Abonnement presse', 'Conférence'
            ],
            'Salaire': [
                'Salaire mensuel', 'Prime performance', 'Bonus annuel'
            ],
            'Freelance': [
                'Projet web développement', 'Consultation IT', 'Design graphique',
                'Rédaction article', 'Formation donnée'
            ],
            'Investissements': [
                'Dividendes actions', 'Intérêts livret A', 'Loyer appartement locatif',
                'Vente crypto', 'Remboursement prêt'
            ]
        }
        
        # Créer des transactions pour chaque utilisateur
        total_transactions = 0
        for user in users:
            categories = Category.query.filter_by(user_id=user.id).all()
            
            # Générer entre 50 et 100 transactions par utilisateur
            num_transactions = random.randint(50, 100)
            today = datetime.now()
            
            for _ in range(num_transactions):
                category = random.choice(categories)
                
                # Déterminer le type en fonction de la catégorie
                if category.name in ['Salaire', 'Freelance', 'Investissements']:
                    transaction_type = 'revenu'
                    # Revenus entre 500€ et 5000€
                    amount = Decimal(str(round(random.uniform(500, 5000), 2)))
                else:
                    transaction_type = 'depense'
                    # Dépenses entre 5€ et 500€
                    amount = Decimal(str(round(random.uniform(5, 500), 2)))
                
                # Date aléatoire sur les 12 derniers mois
                days_ago = random.randint(0, 365)
                transaction_date = (today - timedelta(days=days_ago)).date()
                
                # Description aléatoire basée sur la catégorie
                descriptions = transaction_descriptions.get(category.name, [f'Transaction {category.name}'])
                description = random.choice(descriptions)
                
                transaction = Transaction(
                    amount=amount,
                    type=transaction_type,
                    date=transaction_date,
                    description=description,
                    category_id=category.id,
                    user_id=user.id
                )
                db.session.add(transaction)
                total_transactions += 1
            
            print(f"[+] {num_transactions} transactions creees pour {user.username}")
        
        db.session.commit()
        
        # Afficher les statistiques
        print("\n" + "="*60)
        print("STATISTIQUES DE LA BASE DE DONNEES")
        print("="*60)
        
        total_users = User.query.count()
        total_categories = Category.query.count()
        total_trans = Transaction.query.count()
        
        print(f"Utilisateurs: {total_users}")
        print(f"Categories: {total_categories}")
        print(f"Transactions: {total_trans}")
        
        print("\nDetails par utilisateur:")
        for user in users:
            user_transactions = Transaction.query.filter_by(user_id=user.id).count()
            revenus = db.session.query(db.func.sum(Transaction.amount)).filter_by(
                user_id=user.id, type='revenu'
            ).scalar() or 0
            depenses = db.session.query(db.func.sum(Transaction.amount)).filter_by(
                user_id=user.id, type='depense'
            ).scalar() or 0
            balance = float(revenus) - float(depenses)
            
            print(f"\n  {user.username}:")
            print(f"    - Transactions: {user_transactions}")
            print(f"    - Revenus: {float(revenus):.2f} EUR")
            print(f"    - Depenses: {float(depenses):.2f} EUR")
            print(f"    - Solde: {balance:.2f} EUR")
        
        print("\n" + "="*60)
        print("[OK] Base de donnees peuplee avec succes!")
        print("="*60)
        
        print("\nIdentifiants de connexion pour les tests:")
        print("-" * 60)
        for user_data in users_data:
            print(f"  Username: {user_data['username']}")
            print(f"  Password: {user_data['password']}")
            print()

if __name__ == "__main__":
    seed_database()
