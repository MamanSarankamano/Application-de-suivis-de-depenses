# 🚀 Guide de Démarrage - Suivi Dépenses

## Étape 1 : Vérifier que le Backend est Démarré

Le serveur backend doit être en cours d'exécution sur `http://localhost:5000`

### Vérification rapide :
Ouvrez votre navigateur et accédez à : `http://localhost:5000/api/auth/login`

Vous devriez voir une réponse JSON (même si c'est une erreur, c'est normal).

## Étape 2 : Ouvrir le Frontend

### Option A : Fichier local (Simple)
1. Naviguez vers le dossier `frontend/`
2. Double-cliquez sur `index.html`
3. Votre navigateur s'ouvrira automatiquement

### Option B : Serveur HTTP local (Recommandé)
```bash
cd frontend
python -m http.server 8000
```
Puis ouvrez : `http://localhost:8000`

## Étape 3 : Se Connecter

### Utiliser un Compte de Test
Les comptes suivants sont disponibles après avoir exécuté `seed_data.py` :

**Compte 1 :**
- Username: `demo_user`
- Password: `Demo@1234`

**Compte 2 :**
- Username: `alice_martin`
- Password: `Alice@2024`

**Compte 3 :**
- Username: `bob_dupont`
- Password: `Bob@2024`

### Créer un Nouveau Compte
1. Cliquez sur "S'inscrire"
2. Remplissez le formulaire avec :
   - Un nom d'utilisateur unique
   - Une adresse email valide
   - Un mot de passe fort (min 8 chars, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)
3. Cliquez sur "S'inscrire"

## Étape 4 : Explorer l'Application

### Tableau de Bord
- Visualisez votre solde total
- Consultez vos revenus et dépenses du mois
- Analysez l'évolution mensuelle avec le graphique
- Voyez la répartition de vos dépenses par catégorie

### Transactions
- Ajoutez de nouvelles transactions
- Filtrez par date, type ou catégorie
- Modifiez ou supprimez des transactions existantes

### Statistiques
- Graphiques détaillés par période
- Comparaisons mensuelles
- Tendances de dépenses

### Catégories
- Gérez vos catégories personnalisées
- Attribuez des couleurs pour une meilleure visualisation
- Créez, modifiez ou supprimez des catégories

### Paramètres
- Modifiez vos informations de profil
- Changez votre mot de passe
- Gérez vos préférences

## 🎯 Fonctionnalités Clés

### 1. Ajout Rapide de Transaction
1. Allez dans "Transactions"
2. Cliquez sur "+ Ajouter une Transaction"
3. Remplissez le formulaire :
   - Type (Revenu ou Dépense)
   - Montant
   - Catégorie
   - Description (optionnel)
   - Date
4. Cliquez sur "Ajouter"

### 2. Visualisation des Statistiques
- Les graphiques se mettent à jour automatiquement
- Utilisez les filtres pour affiner les données
- Exportez vos rapports (fonctionnalité à venir)

### 3. Gestion des Catégories
- Créez des catégories personnalisées
- Choisissez des couleurs distinctives
- Les catégories par défaut sont déjà créées :
  - 💰 Salaire (vert)
  - 🍔 Alimentation (rouge)
  - 🚗 Transport (orange)
  - 🏠 Logement (bleu foncé)
  - 🎮 Loisirs (bleu clair)

## ⚠️ Dépannage

### Le backend ne démarre pas
```bash
# Vérifiez que les dépendances sont installées
pip install -r backend/requirements.txt

# Vérifiez que le port 5000 n'est pas utilisé
netstat -ano | findstr :5000
```

### Erreur de connexion au serveur
- Vérifiez que le backend est bien démarré
- Vérifiez l'URL dans `frontend/js/api.js` (doit être `http://localhost:5000`)
- Désactivez temporairement votre pare-feu/antivirus

### Les données ne s'affichent pas
- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs JavaScript
- Assurez-vous d'être connecté (token valide)

### Mot de passe refusé lors de l'inscription
Le mot de passe doit contenir :
- Au moins 8 caractères
- Au moins une lettre majuscule
- Au moins une lettre minuscule
- Au moins un chiffre
- Au moins un caractère spécial (!@#$%^&*(),.?":{}|<>)

Exemple valide : `MonMotDePasse123!`

## 📞 Support

Pour toute question ou problème :
1. Consultez la documentation dans `docs/`
2. Vérifiez les logs du backend dans la console
3. Consultez les erreurs dans la console du navigateur (F12)

## 🎉 Bon Suivi de Vos Finances !

Profitez de votre application de gestion financière et prenez le contrôle de vos dépenses ! 💪
