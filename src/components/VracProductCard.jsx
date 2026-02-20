// Carte produit pour la vente en vrac
// L'utilisateur choisit le poids souhaité via un select
// Le prix est calculé au prorata du prix au kilo

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";

// Options de poids disponibles pour le vrac
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
    const { addToCart } = useContext(CartContext);
    const [poids, setPoids] = useState(100);
    const [imageLoaded, setImageLoaded] = useState(false);

    const imageUrl = produit.images
        ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
        : `https://placehold.co/300x300?text=${encodeURIComponent(produit.nom_produit)}`;

    // Calcul du prix en fonction du poids choisi (prix_ttc = prix au kg en BDD)
    const prixVrac = (produit.prix_ttc * poids / 1000).toFixed(2);

    const handleAdd = () => {
        // On ajoute le produit avec un identifiant unique par combinaison article + poids
        // pour que 100g et 250g du même thé soient 2 lignes différentes dans le panier
        addToCart(
            {
                ...produit,
                isVrac: true,
                poids,
                vracId: `${produit.ID_Article}_vrac_${poids}`,
            },
            1
        );
    };

    return (
        <div className="product-card">
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

                {/* Sélecteur de poids + prix calculé */}
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
                    <button className="btn-add-cart" onClick={handleAdd}>
                        + Panier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VracProductCard;
