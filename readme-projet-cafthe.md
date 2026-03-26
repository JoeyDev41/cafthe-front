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

application déployé avec hébergeur plesk sur `https://cafthefront.jferreira.dev-campus.fr/`
L'application sera accessible sur `http://localhost:5173`.

### Variables d'environnement

| Variable       | Description                      | Exemple                    |
| -------------- | -------------------------------- | -------------------------- |
| `VITE_API_URL` | URL de base de l'API back-end    | `apicafthe.jferreira.dev-campus.fr`    |

## Scripts disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Exemples d'utilisation

| URL                                                                     | Description                                          |
| ----------------------------------------------------------------------- | ---------------------------------------------------- |
| `https://cafthefront.jferreira.dev-campus.fr`                           | Page d'accueil                                       |
| `http://https://cafthefront.jferreira.dev-campus.fr/the`                | Catalogue des thes                                   |
| `https://cafthefront.jferreira.dev-campus.fr//cafe`                     | Catalogue des cafes                                  |
| `https://cafthefront.jferreira.dev-campus.fr//accessoires`              | Catalogue des accessoires                            |
| `https://cafthefront.jferreira.dev-campus.fr//produits`                 | Liste de tous les produits (filtres, tri, recherche) |
| `https://cafthefront.jferreira.dev-campus.fr//produits/:id`             | Fiche detail d'un produit                            |
| `https://cafthefront.jferreira.dev-campus.fr//vrac`                     | Produits vendus au poids (redirige vers produits)    |
| `https://cafthefront.jferreira.dev-campus.fr//login`                    | Connexion client                                     |
| `https://cafthefront.jferreira.dev-campus.fr//inscription`              | Inscription client                                   |
| `https://cafthefront.jferreira.dev-campus.fr//compte`                   | Espace personnel (profil, commandes)                 |
| `https://cafthefront.jferreira.dev-campus.fr//panier`                   | Panier d'achat                                       |
| `https://cafthefront.jferreira.dev-campus.fr//checkout`                 | Tunnel de commande                                   |
| `https://cafthefront.jferreira.dev-campus.fr//confirmation`             | Confirmation de commande                             |
| `https://cafthefront.jferreira.dev-campus.fr//a-propos`                 | Page a propos                                        |
| `https://cafthefront.jferreira.dev-campus.fr//contact`                  | Page de contact                                      |
| `https://cafthefront.jferreira.dev-campus.fr//mot-de-passe-oublie`      | Demande de reinitialisation du mot de passe          |
| `https://cafthefront.jferreira.dev-campus.fr//reinitialisation-mdp`     | Reinitialisation du mot de passe                     |
| `https://cafthefront.jferreira.dev-campus.fr//cgv`                      | Conditions generales de vente                        |
| `https://cafthefront.jferreira.dev-campus.fr//mentions-legales`         | Mentions legales                                     |
| `https://cafthefront.jferreira.dev-campus.fr//politique-confidentialite`| Politique de confidentialite                         |
| `https://cafthefront.jferreira.dev-campus.fr//plan-du-site`             | Plan du site                                         |

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
apres création des test dans l'ide comme par exemple le register.test.jsx ou login.test.jsx on ouvre un terminal puis utilison "npx vitest" pour ma part 
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
