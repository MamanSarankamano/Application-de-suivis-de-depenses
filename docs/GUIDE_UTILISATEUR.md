# 📖 Guide Utilisateur - Suivi Dépenses

## 🎯 Bienvenue dans votre Journal de Suivi de Dépenses !

Cette application vous permet de **gérer vos finances personnelles** de manière simple et efficace. Vous pouvez :
- ✅ Noter toutes vos dépenses et revenus
- ✅ Catégoriser vos transactions
- ✅ Visualiser des statistiques détaillées
- ✅ Comprendre où va réellement votre argent
- ✅ Suivre l'évolution de vos finances dans le temps

---

## 🚀 Démarrage Rapide

### 1. Lancer l'Application

**Option A : Utiliser le script automatique (recommandé)**
1. Double-cliquez sur `start_app.bat`
2. Le serveur backend va démarrer automatiquement
3. Attendez que le message "Running on http://0.0.0.0:5000" apparaisse

**Option B : Démarrage manuel**
```bash
# Dans un terminal, depuis le dossier du projet
python backend/run.py
```

### 2. Ouvrir l'Application dans le Navigateur

1. Ouvrez votre navigateur web (Chrome, Firefox, Edge...)
2. Allez sur : `file:///C:/Users/MAMAN SARAN KAMANO/Desktop/Projet_Individuel/frontend/index.html`
3. Ou ouvrez directement le fichier `frontend/index.html` avec votre navigateur

---

## 👤 Première Utilisation

### Créer un Compte

