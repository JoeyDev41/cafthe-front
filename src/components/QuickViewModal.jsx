import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { PromotionContext } from "../context/PromotionContext.jsx";

const POIDS_OPTIONS = [
    { label: "10g", value: 10 },
    { label: "20g", value: 20 },
    { label: "50g", value: 50 },
    { label: "100g", value: 100 },
    { label: "250g", value: 250 },
    { label: "500g", value: 500 },
    { label: "1kg", value: 1000 },
];

const QuickViewModal = ({ produit, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const { getDiscount, getDiscountedPrice } = useContext(PromotionContext);
    const discount = getDiscount(produit.ID_Article);
    const originalPrice = parseFloat(produit.prix_ttc);
    const finalPrice = getDiscountedPrice(produit.ID_Article, originalPrice);
    const [quantity, setQuantity] = useState(1);
    const [poids, setPoids] = useState(100);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const closeButtonRef = useRef(null);

    const isVrac = produit.type_vente === "poids";

    const prixVrac = (originalPrice * poids / 1000).toFixed(2);

    useEffect(() => {
        closeButtonRef.current?.focus();
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const imagesList = produit.images
        ? produit.images.split(",").map((img) => `${import.meta.env.VITE_API_URL}/images/${img.trim()}`)
        : [`https://placehold.co/400x400?text=${encodeURIComponent(produit.nom_produit)}`];

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    };

    const handleAdd = () => {
        if (isVrac) {
            addToCart(
                {
                    ...produit,
                    isVrac: true,
                    poids,
                    vracId: `${produit.ID_Article}_vrac_${poids}`,
                },
                1
            );
        } else {
            addToCart(produit, quantity);
        }
    };

    return (
        <div className="quickview-overlay" onClick={onClose} role="presentation">
            <div
                className="quickview-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="quickview-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button ref={closeButtonRef} className="quickview-close" onClick={onClose} aria-label="Fermer l'aperçu rapide">&times;</button>

                <div className="quickview-content">
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

                        <div className="quickview-price">
                            {isVrac ? (
                                <>
                                    <span className="vrac-price-modal">{prixVrac} &euro;</span>
                                    <span className="vrac-price-kg-modal">{originalPrice.toFixed(2)} &euro;/kg</span>
                                </>
                            ) : (
                                <>
                                    {discount > 0 && (
                                        <span className="price-original">{originalPrice.toFixed(2)} &euro;</span>
                                    )}
                                    <span className={discount > 0 ? "price-promo" : ""}>
                                        {finalPrice.toFixed(2)} &euro;
                                    </span>
                                    {discount > 0 && <span className="promo-badge-inline">-{discount}%</span>}
                                </>
                            )}
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
                                {isVrac ? (
                                    <select
                                        className="vrac-select"
                                        value={poids}
                                        onChange={(e) => setPoids(Number(e.target.value))}
                                        aria-label={`Poids pour ${produit.nom_produit}`}
                                    >
                                        {POIDS_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
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
                                )}
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
