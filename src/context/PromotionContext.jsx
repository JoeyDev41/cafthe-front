// Context des promotions
// Au lancement de l'app, on charge la liste des articles en promo depuis l'API
// Ensuite, n'importe quel composant peut appeler getDiscount(articleId) pour savoir
// si un article est en promo et quel est le pourcentage de réduction

import { createContext, useState, useEffect } from "react";
import { getPromotionArticles } from "../services/api.js";

export const PromotionContext = createContext(null);

export function PromotionProvider({ children }) {
    // promoMap = objet qui associe chaque id_article à ses infos de promo
    // Exemple : { 8: { discount_percent: 15, titre: "Promo été" }, 10: { ... } }
    const [promoMap, setPromoMap] = useState({});

    // Chargement des promos au démarrage
    useEffect(() => {
        const loadPromos = async () => {
            try {
                const data = await getPromotionArticles();
                const map = {};
                data.articles.forEach((item) => {
                    // Si un article a plusieurs promos, on garde la plus avantageuse
                    if (!map[item.id_article] || map[item.id_article].discount_percent < item.discount_percent) {
                        map[item.id_article] = {
                            discount_percent: item.discount_percent,
                            titre: item.titre,
                        };
                    }
                });
                setPromoMap(map);
            } catch (error) {
                console.error("Erreur chargement promotions:", error);
            }
        };
        loadPromos();
    }, []);

    // Retourne le % de réduction d'un article (0 si pas en promo)
    const getDiscount = (articleId) => {
        return promoMap[articleId]?.discount_percent || 0;
    };

    // Calcule le prix après réduction
    const getDiscountedPrice = (articleId, originalPrice) => {
        const discount = getDiscount(articleId);
        if (discount === 0) return originalPrice;
        return originalPrice * (1 - discount / 100);
    };

    // Retourne les infos complètes de la promo (ou null)
    const getPromoInfo = (articleId) => {
        return promoMap[articleId] || null;
    };

    const value = {
        getDiscount,
        getDiscountedPrice,
        getPromoInfo,
    };

    return <PromotionContext.Provider value={value}>{children}</PromotionContext.Provider>;
}
