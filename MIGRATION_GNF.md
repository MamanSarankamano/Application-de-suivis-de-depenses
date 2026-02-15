# 🇬🇳 Migration vers le Franc Guinéen (GNF) & Améliorations Visuelles

## 📅 Date : 15 Février 2026

---

## ✅ Changements Effectués

### 1. Migration Devises (GNF)
L'application a été entièrement mise à jour pour utiliser le **Franc Guinéen (GNF)** comme devise principale à la place de l'Euro (€).

- **Fichier Centralisé** : `frontend/js/currency.js` gère le formatage (pas de décimales, séparateur d'espace).
- **Mise à jour Globale** : Toutes les pages (Dashboard, Transactions, Statistiques) affichent désormais les montants en GNF.
- **Données Réalistes** : Les données de démonstration ont été ajustées pour refléter des montants cohérents avec l'économie guinéenne (ex: salaires en millions de GNF).

### 2. Graphiques "Vivants" (High-End Visuals)
Pour répondre à votre demande de rendre l'interface "presque vivante", les graphiques ont été considérablement améliorés :

- **Animation Fluide** : Les courbes se dessinent progressivement à l'écran avec un effet de délai "vague".
- **Glow & Néon** : Ajout d'ombres portées colorées (Glow) sur les lignes des graphiques pour un effet lumineux moderne.
- **Dégradés Profonds** : Les zones sous les courbes utilisent des dégradés verticaux subtils pour donner de la profondeur.
- **Micro-interactions** : Les points grossissent au survol avec une animation fluide, et les infobulles suivent le curseur de manière réactive.

Les fichiers modifiés pour ces effets sont :
- `frontend/statistics.html` (Graphique Flux de Trésorerie)
- `frontend/dashboard.html` (Graphique Performance Mensuelle)

---

## 🚀 Prêt à l'Emploi

L'application est maintenant configurée avec la devise locale et dispose d'une interface visuelle haut de gamme fidèle à vos attentes de "prestige" et de "vie".
