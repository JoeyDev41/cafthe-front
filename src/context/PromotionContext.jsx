import { createContext, useState, useEffect } from "react";
import { getPromotionArticles } from "../services/api.js";

export const PromotionContext = createContext(null);

export function PromotionProvider({ children }) {
    const [promoMap, setPromoMap] = useState({});

    useEffect(() => {
        const loadPromos = async () => {
            try {
                const data = await getPromotionArticles();
                const map = {};
                data.articles.forEach((item) => {
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

    const getDiscount = (articleId) => {
        return promoMap[articleId]?.discount_percent || 0;
    };

    const getDiscountedPrice = (articleId, originalPrice) => {
        const discount = getDiscount(articleId);
        if (discount === 0) return originalPrice;
        return originalPrice * (1 - discount / 100);
    };

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
