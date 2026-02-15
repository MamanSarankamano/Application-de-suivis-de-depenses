# 📄 CAHIER DES CHARGES - Application Web de Suivi de Dépenses Personnelles

## 1. Présentation générale du projet

### 1.1 Contexte
La gestion financière personnelle constitue un enjeu majeur dans la société actuelle. De nombreuses personnes rencontrent des difficultés à suivre leurs dépenses et à planifier efficacement leur budget.
Ce projet vise à concevoir et développer une application web de suivi de dépenses personnelles, permettant aux utilisateurs de gérer leurs revenus et dépenses, d’analyser leurs habitudes financières et de prendre des décisions économiques éclairées.

### 1.2 Problématique
Comment aider un utilisateur à :
- Suivre efficacement ses revenus et dépenses ?
- Visualiser l’évolution de son budget dans le temps ?
- Identifier les postes de dépenses les plus importants ?

### 1.3 Objectifs du projet
**Objectif général :** Développer une application web permettant le suivi, l’analyse et la visualisation des finances personnelles.
**Objectifs spécifiques :**
- Enregistrer les revenus et dépenses
- Classer les transactions par catégories
- Filtrer les données par période
- Générer des statistiques graphiques
- Offrir une interface simple, intuitive et sécurisée

---

## 2. Périmètre du projet

### 2.1 Public cible
- Étudiants
- Travailleurs
- Toute personne souhaitant mieux gérer son budget

### 2.2 Utilisateurs du système
- **Utilisateur :** Gère ses finances personnelles
- **Administrateur (optionnel) :** Supervise les catégories et la gestion globale

---

## 3. Description fonctionnelle

### 3.1 Fonctionnalités principales

#### 3.1.1 Authentification
- Inscription
- Connexion / Déconnexion
- Gestion sécurisée des sessions (JWT)

#### 3.1.2 Gestion des revenus
- Ajouter, Modifier, Supprimer un revenu
- Catégorisation (salaire, aide, business…)

#### 3.1.3 Gestion des dépenses
- Ajouter, Modifier, Supprimer une dépense
- Catégorisation (alimentaire, transport, logement…)

#### 3.1.4 Gestion des catégories
- Création de catégories personnalisées
- Association de couleurs aux catégories

#### 3.1.5 Filtres et recherche
- Filtrage par : Date, Type (revenu / dépense), Catégorie
- Recherche par mot-clé

#### 3.1.6 Statistiques et visualisations
- Solde total
- Total des revenus / dépenses
- Graphiques : Diagramme circulaire (répartition), Courbes (évolution mensuelle)

---

## 4. Contraintes techniques

### 4.1 Technologies retenues
🔹 **Backend :** Python 3, Flask, SQLAlchemy, PostgreSQL (SQLite en dév), JWT.
🔹 **Frontend :** HTML5, CSS3, JavaScript (ES6), Bootstrap 5, Chart.js.
🔹 **Outils :** VS Code, Git, Postman.

### 4.2 Contraintes
- Application responsive
- Sécurité des données
- Performance optimale (Temps de réponse < 2s)

---

## 5. Architecture du système
- Architecture MVC
- Communication via API RESTful (Frontend <-> Backend)

---

## 6. Modélisation des données
- **Entités :** Utilisateur, Transaction, Catégorie
- **Table Transaction :** id (INT), montant (FLOAT), type (ENUM), date (DATE), categorie_id (INT), utilisateur_id (INT)

---

## 7. Charte graphique et choix des couleurs

### 7.1 Palette principale
| Élément | Couleur | Code |
| :--- | :--- | :--- |
| Navigation | Bleu foncé | **#1E3A8A** |
| Boutons | Bleu clair | **#3B82F6** |
| Fond principal | Blanc | **#FFFFFF** |
| Cartes | Gris clair | **#F3F4F6** |
| Texte | Gris foncé | **#374151** |

### 7.2 Couleurs fonctionnelles
| Fonction | Couleur | Code |
| :--- | :--- | :--- |
| Revenus | Vert | **#16A34A** |
| Dépenses | Rouge | **#DC2626** |
| Alertes | Orange | **#F59E0B** |

---

## 8. Perspectives d’évolution
- Application mobile
- Export PDF / Excel
- Notifications
- Gestion de budget mensuel automatique
