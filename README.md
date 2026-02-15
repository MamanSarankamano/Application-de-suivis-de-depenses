# 💰 Suivi Dépenses - Application de Gestion Financière

Une application web moderne et sécurisée pour suivre vos revenus et dépenses personnelles.

## ✨ Fonctionnalités

### Backend (API REST)
- ✅ **Authentification sécurisée** avec JWT (Access & Refresh tokens)
- ✅ **Validation des mots de passe** (min 8 chars, majuscule, minuscule, chiffre, caractère spécial)
- ✅ **Rate limiting** (protection contre les attaques par force brute)
- ✅ **Headers de sécurité** (Flask-Talisman)
- ✅ **Gestion des transactions** (CRUD complet avec pagination)
- ✅ **Catégories personnalisables** avec couleurs
- ✅ **Statistiques avancées** (mensuel, par catégorie, solde)
- ✅ **Base de données optimisée** (indexes, Numeric pour montants)
- ✅ **Logging de sécurité** (connexions, inscriptions, erreurs)

### Frontend
- ✅ **Interface moderne** inspirée du design fourni
- ✅ **Sidebar de navigation** avec menu intuitif
- ✅ **Tableau de bord** avec statistiques en temps réel
- ✅ **Graphiques interactifs** (Chart.js)
- ✅ **Gestion des transactions** avec filtres
- ✅ **Responsive design** adapté mobile et desktop
- ✅ **Authentification automatique** avec refresh token

## 🚀 Démarrage Rapide

### Prérequis
- Python 3.8+
- pip
- Navigateur web moderne

### Installation

1. **Cloner le projet**
```bash
cd Projet_Individuel
```

2. **Installer les dépendances backend**
```bash
pip install -r backend/requirements.txt
```

3. **Configurer les variables d'environnement**
Créez un fichier `.env` dans le dossier `backend/` :
```env
SECRET_KEY=votre-cle-secrete-tres-longue
JWT_SECRET_KEY=votre-cle-jwt-encore-plus-longue
DATABASE_URL=sqlite:///expense_tracker.db
```

4. **Initialiser la base de données**
```bash
python backend/setup_db.py
```

5. **Peupler avec des données de test (optionnel)**
```bash
python backend/seed_data.py
```

### Lancement

1. **Démarrer le serveur backend**
```bash
python backend/run.py
```
Le serveur sera accessible sur `http://localhost:5000`

2. **Ouvrir le frontend**
Ouvrez `frontend/index.html` dans votre navigateur ou utilisez un serveur local :
```bash
# Avec Python
cd frontend
python -m http.server 8000
```
Puis accédez à `http://localhost:8000`

## 👤 Comptes de Test

Après avoir exécuté `seed_data.py`, vous pouvez utiliser ces comptes :

| Username | Password | Transactions |
|----------|----------|--------------|
| demo_user | Demo@1234 | ~69 |
| alice_martin | Alice@2024 | ~50 |
| bob_dupont | Bob@2024 | ~97 |

## 📁 Structure du Projet

```
Projet_Individuel/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Application factory
│   │   ├── models.py            # Modèles de données
│   │   └── routes/
│   │       ├── auth.py          # Routes d'authentification
│   │       ├── transactions.py  # Routes des transactions
│   │       └── categories.py    # Routes des catégories
│   ├── config.py                # Configuration
│   ├── run.py                   # Point d'entrée
│   ├── setup_db.py              # Initialisation DB
│   ├── seed_data.py             # Données de test
│   ├── tests.py                 # Tests unitaires
│   └── requirements.txt         # Dépendances Python
├── frontend/
│   ├── css/
│   │   └── style.css            # Styles globaux
│   ├── js/
│   │   └── api.js               # Utilitaires API
│   ├── index.html               # Page d'accueil
│   ├── login.html               # Page de connexion
│   ├── register.html            # Page d'inscription
│   └── dashboard.html           # Tableau de bord
└── docs/
    └── securite_backend.md      # Documentation sécurité
```

## 🔒 Sécurité

### Mesures Implémentées
- **Rate Limiting** : 5 tentatives/min sur auth, 100/h globalement
- **Validation des mots de passe** : Politique stricte
- **JWT avec Refresh Tokens** : Access (1h) + Refresh (30j)
- **Headers de sécurité** : HSTS, X-Content-Type-Options, etc.
- **Logging** : Traçabilité des événements critiques
- **Protection CORS** : Configuré pour `/api/*`

### Recommandations Production
1. Utiliser PostgreSQL au lieu de SQLite
2. Activer `force_https=True` dans Talisman
3. Configurer Redis pour le rate limiting
4. Utiliser des clés secrètes fortes (64+ caractères)
5. Activer le monitoring (Sentry, etc.)

## 📊 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Rafraîchir le token

### Transactions
- `GET /api/transactions` - Liste (avec pagination)
- `POST /api/transactions` - Créer
- `GET /api/transactions/<id>` - Détails
- `DELETE /api/transactions/<id>` - Supprimer

### Statistiques
- `GET /api/transactions/stats/summary` - Résumé global
- `GET /api/transactions/stats/monthly` - Évolution mensuelle
- `GET /api/transactions/stats/by-category` - Par catégorie

### Catégories
- `GET /api/categories` - Liste
- `POST /api/categories` - Créer
- `PUT /api/categories/<id>` - Modifier
- `DELETE /api/categories/<id>` - Supprimer

## 🧪 Tests

Exécuter les tests :
```bash
pytest backend/tests.py -v
```

Test de performance :
```bash
python backend/performance_test.py
```

## 📈 Performance

**Score actuel : 10/10**
- Temps de réponse < 0.1s avec pagination
- Indexes optimisés sur les colonnes fréquemment requêtées
- N+1 queries éliminées avec `joinedload`
- Pagination efficace (50 items/page par défaut)

## 🎨 Design

L'interface s'inspire du design moderne avec :
- **Sidebar bleue** fixe avec navigation
- **Cards** pour les statistiques
- **Graphiques** interactifs (Chart.js)
- **Palette de couleurs** cohérente
- **Animations** fluides et micro-interactions

## 📝 Licence

Ce projet est développé dans un cadre éducatif.

## 👨‍💻 Auteur

Développé avec ❤️ pour la gestion financière personnelle.
