// Carte produit réutilisable
// Affichée dans les listes de produits (grille ou liste)
// Reçoit un objet "produit" en props et gère l'affichage des promos (prix barré + badge)

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { PromotionContext } from "../context/PromotionContext.jsx";
import QuickViewModal from "./QuickViewModal.jsx";

const ProductCard = ({ produit, viewMode = "grid" }) => {
    const { addToCart } = useContext(CartContext);
    const { getDiscount, getDiscountedPrice } = useContext(PromotionContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    // Récupérer les infos de promo pour cet article
    const discount = getDiscount(produit.ID_Article);
    const originalPrice = parseFloat(produit.prix_ttc);
    const finalPrice = getDiscountedPrice(produit.ID_Article, originalPrice);

    // Première image du produit (les images sont séparées par des virgules en BDD)
    const imageUrl = produit.images
        ? `${import.meta.env.VITE_API_URL}/images/${produit.images.split(",")[0].trim()}`
        : `https://placehold.co/300x300?text=${encodeURIComponent(produit.nom_produit)}`;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(produit, 1);
    };

    return (
        <>
            <div className={`product-card${viewMode === "list" ? " product-card--list" : ""}`}>
                {/* Image avec spinner de chargement */}
                <div className="product-card-image-zone">
                    {!imageLoaded && <span className="product-card-spinner"></span>}
                    <img
                        src={imageUrl}
                        alt={produit.nom_produit}
                        className={`product-card-image${imageLoaded ? " loaded" : ""}`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    {produit.nouveau && <span className="product-card-badge">NEW</span>}
                    <button
                        className="btn-quickview"
                        onClick={() => setShowQuickView(true)}
                    >
                        Aperçu rapide
                    </button>
                </div>

                {/* Infos du produit */}
                <div className="product-card-body">
                    <span className="product-card-category">{produit.categorie}</span>
                    <h3 className="product-card-title">
                        {produit.nom_produit}
                        {/* Badge promo à côté du nom si l'article est en promotion */}
                        {discount > 0 && <span className="promo-badge-inline">-{discount}%</span>}
                    </h3>
                    {produit.description && (
                        <p className="product-card-desc">{produit.description}</p>
                    )}
                    <div className="product-card-footer">
                        <span className="product-card-price">
                            {/* Si promo : ancien prix barré + nouveau prix en rouge */}
                            {discount > 0 && (
                                <span className="price-original">{originalPrice.toFixed(2)} &euro;</span>
                            )}
                            <span className={discount > 0 ? "price-promo" : ""}>
                                {finalPrice.toFixed(2)} &euro;
                            </span>
                        </span>
                        <div className="product-card-actions">
                            <Link
                                to={`/produits/${produit.ID_Article}`}
                                className="btn-voir"
                            >
                                Voir
                            </Link>
                            {produit.stock > 0 ? (
                                <button className="btn-add-cart" onClick={handleAddToCart}>
                                    + Panier
                                </button>
                            ) : (
                                <span className="out-of-stock">Rupture</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modale d'aperçu rapide */}
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