1. Sur la page d'accueil, cliquez sur **"S'inscrire"** ou allez sur `register.html`
2. Remplissez le formulaire :
   - **Nom d'utilisateur** : Choisissez un nom unique
   - **Email** : Votre adresse email
   - **Mot de passe** : Au moins 8 caractères avec :
     - Une majuscule
     - Une minuscule
     - Un chiffre
     - Un caractère spécial (!@#$%^&*...)
3. Cliquez sur **"S'inscrire"**
4. Si tout est correct, vous serez redirigé vers la page de connexion

### Se Connecter

1. Allez sur `login.html`
2. Entrez votre **nom d'utilisateur** et **mot de passe**
3. Cliquez sur **"Se connecter"**
4. Vous serez redirigé vers le **Tableau de Bord**

---

## 📊 Utilisation de l'Application

### 🏠 Tableau de Bord (Dashboard)

Le tableau de bord est votre **vue d'ensemble** de vos finances :

#### Indicateurs Principaux
- **Solde Total** : Revenus - Dépenses
- **Revenus (30j)** : Total des revenus du dernier mois
- **Dépenses (30j)** : Total des dépenses du dernier mois

#### Graphiques
1. **Performance Mensuelle** : Évolution de vos revenus et dépenses sur les derniers mois
2. **Répartition** : Visualisation de vos dépenses par catégorie

#### Opérations Récentes
- Les 5 dernières transactions
- Cliquez sur "Voir Tout l'Historique" pour accéder à la page complète

---

### 💰 Transactions

#### Ajouter une Transaction

1. Allez sur la page **"Transactions"**
2. Cliquez sur le bouton **"Nouvelle Transaction"**
3. Remplissez le formulaire :
   - **Type** : Dépense ou Revenu
   - **Montant** : Le montant en euros (ex: 50.00)
   - **Date** : Date de la transaction
   - **Catégorie** : Choisissez une catégorie (Alimentation, Transport, etc.)
   - **Description** : Une description courte (ex: "Courses du week-end")
4. Cliquez sur **"Enregistrer"**

#### Modifier une Transaction

1. Dans la liste des transactions, cliquez sur l'icône **✏️ (crayon)**
2. Modifiez les informations souhaitées
3. Cliquez sur **"Enregistrer"**

#### Supprimer une Transaction

1. Cliquez sur l'icône **🗑️ (poubelle)**
2. Confirmez la suppression
3. La transaction sera supprimée définitivement

#### Filtrer les Transactions

Utilisez les filtres en haut de la page :
- **Recherche** : Tapez un mot-clé dans la description
- **Catégorie** : Filtrez par catégorie spécifique
- **Type** : Affichez uniquement les dépenses ou les revenus

---

### 📁 Catégories

Les catégories vous permettent d'**organiser vos transactions**.

#### Catégories par Défaut

Lors de votre inscription, 5 catégories sont créées automatiquement :
- 💰 **Salaire** (vert) - Pour vos revenus
- 🍔 **Alimentation** (rouge) - Courses, restaurants
- 🚗 **Transport** (orange) - Essence, transports en commun
- 🏠 **Logement** (bleu foncé) - Loyer, factures
- 🎮 **Loisirs** (bleu clair) - Sorties, hobbies

#### Créer une Nouvelle Catégorie

1. Allez sur la page **"Catégories"**
2. Cliquez sur **"Nouvelle Catégorie"**
3. Remplissez :
   - **Nom** : Le nom de la catégorie (ex: "Santé", "Éducation")
   - **Couleur** : Choisissez une couleur pour identifier facilement la catégorie
4. Cliquez sur **"Enregistrer"**

#### Modifier une Catégorie

1. Cliquez sur l'icône **✏️** à côté de la catégorie
2. Modifiez le nom ou la couleur
3. Cliquez sur **"Enregistrer"**

#### Supprimer une Catégorie

1. Cliquez sur l'icône **🗑️**
2. Confirmez la suppression
3. ⚠️ **Attention** : Si des transactions utilisent cette catégorie, elles seront également affectées

---

### 📈 Statistiques

La page **Statistiques** vous offre une vue détaillée de vos finances :

#### Graphiques Disponibles

1. **Évolution Mensuelle** : Tendance de vos revenus et dépenses
2. **Répartition par Catégorie** : Où va votre argent
3. **Comparaison Mois par Mois** : Évolution dans le temps

#### Indicateurs Clés

- **Solde actuel**
- **Moyenne mensuelle** des dépenses
- **Catégorie la plus dépensière**
- **Tendance** (en hausse ou en baisse)

---

### ⚙️ Paramètres

Dans la page **Paramètres**, vous pouvez :

#### Modifier votre Profil
- Changer votre nom d'utilisateur
- Modifier votre email
- Mettre à jour votre mot de passe

#### Sécurité
- Voir les informations de sécurité
- Déconnexion

---

## 💡 Conseils d'Utilisation

### 📝 Bonnes Pratiques

1. **Enregistrez vos transactions immédiatement**
   - Ne laissez pas s'accumuler les transactions non enregistrées
   - Utilisez votre smartphone pour noter rapidement

2. **Soyez précis dans les descriptions**
   - "Courses Carrefour 15/02" est mieux que "Courses"
   - Cela facilite la recherche plus tard

3. **Utilisez les catégories de manière cohérente**
   - Ne créez pas trop de catégories (5-10 suffisent)
   - Regroupez les dépenses similaires

4. **Consultez vos statistiques régulièrement**
   - Une fois par semaine minimum
   - Identifiez les postes de dépenses à optimiser

5. **Définissez des objectifs**
   - Budget mensuel par catégorie
   - Objectif d'épargne

### 🎯 Exemples d'Utilisation

#### Scénario 1 : Suivi Quotidien
```
Matin : Café (3€) → Catégorie "Alimentation"
Midi : Déjeuner (12€) → Catégorie "Alimentation"
Soir : Essence (40€) → Catégorie "Transport"
```

#### Scénario 2 : Revenus
```
1er du mois : Salaire (2500€) → Catégorie "Salaire"
15 du mois : Prime (200€) → Catégorie "Salaire"
```

#### Scénario 3 : Dépenses Importantes
```
Loyer (800€) → Catégorie "Logement"
Assurance (50€) → Catégorie "Logement"
Électricité (60€) → Catégorie "Logement"
```

---

## 🔒 Sécurité et Confidentialité

### Vos Données sont Protégées

- ✅ **Mots de passe chiffrés** : Impossible de récupérer votre mot de passe en clair
- ✅ **Authentification JWT** : Connexion sécurisée avec tokens
- ✅ **Données isolées** : Chaque utilisateur voit uniquement ses propres données
- ✅ **Base de données locale** : Vos données restent sur votre ordinateur

### Conseils de Sécurité

1. **Utilisez un mot de passe fort**
   - Au moins 12 caractères
   - Mélange de lettres, chiffres et symboles
   - Unique pour cette application

2. **Ne partagez jamais vos identifiants**
   - Même avec des proches
   - L'application est personnelle

3. **Déconnectez-vous après utilisation**
   - Surtout sur un ordinateur partagé
   - Bouton "Déconnexion" dans la sidebar

---

## 🐛 Résolution de Problèmes

### Le serveur ne démarre pas

**Problème** : Erreur lors du lancement de `start_app.bat`

**Solutions** :
1. Vérifiez que Python est installé : `python --version`
2. Installez les dépendances : `pip install -r backend/requirements.txt`
3. Vérifiez que le port 5000 n'est pas déjà utilisé

### Impossible de se connecter

**Problème** : "Nom d'utilisateur ou mot de passe incorrect"

**Solutions** :
1. Vérifiez que vous avez bien créé un compte
2. Vérifiez l'orthographe de votre nom d'utilisateur
3. Assurez-vous que le serveur backend est démarré
4. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les transactions ne s'affichent pas

**Problème** : La liste des transactions est vide

**Solutions** :
1. Vérifiez que vous êtes bien connecté
2. Actualisez la page (F5)
3. Vérifiez la console du navigateur (F12)
4. Assurez-vous que le serveur backend fonctionne

### Erreur CORS

**Problème** : "Access to fetch has been blocked by CORS policy"

**Solutions** :
1. Vérifiez que le backend est bien démarré
2. Utilisez un serveur HTTP local pour le frontend :
   ```bash
   cd frontend
   python -m http.server 8000
   ```
3. Accédez à `http://localhost:8000` au lieu de `file:///`

---

## 📚 Ressources Supplémentaires

### Fichiers Importants

- `README.md` : Documentation technique du projet
- `docs/PLAN_IMPLEMENTATION.md` : Plan de développement
- `backend/.env` : Configuration du serveur
- `test_backend_api.py` : Script de test de l'API

### Support

Si vous rencontrez un problème non résolu :
1. Consultez les logs du serveur backend
2. Ouvrez la console du navigateur (F12)
3. Vérifiez les fichiers de documentation

---

## 🎉 Profitez de votre Application !

Vous êtes maintenant prêt à **maîtriser vos finances** avec Suivi Dépenses !

**Rappel des étapes** :
1. ✅ Démarrez le serveur avec `start_app.bat`
2. ✅ Ouvrez `frontend/index.html` dans votre navigateur
3. ✅ Créez un compte
4. ✅ Ajoutez vos premières transactions
5. ✅ Consultez vos statistiques

**Bon suivi de vos dépenses ! 💰📊**

---

*Dernière mise à jour : 15 février 2026*
