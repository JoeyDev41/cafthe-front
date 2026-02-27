import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PromotionContext } from "../context/PromotionContext.jsx";
import QuickViewModal from "./QuickViewModal.jsx";

const ProductCard = ({ produit, viewMode = "grid" }) => {
    const { getDiscount, getDiscountedPrice } = useContext(PromotionContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);
    const navigate = useNavigate();

    const discount = getDiscount(produit.ID_Article);
    const originalPrice = parseFloat(produit.prix_ttc);
    const finalPrice = getDiscountedPrice(produit.ID_Article, originalPrice);

    const imageUrl = produit.images
        ? `${import.meta.env.VITE_API_URL}/images/${produit.images.split(",")[0].trim()}`
        : `https://placehold.co/300x300?text=${encodeURIComponent(produit.nom_produit)}`;

    const handleCardClick = (e) => {
        if (e.target.closest(".btn-voir")) return;
        setShowQuickView(true);
    };

    return (
        <>
            <div
                className={`product-card${viewMode === "list" ? " product-card--list" : ""}`}
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowQuickView(true); }}
                aria-label={`Aperçu de ${produit.nom_produit}`}
            >
                <div className="product-card-image-zone">
                    {!imageLoaded && <span className="product-card-spinner"></span>}
                    <img
                        src={imageUrl}
                        alt={produit.nom_produit}
                        className={`product-card-image${imageLoaded ? " loaded" : ""}`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    {produit.nouveau && <span className="product-card-badge">NEW</span>}
                </div>

                <div className="product-card-body">
                    <span className="product-card-category">{produit.categorie}</span>
                    <h3 className="product-card-title">
                        {produit.nom_produit}
                        {discount > 0 && <span className="promo-badge-inline">-{discount}%</span>}
                    </h3>
                    {produit.description && (
                        <p className="product-card-desc">{produit.description}</p>
                    )}
                    <div className="product-card-footer">
                        <span className="product-card-price">
                            {discount > 0 && (
                                <span className="price-original">{originalPrice.toFixed(2)} &euro;</span>
                            )}
                            <span className={discount > 0 ? "price-promo" : ""}>
                                {finalPrice.toFixed(2)} &euro;
                            </span>
                        </span>
                        <div className="product-card-actions">
                            <button
                                className="btn-voir"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/produits/${produit.ID_Article}`);
                                }}
                                aria-label={`Voir les détails de ${produit.nom_produit}`}
                            >
                                Voir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showQuickView && (
                <QuickViewModal
                    produit={produit}
                    onClose={() => setShowQuickView(false)}
                />
            )}
        </>
    );
};

export default ProductCard;
