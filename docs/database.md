# Documentation de la Base de Données

L'application utilise une base de données relationnelle (SQLite pour le développement, compatible PostgreSQL pour la production). Voici les entités principales :

## 1. Utilisateur (`users`)
Gère l'authentification et l'association des données aux comptes.

| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK) | Identifiant unique |
| `username` | VARCHAR(80) | Nom d'utilisateur (unique) |
| `email` | VARCHAR(120) | Adresse email (unique) |
| `password_hash` | VARCHAR(128) | Mot de passe sécurisé (hashé) |
| `created_at` | DATETIME | Date de création du compte |

## 2. Catégorie (`categories`)
Permet de classer les transactions. Chaque utilisateur a ses propres catégories.

| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK) | Identifiant unique |
| `name` | VARCHAR(50) | Nom de la catégorie |
| `color` | VARCHAR(20) | Code couleur hexadécimal |
| `user_id` | INT (FK) | Utilisateur propriétaire |

## 3. Transaction (`transactions`)
Enregistre les mouvements financiers.

| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK) | Identifiant unique |
| `amount` | FLOAT | Montant de la transaction |
| `type` | VARCHAR(10) | 'revenu' ou 'depense' |
| `date` | DATE | Date de l'opération |
| `description` | VARCHAR(200) | Note ou libellé |
| `category_id` | INT (FK) | Catégorie associée |
| `user_id` | INT (FK) | Utilisateur propriétaire |

## Schéma des Relations
*   **User (1) --- (N) Transaction** : Un utilisateur possède plusieurs transactions.
*   **User (1) --- (N) Category** : Un utilisateur possède plusieurs catégories.
*   **Category (1) --- (N) Transaction** : Une catégorie regroupe plusieurs transactions.
