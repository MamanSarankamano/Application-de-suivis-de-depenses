# 🚀 Quick Start - Suivi Dépenses

## Démarrage en 3 Minutes ⏱️

### 1️⃣ Démarrer le Serveur

**Windows :**
```bash
# Double-cliquez sur ce fichier :
start_app.bat
```

**Ou en ligne de commande :**
```bash
python backend/run.py
```

✅ Attendez de voir : `Running on http://0.0.0.0:5000`

---

### 2️⃣ Ouvrir l'Application

**Ouvrez dans votre navigateur :**
```
file:///C:/Users/MAMAN SARAN KAMANO/Desktop/Projet_Individuel/frontend/index.html
```

**Ou :**
- Double-cliquez sur `frontend/index.html`
- Choisissez votre navigateur (Chrome, Firefox, Edge...)

---

### 3️⃣ Créer un Compte

1. Cliquez sur **"S'inscrire"** (ou allez sur `register.html`)
2. Remplissez :
   - **Username** : votre_nom
   - **Email** : votre@email.com
   - **Password** : Au moins 8 caractères avec :
     - 1 majuscule (A-Z)
     - 1 minuscule (a-z)
     - 1 chiffre (0-9)
     - 1 caractère spécial (!@#$%...)
3. Cliquez sur **"S'inscrire"**

**Exemple de mot de passe valide :** `MonMotDePasse@2026`

---

### 4️⃣ Se Connecter

1. Allez sur `login.html`
2. Entrez votre **username** et **password**
3. Cliquez sur **"Se connecter"**

✅ Vous êtes redirigé vers le **Dashboard** !

---

### 5️⃣ Ajouter votre Première Transaction

1. Allez sur **"Transactions"** (dans la sidebar)
2. Cliquez sur **"Nouvelle Transaction"**
3. Remplissez :
   - **Type** : Dépense ou Revenu
   - **Montant** : 50.00
   - **Date** : Aujourd'hui
   - **Catégorie** : Alimentation (ou autre)
   - **Description** : "Courses du week-end"
4. Cliquez sur **"Enregistrer"**

✅ Votre transaction apparaît dans la liste !

---

## 🎯 Fonctionnalités Principales

### 📊 Dashboard
- Solde total
- Revenus et dépenses du mois
- Graphiques d'évolution
- Dernières transactions

### 💰 Transactions
- Ajouter des dépenses/revenus
- Modifier ou supprimer
- Filtrer par catégorie
- Rechercher par description

### 📁 Catégories
- 5 catégories par défaut créées automatiquement
- Créer vos propres catégories
- Personnaliser les couleurs

### 📈 Statistiques
- Évolution mensuelle
- Répartition par catégorie
- Indicateurs clés

---

## ❓ Problèmes Courants

### Le serveur ne démarre pas
```bash
# Installez les dépendances
pip install -r backend/requirements.txt

# Puis relancez
python backend/run.py
```

### Impossible de se connecter
- Vérifiez que le serveur est démarré
- Vérifiez votre username/password
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les transactions ne s'affichent pas
- Actualisez la page (F5)
- Vérifiez que vous êtes connecté
- Vérifiez la console (F12)

---

## 📚 Documentation Complète

- **Guide Utilisateur** : `docs/GUIDE_UTILISATEUR.md`
- **État d'Avancement** : `docs/ETAT_AVANCEMENT.md`
- **Plan d'Implémentation** : `docs/PLAN_IMPLEMENTATION.md`
- **README Technique** : `README.md`

---

## 🎉 C'est Parti !

Vous êtes prêt à gérer vos finances ! 💰

**Bon suivi de vos dépenses !** 📊✨

---

*Besoin d'aide ? Consultez le Guide Utilisateur complet.*
