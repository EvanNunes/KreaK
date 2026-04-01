# KreaK 

Boutique en ligne de créations artistiques faites main — tasses, t-shirts, tote bags et affiches illustrés par Léa.

---

## Aperçu

| Page | Description |
|------|-------------|
| ![Accueil](img/home.png) | Page d'accueil avec aperçu des créations |
| ![Catalogue](img/catalogue.png) | Catalogue avec filtre par catégorie |
| ![Produit](img/product.png) | Page détail d'un produit |

---

## Stack technique

**Frontend**
- [Next.js 16](https://nextjs.org/) 
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS Modules](https://sass-lang.com/) 
- [Tailwind CSS v4](https://tailwindcss.com/) 

**Backend**
- [Symfony 8](https://symfony.com/) 
- [Doctrine ORM](https://www.doctrine-project.org/)
- [API REST](https://symfony.com/doc/current/controller.html) 

**Base de données**
- [PostgreSQL 16](https://www.postgresql.org/)

**Infrastructure**
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) — conteneurisation

---

## Architecture

```
KreaK/
├── front/                  # Application Next.js
│   ├── app/
│   │   ├── page.tsx               # Page d'accueil
│   │   ├── catalogue/
│   │   │   ├── page.tsx           # Page catalogue
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Page détail produit
│   │   ├── globals.scss
│   │   └── _variables.scss        # Variables SCSS globales
│   └── components/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── back/                   # API Symfony
│   └── src/
│       ├── Entity/
│       │   └── Product.php        # Entité produit
│       ├── Repository/
│       │   └── ProductRepository.php
│       └── Controller/
│           └── ProductController.php  # Routes API
│
├── docker-compose.yaml
├── DockerfileFront
└── DockerfileBack
```

---

## API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/products` | Liste tous les produits |
| `GET` | `/api/products?category=Tasse` | Filtre par catégorie |
| `GET` | `/api/products/{id}` | Détail d'un produit |

**Exemple de réponse** `GET /api/products/1` :
```json
{
  "id": 1,
  "name": "Tasse Verte",
  "description": "Une tasse de couleur verte",
  "price": 20,
  "category": "Tasse",
  "imageUrl": "img/Tasse.avif"
}
```

---

## Installation

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) avec intégration WSL2 activée
- [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/install) (Windows uniquement)

### Lancer le projet

```bash
# 1. Cloner le repo
git clone https://github.com/ton-user/kreak.git
cd kreak

# 2. Lancer les containers
docker compose up --build

# 3. (Première fois) Créer la base de données
docker exec -it web_back bash
php bin/console doctrine:migrations:migrate
```

L'application est accessible sur :
- **Frontend** → http://localhost:3000
- **Backend** → http://localhost:80
- **Base de données** → localhost:5432

---

## Variables d'environnement

### Frontend (`front/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:80
```

### Backend (`back/.env`)

```env
DATABASE_URL="postgresql://root:root@postgres:5432/kreak?serverVersion=16&charset=utf8"
APP_ENV=dev
APP_SECRET=your_secret_here
```

---

## Fonctionnalités

### Sprint 1 — Vitrine 
- [x] Page d'accueil avec hero et aperçu des créations
- [x] Page catalogue avec tous les produits
- [x] Filtre par catégorie (côté client)
- [x] Page détail d'un produit
- [x] API REST Symfony + PostgreSQL
- [x] Skeleton loading pendant les fetches

### Sprint 2 — Boutique 
- [ ] Panier d'achat
- [ ] Système de commande
- [ ] Upload d'images produit
- [ ] Authentification

---


## Auteur

Projet réalisé dans le cadre d'une préparation à un stage développeur Fullstack.

Evan Nunes