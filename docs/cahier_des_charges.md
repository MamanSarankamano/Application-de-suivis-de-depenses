# 📄 CAHIER DES CHARGES - Application Web de Suivi de Dépenses Personnelles (Grandeur Financière)

## 1. Présentation générale du projet

### 1.1 Contexte
La gestion financière personnelle constitue un enjeu majeur dans la société actuelle. De nombreuses personnes rencontrent des difficultés à suivre leurs dépenses et à planifier efficacement leur budget.
Ce projet vise à concevoir et développer une application web de suivi de dépenses personnelles haut de gamme, permettant aux utilisateurs de gérer leurs revenus et dépenses avec une devise adaptée (Franc Guinéen), d’analyser leurs habitudes financières via des visualisations immersives et de prendre des décisions économiques éclairées.

### 1.2 Problématique
Comment aider un utilisateur à :
- Suivre efficacement ses revenus et dépenses ?
- Visualiser l’évolution de son budget dans le temps avec une expérience utilisateur fluide ?
- Identifier les postes de dépenses les plus importants ?

### 1.3 Objectifs du projet
**Objectif général :** Développer une application web "Premium" permettant le suivi, l’analyse et la visualisation des finances personnelles avec une esthétique soignée.
**Objectifs spécifiques :**
- Enregistrer les revenus et dépenses en GNF (Franc Guinéen)
- Classer les transactions par catégories avec icônes personnalisées
- Filtrer les données par période, catégorie et type
- Générer des statistiques graphiques interactives et animées ("Vivantes")
- Offrir une interface moderne, intuitive et sécurisée (Design System personnalisé)

---

## 2. Périmètre du projet

### 2.1 Public cible
- Étudiants
- Travailleurs
- Toute personne souhaitant mieux gérer son budget avec un outil simple et élégant

### 2.2 Utilisateurs du système
- **Utilisateur :** Gère ses finances personnelles
- **Mode Démo :** Permet de tester l'application sans créer de compte (données fictives)

---

## 3. Description fonctionnelle

### 3.1 Fonctionnalités principales

#### 3.1.1 Authentification
- Inscription
- Connexion / Déconnexion
- Gestion sécurisée des sessions (JWT)

#### 3.1.2 Gestion des Transactions (Revenus & Dépenses)
- Ajouter, Modifier, Supprimer une transaction
- **Devise :** Franc Guinéen (GNF) - Formatage sans décimales avec séparateurs de milliers
- Catégorisation automatique et manuelle
- Description optionnelle

#### 3.1.3 Gestion des catégories
- Création de catégories personnalisées
- Système d'icônes visuel (Images PNG / FontAwesome)
- Association de couleurs aux catégories

#### 3.1.4 Filtres et recherche
- Filtrage par : Date (Période personnalisée), Type (Revenu / Dépense), Catégorie
- Recherche textuelle instantanée

#### 3.1.5 Statistiques et visualisations "Vivantes"
- **Tableau de Bord :** Résumé (Solde, Total Revenus, Total Dépenses)
- **Graphiques Interactifs :**
    - Flux de trésorerie mensuelle (Courbes avec dégradés et effets néon)
    - Répartition des dépenses (Diagramme circulaire animé)
    - Analyse des tendances (Bar charts d'évolution)
- Animations fluides à l'apparition des données

#### 3.1.6 Fonctionnalités Avancées
- **Mode Démonstration :** Injection de données de test pour visualiser l'interface immédiatement.
- **Squelettes de chargement (Skeletons) :** Amélioration de l'expérience utilisateur pendant les chargements.

---

## 4. Contraintes techniques

### 4.1 Technologies retenues
🔹 **Backend :** Python 3, Flask (Blueprints), SQLAlchemy.
🔹 **Base de données :** SQLite (Développement/Production locale).
🔹 **Frontend :** HTML5, CSS3 (Custom Design System, Variables CSS, Glassmorphism), JavaScript (ES6+), Chart.js (customisée).
🔹 **Outils :** VS Code, Git.

### 4.2 Contraintes
- **Design Premium :** Interface "High-End", utilisation de dégradés, ombres portées, typographie moderne (Google Fonts: Outfit).
- **Responsive :** Compatible mobile et desktop.
- **Sécurité :** Hachage des mots de passe, Tokens JWT, Protection CSRF.
- **Performance :** Chargement rapide (< 2s), Optimisation des requêtes SQL (Target Audit Score: 9/10).

---

## 5. Architecture du système
- Architecture Client-Serveur (API RESTful)
- **Frontend :** Pages statiques consommant l'API via `fetch`.
- **Backend :** API Flask structurée en Blueprints (`auth`, `transactions`, `categories`).

---

## 6. Modélisation des données
- **Utilisateur :** id, username, email, password_hash
- **Catégorie :** id, name, color, type, user_id (optionnel pour catégories par défaut)
- **Transaction :** id, amount (Float), type (Enum: revenu/depense), date (Date), description (String), category_id, user_id

---

## 7. Charte graphique et choix des couleurs

### 7.1 Palette Brand Identity
| Élément | Couleur | Code Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primaire** | Bleu Néon | **#3B82F6** | Boutons, Accents, Liens |
| **Secondaire** | Cyan | **#06B6D4** | Gradients, Avatars, Info |
| **Sombre** | Navy Profond | **#1E3A8A** | Navigation, Headers |
| **Fond** | Blanc / Gris | **#F8FAFC** | Arrière-plan application |
| **Texte** | Gris Ardoise | **#334155** | Texte principal |

### 7.2 Couleurs Fonctionnelles
| Fonction | Couleur | Code Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Revenus** | Émeraude | **#10B981** | Indicateurs positifs, Courbes revenus |
| **Dépenses** | Rouge Vif | **#EF4444** | Indicateurs négatifs, Courbes dépenses |
| **Alertes** | Ambre | **#F59E0B** | Avertissements, Catégories mixtes |
| **Autre** | Violet | **#8B5CF6** | Catégories spéciales |

---

## 8. Perspectives d’évolution
- Export PDF / Excel des rapports
- Notifications par email
- Budget prévisionnel mensuel
- Application mobile native (React Native / Flutter)
