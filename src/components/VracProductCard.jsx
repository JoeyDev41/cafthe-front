import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "./QuickViewModal.jsx";

const POIDS_OPTIONS = [
    { label: "10g", value: 10 },
    { label: "20g", value: 20 },
    { label: "50g", value: 50 },
    { label: "100g", value: 100 },
    { label: "250g", value: 250 },
    { label: "500g", value: 500 },
    { label: "1kg", value: 1000 },
];

const VracProductCard = ({ produit }) => {
    const [poids, setPoids] = useState(100);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);
    const navigate = useNavigate();

    const imageUrl = produit.images
        ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
        : `https://placehold.co/300x300?text=${encodeURIComponent(produit.nom_produit)}`;

    const prixVrac = (produit.prix_ttc * poids / 1000).toFixed(2);

    const handleCardClick = (e) => {
        if (e.target.closest("select") || e.target.closest(".btn-voir")) return;
        setShowQuickView(true);
    };

    return (
    <>
        <div
            className="product-card"
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
            </div>

            <div className="product-card-body">
                <span className="product-card-category">{produit.categorie}</span>
                <h3 className="product-card-title">{produit.nom_produit}</h3>
                {produit.description && (
                    <p className="product-card-desc">{produit.description}</p>
                )}

                <div className="vrac-card-controls">
                    <select
                        className="vrac-select"
                        value={poids}
                        onChange={(e) => setPoids(Number(e.target.value))}
                        aria-label={`Quantité pour ${produit.nom_produit}`}
                    >
                        {POIDS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <span className="vrac-price">{prixVrac} &euro;</span>
                </div>

                <div className="product-card-footer">
                    <span className="vrac-price-kg">
                        {parseFloat(produit.prix_ttc).toFixed(2)} &euro;/kg
                    </span>
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

        {showQuickView && (
            <QuickViewModal
                produit={produit}
                onClose={() => setShowQuickView(false)}
            />
        )}
    </>
    );
};

export default VracProductCard;
