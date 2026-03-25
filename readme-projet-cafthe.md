# Caf'Thé

Application e-commerce front-end pour une boutique en ligne de thes, cafes et accessoires.
<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decommenter et adapter les badges selon votre CI/CD -->
<!-- ![Build](https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?branch=main) -->
<!-- ![Tests](https://img.shields.io/github/actions/workflow/status/USER/REPO/tests.yml?branch=main&label=tests) -->
<!-- ![License](https://img.shields.io/github/license/USER/REPO) -->

## Prerequis

- [Node.js](https://nodejs.org/) >= 18
- npm
- Une API back-end fonctionnelle (les endpoints sont decrits dans `src/services/api.js`)

## Quickstart

```bash
# 1. Cloner le depot
git clone https://github.com/JoeyDev41/cafthe-front.git
cd cafthe-front

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Editer .env et renseigner les variables necessaires

# 4. Lancer le serveur de developpement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Variables d'environnement

| Variable       | Description                      | Exemple                    |
| -------------- | -------------------------------- | -------------------------- |
| `VITE_API_URL` | URL de base de l'API back-end    | `http://localhost:3000`    |

## Scripts disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Exemples d'utilisation

| URL                                              | Description                                  |
| ------------------------------------------------ | -------------------------------------------- |
| `http://localhost:5173/`                         | Page d'accueil                               |
| `http://localhost:5173/the`                      | Catalogue des thes                           |
| `http://localhost:5173/cafe`                     | Catalogue des cafes                          |
| `http://localhost:5173/accessoires`              | Catalogue des accessoires                    |
| `http://localhost:5173/produits`                 | Liste de tous les produits (filtres, tri, recherche) |
| `http://localhost:5173/produits/:id`             | Fiche detail d'un produit                    |
| `http://localhost:5173/vrac`                     | Produits vendus au poids (redirige vers produits) |
| `http://localhost:5173/login`                    | Connexion client                             |
| `http://localhost:5173/inscription`              | Inscription client                           |
| `http://localhost:5173/compte`                   | Espace personnel (profil, commandes)         |
| `http://localhost:5173/panier`                   | Panier d'achat                               |
| `http://localhost:5173/checkout`                 | Tunnel de commande                           |
| `http://localhost:5173/confirmation`             | Confirmation de commande                     |
| `http://localhost:5173/a-propos`                 | Page a propos                                |
| `http://localhost:5173/contact`                  | Page de contact                              |
| `http://localhost:5173/mot-de-passe-oublie`      | Demande de reinitialisation du mot de passe  |
| `http://localhost:5173/reinitialisation-mdp`     | Reinitialisation du mot de passe             |
| `http://localhost:5173/cgv`                      | Conditions generales de vente                |
| `http://localhost:5173/mentions-legales`         | Mentions legales                             |
| `http://localhost:5173/politique-confidentialite`| Politique de confidentialite                 |
| `http://localhost:5173/plan-du-site`             | Plan du site                                 |

## Structure du projet

```
src/
├── assets/            # Images et fichiers statiques (logo, illustrations)
├── components/        # Composants reutilisables (Navbar, Footer, ProductCard...)
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── MiniCart.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── QuickViewModal.jsx
│   ├── ThemeToggle.jsx
│   └── VracProductCard.jsx
├── context/           # Contextes React (auth, panier, promotions, theme)
│   ├── AuthContex.jsx
│   ├── CartContext.jsx
│   ├── PromotionContext.jsx
│   └── ThemeContext.jsx
├── layout/            # Layout principal avec Navbar et Footer
│   └── Layout.jsx
├── pages/             # Pages de l'application (une par route)
│   ├── Home.jsx
│   ├── The.jsx
│   ├── Cafe.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Account.jsx
│   └── ...
├── services/          # Couche d'acces a l'API back-end
│   └── api.js
├── styles/            # Feuilles de style CSS (base, responsive, dark mode...)
├── App.jsx            # Composant racine avec le routeur et les providers
└── main.jsx           # Point d'entree de l'application
```

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont generes dans le dossier `dist/`.

### Hebergement

Pour le deployement nous avons commencer par crée un sous domaine ensuit creation du certificat ssl,
ensuite on clic sur git puis on pull puis on clic sur deployement sa transfert directement les fichier stocker sur github dans les fichier du sous domaine de l'hebergeur
apres on injecte sa base de donné , puis on fais les variable environement stocker dans le .env ensuite on active node.js
et le install npm ensuite on verifie que c'est bien deployer par exemple pour moi j'ai fais : https://apicafthe.jferreira.dev-campus.fr/api/articles et la liste articles stocker en bdd dans la table articles
ensuite on passe au deployement du front donc on recré un sous domaine puis on npm run build la partie front dans son IDE (VsCode pour moi) sa genere un dossier dist du projet c'est les fichiers a l'interieur
du dossier dist qu'il faut deployer sur l'hebergeur puis on ajoute l'url du front deployer dans les variables environement de l'api - FRONTEND_URL: https://cafthefront.jferreira.dev-campus.fr
 


## Tests
<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decrire comment lancer les tests -->

```bash
# Lancer les tests
npm run test
```

## Stack technique

- **React** v19 — Bibliotheque UI avec composants fonctionnels et hooks
- **Vite** v7 — Bundler et serveur de developpement rapide
- **React Router DOM** v7 — Gestion du routage SPA avec lazy loading
- **React Hot Toast** — Notifications toast (succes, erreur)
- **React Loading Skeleton** — Placeholders de chargement animes
- **ESLint** — Linting du code avec plugins React

## Auteurs

- **Joey Ferreira ** — Apprenant Junior a la Fabrique du numérique 41 a Blois 

## Licence

<!-- Choisir une licence : MIT, Apache 2.0, GPL v3... -->

Ce projet est sous licence [MIT](LICENSE).

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/)
- [Documentation React Router](https://reactrouter.com/)
- [Lien de l'API'](https://apicafthe.jferreira.dev-campus.fr)
- [Lien du frontend'](https://cafthefront.jferreira.dev-campus.fr)
-[Lien wireframe & maquette Figma] (https://www.figma.com/design/AB6NYBOJwFbIeftjCGLlgV/cafte-maquette?node-id=0-1&t=hQmqsVpGMqFn7FAZ-1)
<!-- Ajouter vos liens : wiki, maquettes, board de gestion de projet... -->
