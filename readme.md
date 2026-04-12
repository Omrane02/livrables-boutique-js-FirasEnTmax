# 🎾 The Carlton Club — Tennis Boutique

Une boutique de tennis en ligne full-stack avec authentification sécurisée, gestion des produits, panier, commandes et variantes de couleur/taille.

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [API Endpoints](#api-endpoints)
- [Base de données](#base-de-données)

---

## Aperçu

The Carlton Club est une application web e-commerce dédiée aux équipements de tennis. Elle permet aux utilisateurs de parcourir un catalogue de 20 produits, de filtrer par catégorie/marque/genre/prix, de gérer un panier persistant et de passer des commandes après connexion.

---

## Technologies utilisées

**Backend**
- Node.js v24.14.0
- Express.js
- MySQL2
- bcrypt (hashage des mots de passe)
- jsonwebtoken (authentification JWT)
- dotenv (variables d'environnement)
- cookie-parser
- cors

**Frontend**
- HTML5 / CSS3
- JavaScript vanilla (ES6+)
- Live Server (développement)

**Base de données**
- MySQL (via MAMP)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [MAMP](https://www.mamp.info/) (ou tout autre serveur MySQL)
- Un navigateur moderne (Chrome, Firefox, Edge)
- [VS Code](https://code.visualstudio.com/) avec l'extension **Live Server**

---

## Installation

**1. Cloner le projet**

```bash
git clone https://github.com/votre-username/the-carlton-club.git
cd the-carlton-club
```

**2. Installer les dépendances backend**

```bash
cd backend
npm install
```

---

## Configuration

**1. Créer le fichier `.env`** dans le dossier `backend/` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=tennis_db
JWT_SECRET=un_secret_long_et_complexe_ici
```

**2. Créer la base de données**

- Démarrez MAMP et assurez-vous que MySQL tourne sur le port **3306**
- Ouvrez phpMyAdmin : `http://localhost/phpmyadmin`
- Créez une base de données nommée `tennis_db`
- Importez d'abord `backend/database/migration.sql`
- Puis importez `backend/database/insertion.sql`

---

## Lancement

Le projet nécessite deux terminaux ouverts simultanément.

**Terminal 1 — Démarrer le backend :**

```bash
cd backend
node app.js
```

Vous devriez voir :
```
Serveur lancé sur http://localhost:5000
Produits récupérés ✅ 20 produits trouvés
```

**Terminal 2 — Démarrer le frontend :**

Dans VS Code, faites un clic droit sur `frontend/index.html` → **Open with Live Server**

Le site s'ouvrira sur `http://127.0.0.1:5500/frontend/index.html`

---

## Structure du projet

```
the-carlton-club/
│
├── backend/
│   ├── assets/
│   │   └── img/                  # Images des produits
│   ├── controller/
│   │   ├── auth.js               # Inscription, connexion, profil
│   │   ├── cart.js               # Gestion du panier
│   │   ├── orders.js             # Gestion des commandes
│   │   ├── favorites.js          # Gestion des favoris
│   │   ├── addresses.js          # Gestion des adresses
│   │   └── tennis.js             # Produits, catégories, marques
│   ├── database/
│   │   ├── db.js                 # Connexion MySQL
│   │   ├── migration.sql         # Création des tables
│   │   └── insertion.sql         # Données initiales
│   ├── middleware/
│   │   └── auth.js               # Vérification token JWT
│   ├── router/
│   │   ├── auth.js               # Routes /api/auth
│   │   ├── cart.js               # Routes /api/cart
│   │   ├── orders.js             # Routes /api/orders
│   │   ├── favorites.js          # Routes /api/favorites
│   │   ├── addresses.js          # Routes /api/addresses
│   │   └── tennis.js             # Routes /api/products
│   ├── .env                      # Variables d'environnement (non versionné)
│   ├── app.js                    # Point d'entrée du serveur
│   └── package.json
│
└── frontend/
    ├── css/
    │   └── main.css              # Styles de l'application
    ├── script/
    │   └── main.js               # Logique frontend complète
    └── index.html                # Page principale
```

---

## Fonctionnalités

### Catalogue produits
- Affichage de 20 produits chargés depuis la base de données
- Filtres combinables : catégorie, genre, marque, prix maximum, recherche textuelle
- Tri par prix croissant/décroissant et nom alphabétique
- Système de fallback sur données statiques si l'API est indisponible

### Fiche produit
- Carousel d'images avec navigation par flèches et points
- Sélecteur de variantes (couleur / taille) chargé depuis l'API
- Indicateur de stock en temps réel
- Prix promotionnel avec ancien prix barré

### Panier
- Ajout, suppression et modification des quantités
- Persistance via `localStorage` (survit à la fermeture du navigateur)
- Total calculé automatiquement

### Authentification
- Inscription avec prénom, nom, email, téléphone et mot de passe
- Indicateur de force du mot de passe en temps réel
- Hashage bcrypt côté serveur
- Connexion avec génération de token JWT (valable 24h)
- Déconnexion avec nettoyage du token

### Commandes
- Validation de commande réservée aux utilisateurs connectés
- Enregistrement en base de données avec statut "en attente"

---

## API Endpoints

### Produits (public)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/products` | Tous les produits |
| GET | `/api/products/:id` | Produit par ID + variantes |
| GET | `/api/products/filter` | Produits filtrés |
| GET | `/api/categories` | Toutes les catégories |
| GET | `/api/brands` | Toutes les marques |

### Authentification (public)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |
| GET | `/api/auth/profile` | Profil (protégé) |

### Panier (protégé — JWT requis)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/cart` | Voir le panier |
| POST | `/api/cart` | Ajouter un article |
| PUT | `/api/cart/:id` | Modifier la quantité |
| DELETE | `/api/cart/:id` | Supprimer un article |
| DELETE | `/api/cart/clear` | Vider le panier |

### Commandes (protégé — JWT requis)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/orders` | Passer une commande |
| GET | `/api/orders` | Historique des commandes |
| GET | `/api/orders/:id` | Détail d'une commande |

---

## Base de données

Le schéma contient 9 tables :

| Table | Description |
|-------|-------------|
| `users` | Comptes utilisateurs avec mot de passe hashé |
| `products` | Catalogue des articles |
| `categories` | Catégories (Raquettes, Vêtements, etc.) |
| `brands` | Marques (Wilson, Nike, Adidas, etc.) |
| `product_variants` | Variantes par couleur et taille avec stock |
| `colors` | Liste des couleurs disponibles |
| `sizes` | Liste des tailles disponibles |
| `cart` | Panier par utilisateur |
| `orders` | Commandes passées |
| `order_items` | Détail des articles par commande |
| `promotions` | Réductions avec période de validité |

---

## Auteur

Projet réalisé dans le cadre d'un cours de développement web full-stack.

**Stack :** Node.js · Express · MySQL · JavaScript Vanilla