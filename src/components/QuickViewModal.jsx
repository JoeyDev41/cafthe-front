// Modale d'aperçu rapide d'un produit
// S'affiche au clic sur "Aperçu rapide" dans la carte produit
// Permet d'ajouter au panier sans quitter la page de listing
// Inclut un mini-carrousel si le produit a plusieurs images

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { PromotionContext } from "../context/PromotionContext.jsx";

const QuickViewModal = ({ produit, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const { getDiscount, getDiscountedPrice } = useContext(PromotionContext);
    const discount = getDiscount(produit.ID_Article);
    const originalPrice = parseFloat(produit.prix_ttc);
    const finalPrice = getDiscountedPrice(produit.ID_Article, originalPrice);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const closeButtonRef = useRef(null);

    // Focus sur le bouton fermer à l'ouverture + fermeture par Escape (RGAA 7.3)
    useEffect(() => {
        closeButtonRef.current?.focus();
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Je récupère toutes les images du produit (séparées par des virgules en BDD)
    const imagesList = produit.images
        ? produit.images.split(",").map((img) => `${import.meta.env.VITE_API_URL}/images/${img.trim()}`)
        : [`https://placehold.co/400x400?text=${encodeURIComponent(produit.nom_produit)}`];

    // Navigation dans le carrousel
    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    };

    const handleAdd = () => {
        addToCart(produit, quantity);
    };

    return (
        // Clic sur l'overlay (fond sombre) ferme la modale
        <div className="quickview-overlay" onClick={onClose} role="presentation">
            {/* stopPropagation empêche le clic sur la modale de la fermer */}
            {/* role=dialog + aria-modal + aria-labelledby : RGAA 7.1 — composant ARIA requis */}
            <div
                className="quickview-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="quickview-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button ref={closeButtonRef} className="quickview-close" onClick={onClose} aria-label="Fermer l'aperçu rapide">&times;</button>

                <div className="quickview-content">
                    {/* Zone image avec carrousel si plusieurs images */}
                    <div className="quickview-image">
                        <div className="quickview-gallery">
                            {imagesList.length > 1 && (
                                <button className="gallery-arrow gallery-arrow-left" onClick={handlePrevImage} aria-label="Image précédente">&lsaquo;</button>
                            )}
                            <img src={imagesList[currentImageIndex]} alt={`${produit.nom_produit} - photo ${currentImageIndex + 1}`} />
                            {imagesList.length > 1 && (
                                <button className="gallery-arrow gallery-arrow-right" onClick={handleNextImage} aria-label="Image suivante">&rsaquo;</button>
                            )}
                        </div>
                        {/* Petits points indicateurs sous l'image */}
                        {imagesList.length > 1 && (
                            <div className="quickview-dots">
                                {imagesList.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`quickview-dot${index === currentImageIndex ? " active" : ""}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                        aria-label={`Image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="quickview-info">
                        <span className="product-card-category">{produit.categorie}</span>
                        <h3 id="quickview-title" className="quickview-title">{produit.nom_produit}</h3>

                        {produit.description && (
                            <p className="quickview-desc">{produit.description}</p>
                        )}

                        {/* Affichage du prix avec promo si applicable */}
                        <div className="quickview-price">
                            {discount > 0 && (
                                <span className="price-original">{originalPrice.toFixed(2)} &euro;</span>
                            )}
                            <span className={discount > 0 ? "price-promo" : ""}>
                                {finalPrice.toFixed(2)} &euro;
                            </span>
                            {discount > 0 && <span className="promo-badge-inline">-{discount}%</span>}
                        </div>

                        <div className="quickview-stock">
                            {produit.stock > 0 ? (
                                <span className="stock-available">En stock</span>
                            ) : (
                                <span className="stock-unavailable">Rupture de stock</span>
                            )}
                        </div>

                        {produit.stock > 0 && (
                            <div className="quickview-actions">
                                <div className="quantity-selector">
                                    <button
                                        className="qty-btn"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        aria-label="Diminuer la quantité"
                                    >
                                        -
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => setQuantity(Math.min(quantity + 1, produit.stock))}
                                        aria-label="Augmenter la quantité"
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="btn-primary btn-quickview-add" onClick={handleAdd}>
                                    Ajouter au panier
                                </button>
                            </div>
                        )}

                        <Link
                            to={`/produits/${produit.ID_Article}`}
                            className="quickview-details-link"
                            onClick={onClose}
                        >
                            Voir les détails complets &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
