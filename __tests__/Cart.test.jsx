/**
 * Cart.test.jsx
 * ==================
 * MISSION 4 — Tests unitaires du panier
 *
 * Composant testé : Cart (src/pages/Cart.jsx)
 * Pourquoi ce composant ?
 *   - Affichage dynamique des articles du panier
 *   - Modification de quantité (augmenter / diminuer)
 *   - Suppression d'un article du panier
 *   - Calcul du total avec prix unitaires et quantités
 *   -> Il couvre les scénarios : ajout, suppression, total calculé
 *
 * Framework : Vitest (natif pour les projets Vite)
 * Outils utilisés :
 *   - Vitest  : describe, test, expect, vi, beforeEach
 *   - React Testing Library : render, screen, fireEvent, within
 *   - @testing-library/jest-dom : matchers DOM (toBeInTheDocument, etc.)
 *
 * Adaptations par rapport au composant Cart.jsx :
 *   - Cart.jsx utilise 3 contextes : CartContext, AuthContext, PromotionContext
 *     -> On fournit les 3 Providers avec des valeurs factices (mocks).
 *   - Cart.jsx utilise useNavigate et <Link> de react-router-dom
 *     -> On mocke useNavigate et on enveloppe dans MemoryRouter.
 *   - Cart.jsx appelle window.confirm() pour confirmer la suppression
 *     -> On mocke window.confirm pour retourner true automatiquement.
 *   - Les prix sont calculés via getItemPrice() et getTotal() du CartContext
 *     -> On contrôle ces fonctions via nos mocks pour des résultats prévisibles.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "../pages/Cart";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import { PromotionContext } from "../context/PromotionContext.jsx";

// ─── Mock de react-hot-toast ─────────────────────────────────────────────────
// CartContext importe react-hot-toast, il faut le mocker même si Cart.jsx
// ne l'utilise pas directement.
vi.mock("react-hot-toast", () => {
  const toast = vi.fn();
  toast.success = vi.fn();
  toast.error = vi.fn();
  return { default: toast };
});

// ─── Mock de useNavigate ─────────────────────────────────────────────────────
const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ─── Données de test ─────────────────────────────────────────────────────────
// Articles factices qui simulent le contenu du panier.
// Chaque article a les propriétés utilisées par Cart.jsx pour l'affichage.
const articleThe = {
  ID_Article: 1,
  nom_produit: "Thé Vert Sencha",
  prix_ttc: "8.50",
  quantite: 2,
  images: null,
  isVrac: false,
};

const articleCafe = {
  ID_Article: 2,
  nom_produit: "Café Arabica",
  prix_ttc: "12.00",
  quantite: 1,
  images: null,
  isVrac: false,
};

// ─── Fonctions mock du CartContext ───────────────────────────────────────────
// On crée des espions pour chaque fonction du CartContext utilisée par Cart.jsx.
// Cela permet de vérifier qu'elles sont appelées avec les bons arguments.
const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();

// ─── Fonction utilitaire de rendu ────────────────────────────────────────────
// Cart.jsx utilise 3 contextes + react-router-dom.
// On les fournit tous avec des valeurs contrôlées pour isoler le composant.
//
// getItemKey : retourne l'identifiant unique de l'article (ID_Article pour non-vrac)
// getItemPrice : retourne le prix unitaire (parseFloat du prix_ttc pour non-vrac)
// getItemOriginalPrice : retourne le prix original (identique si pas de promo)
// getTotal : calcule la somme des (prix * quantité) de tous les articles
const renderCart = (items = [articleThe, articleCafe]) => {
  // Calcul dynamique du total basé sur les articles fournis
  const computeTotal = () =>
    items.reduce((sum, item) => sum + parseFloat(item.prix_ttc) * item.quantite, 0);

  const cartValue = {
    items,
    updateQuantity: mockUpdateQuantity,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
    getTotal: computeTotal,
    getItemCount: () => items.reduce((sum, item) => sum + item.quantite, 0),
    getItemKey: (item) => item.isVrac ? item.vracId : item.ID_Article,
    getItemPrice: (item) => parseFloat(item.prix_ttc),
    getItemOriginalPrice: (item) => parseFloat(item.prix_ttc),
  };

  const authValue = {
    user: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
    loading: false,
  };

  const promoValue = {
    getDiscount: () => 0,
    getDiscountedPrice: (_id, price) => price,
    getPromoInfo: () => null,
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <PromotionContext.Provider value={promoValue}>
        <CartContext.Provider value={cartValue}>
          <MemoryRouter>
            <Cart />
          </MemoryRouter>
        </CartContext.Provider>
      </PromotionContext.Provider>
    </AuthContext.Provider>
  );
};

// ─── Suite de tests ──────────────────────────────────────────────────────────
describe("Cart — Panier d'achat", () => {
  // beforeEach : code exécuté avant CHAQUE test de cette suite
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUpdateQuantity.mockClear();
    mockRemoveFromCart.mockClear();
    mockClearCart.mockClear();
    // Mock de window.confirm pour les dialogues de suppression
    // On retourne true par défaut pour valider automatiquement la confirmation
    vi.spyOn(window, "confirm").mockReturnValue(true);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 1 — Affichage des articles du panier
  // Vérifie que les articles sont correctement affichés avec leurs noms,
  // quantités et le sous-total dans le récapitulatif.
  // Pattern AAA -> Arrange (renderCart avec articles) + Assert (expect)
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche les articles du panier avec noms, quantités et sous-total", () => {
    // ARRANGE : on rend le composant avec 2 articles dans le panier
    renderCart();

    // ASSERT : les noms des articles sont affichés
    expect(screen.getByText("Thé Vert Sencha")).toBeInTheDocument();
    expect(screen.getByText("Café Arabica")).toBeInTheDocument();

    // Le titre "Mon panier" est affiché
    expect(
      screen.getByRole("heading", { name: /mon panier/i })
    ).toBeInTheDocument();

    // Le sous-total est affiché dans le récapitulatif
    // Thé: 8.50 * 2 = 17.00 + Café: 12.00 * 1 = 12.00 -> Total = 29.00
    expect(screen.getByText("29.00 €")).toBeInTheDocument();

    // Le bouton "Passer commande" est présent
    expect(
      screen.getByRole("button", { name: /passer commande/i })
    ).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 2 — Suppression d'un article
  // Simule un clic sur le bouton de suppression d'un article.
  // Vérifie que removeFromCart() est appelé avec le bon identifiant.
  // Pattern AAA -> Arrange (render) + Act (clic supprimer) + Assert
  //
  // Cart.jsx :
  //   - Le bouton supprimer a aria-label={`Supprimer ${item.nom_produit}`}
  //   - Au clic : window.confirm() puis removeFromCart(key)
  // ═══════════════════════════════════════════════════════════════════════════
  test("appelle removeFromCart quand on supprime un article", () => {
    // ARRANGE
    renderCart();

    // ACT : on clique sur le bouton de suppression du "Thé Vert Sencha"
    // Le bouton a un aria-label "Supprimer Thé Vert Sencha" pour l'accessibilité
    fireEvent.click(
      screen.getByRole("button", { name: /supprimer thé vert sencha/i })
    );

    // ASSERT : window.confirm a été appelé pour demander confirmation
    expect(window.confirm).toHaveBeenCalled();

    // removeFromCart doit être appelé avec l'ID de l'article (1 pour le Thé)
    // Cart.jsx appelle : removeFromCart(key) où key = getItemKey(item) = item.ID_Article
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 3 — Calcul du total
  // Vérifie que le total affiché correspond bien à la somme des articles.
  // Inclut les frais de livraison (5.90€ si total < 49€, gratuit sinon).
  // Pattern AAA -> Arrange (render) + Assert (vérifier le total TTC)
  //
  // Cart.jsx :
  //   - Sous-total : getTotal() = somme(prix * quantité)
  //   - Frais livraison : 0 si total >= 49€, sinon 5.90€
  //   - Total TTC : sous-total + frais livraison
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche le total correct avec les frais de livraison", () => {
    // ARRANGE : total des articles = 8.50*2 + 12.00*1 = 29.00€
    // 29.00 < 49 donc frais de livraison = 5.90€
    // Total TTC attendu = 29.00 + 5.90 = 34.90€
    renderCart();

    // ASSERT : le sous-total est affiché
    expect(screen.getByText("29.00 €")).toBeInTheDocument();

    // Les frais de livraison sont affichés (5.90€ car total < 49€)
    expect(screen.getByText("5.90 €")).toBeInTheDocument();

    // Le total TTC est affiché (29.00 + 5.90 = 34.90)
    expect(screen.getByText("34.90 €")).toBeInTheDocument();

    // Le message "Plus que X€ pour la livraison gratuite" est affiché
    // 49 - 29.00 = 20.00€ restants
    expect(screen.getByText(/plus que 20.00/i)).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 4 — Panier vide
  // Vérifie que le composant affiche un message quand le panier est vide.
  // Pattern AAA -> Arrange (render avec panier vide) + Assert
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche un message quand le panier est vide", () => {
    // ARRANGE : on rend le composant avec un panier vide (tableau vide)
    renderCart([]);

    // ASSERT : le message "Votre panier est vide." est affiché
    expect(screen.getByText(/votre panier est vide/i)).toBeInTheDocument();

    // Le lien "Continuer mes achats" est présent pour retourner à l'accueil
    expect(screen.getByText(/continuer mes achats/i)).toBeInTheDocument();
  });
});
