// Context du panier
// Permet de gérer le panier d'achat dans toute l'app via useContext(CartContext)
// Le panier est sauvegardé dans localStorage pour persister après un rechargement de page
// Les promotions sont appliquées automatiquement grâce au PromotionContext

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { PromotionContext } from "./PromotionContext.jsx";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    // On récupère la fonction de réduction depuis le contexte des promotions
    const { getDiscountedPrice } = useContext(PromotionContext);

    // État du panier : tableau d'articles avec leur quantité
    const [items, setItems] = useState([]);

    // Au montage : on restaure le panier depuis localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setItems(JSON.parse(storedCart));
            } catch {
                setItems([]);
            }
        }
    }, []);

    // À chaque modification du panier, on le sauvegarde dans localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    // Génère une clé unique pour chaque article
    // Pour le vrac, on utilise vracId car le même thé en 100g et 250g = 2 lignes différentes
    const getItemKey = (product) => {
        return product.isVrac ? product.vracId : product.ID_Article;
    };

    // Ajouter un article au panier (ou augmenter sa quantité s'il y est déjà)
    const addToCart = (product, quantity = 1) => {
        setItems((prev) => {
            const key = getItemKey(product);
            const existing = prev.find((item) => getItemKey(item) === key);
            if (existing) {
                // L'article existe déjà → on augmente la quantité
                return prev.map((item) =>
                    getItemKey(item) === key
                        ? { ...item, quantite: item.quantite + quantity }
                        : item
                );
            }
            // Nouvel article → on l'ajoute
            return [...prev, { ...product, quantite: quantity }];
        });
        toast.success(`${product.nom_produit} ajouté au panier`);
    };

    // Modifier la quantité d'un article (si 0 ou moins, on le supprime)
    const updateQuantity = (itemKey, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemKey);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                getItemKey(item) === itemKey ? { ...item, quantite: quantity } : item
            )
        );
    };

    // Supprimer un article du panier
    const removeFromCart = (itemKey) => {
        setItems((prev) => prev.filter((item) => getItemKey(item) !== itemKey));
    };

    // Vider tout le panier
    const clearCart = () => {
        setItems([]);
    };

    // Calcul du prix unitaire avec promotion appliquée
    // Pour le vrac : prix au kg × poids / 1000, puis réduction si promo
    const getItemPrice = (item) => {
        const prix = parseFloat(item.prix_ttc);
        let prixFinal;
        if (item.isVrac) {
            prixFinal = prix * item.poids / 1000;
        } else {
            prixFinal = prix;
        }
        return getDiscountedPrice(item.ID_Article, prixFinal);
    };

    // Prix original sans réduction (pour afficher le prix barré)
    const getItemOriginalPrice = (item) => {
        const prix = parseFloat(item.prix_ttc);
        if (item.isVrac) {
            return prix * item.poids / 1000;
        }
        return prix;
    };

    // Total TTC de tous les articles du panier
    const getTotal = () => {
        return items.reduce((sum, item) => sum + getItemPrice(item) * item.quantite, 0);
    };

    // Nombre total d'articles dans le panier
    const getItemCount = () => {
        return items.reduce((sum, item) => sum + item.quantite, 0);
    };

    const value = {
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
        getItemCount,
        getItemKey,
        getItemPrice,
        getItemOriginalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
