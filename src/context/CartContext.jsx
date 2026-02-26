import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { PromotionContext } from "./PromotionContext.jsx";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { getDiscountedPrice } = useContext(PromotionContext);

    const [items, setItems] = useState([]);

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

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const getItemKey = (product) => {
        return product.isVrac ? product.vracId : product.ID_Article;
    };

    const addToCart = (product, quantity = 1) => {
        setItems((prev) => {
            const key = getItemKey(product);
            const existing = prev.find((item) => getItemKey(item) === key);
            if (existing) {
                return prev.map((item) =>
                    getItemKey(item) === key
                        ? { ...item, quantite: item.quantite + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantite: quantity }];
        });
        toast.success(`${product.nom_produit} ajouté au panier`);
    };

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

    const removeFromCart = (itemKey) => {
        setItems((prev) => prev.filter((item) => getItemKey(item) !== itemKey));
    };

    const clearCart = () => {
        setItems([]);
    };

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

    const getItemOriginalPrice = (item) => {
        const prix = parseFloat(item.prix_ttc);
        if (item.isVrac) {
            return prix * item.poids / 1000;
        }
        return prix;
    };

    const getTotal = () => {
        return items.reduce((sum, item) => sum + getItemPrice(item) * item.quantite, 0);
    };

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
