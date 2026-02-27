import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { CartContext } from "../context/CartContext.jsx";
import { PromotionContext } from "../context/PromotionContext.jsx";

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const { getDiscount, getDiscountedPrice } = useContext(PromotionContext);

    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [poids, setPoids] = useState(100);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const POIDS_OPTIONS = [
        { label: "10g", value: 10 },
        { label: "20g", value: 20 },
        { label: "50g", value: 50 },
        { label: "100g", value: 100 },
        { label: "250g", value: 250 },
        { label: "500g", value: 500 },
        { label: "1kg", value: 1000 },
    ];

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/articles/${id}`
                );

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                setProduit(data.article);
            } catch (err) {
                console.error("Erreur lors du chargement du produit :", err);
                setError("Impossible de charger le produit");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProduit();
    }, [id]);

    const handleAddToCart = () => {
        if (produit.type_vente === "poids") {
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

    if (isLoading) {
        return (
            <div className="product-details-skeleton">
                <Skeleton height={400} width={400} />
                <div style={{ marginTop: 20 }}>
                    <Skeleton height={30} width="50%" />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="40%" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-error">
                <div className="error-container">
                    <h3>Une erreur est survenue</h3>
                    <p>{error}</p>
                    <Link to="/" className="back-link">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    const imagesList = produit.images
        ? produit.images.split(",").map((img) => `${import.meta.env.VITE_API_URL}/images/${img.trim()}`)
        : [`https://placehold.co/500x500?text=${encodeURIComponent(produit.nom_produit)}`];

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
                <title>{produit ? `${produit.nom_produit} | CafThé` : "Détail produit | CafThé"}</title>
                <meta name="description" content={produit ? `${produit.nom_produit} - Découvrez ce produit premium chez CafThé.` : "Détail d'un produit CafThé."} />
        <div className="product-details">
            <Link to="/produits" className="back-link">&larr; Retour aux produits</Link>

            <div className="product-details-content">
                <div className="product-details-gallery">
                    <div className="gallery-main">
                        {imagesList.length > 1 && (
                            <button className="gallery-arrow gallery-arrow-left" onClick={handlePrevImage} aria-label="Image précédente">&lsaquo;</button>
                        )}
                        <img src={imagesList[currentImageIndex]} alt={`${produit.nom_produit} - photo ${currentImageIndex + 1}`} />
                        {imagesList.length > 1 && (
                            <button className="gallery-arrow gallery-arrow-right" onClick={handleNextImage} aria-label="Image suivante">&rsaquo;</button>
                        )}
                    </div>
                    {imagesList.length > 1 && (
                        <div className="gallery-thumbnails">
                            {imagesList.map((img, index) => (
                                <button
                                    key={index}
                                    className={`gallery-thumb${index === currentImageIndex ? " active" : ""}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    aria-label={`Voir l'image ${index + 1}`}
                                >
                                    <img src={img} alt={`${produit.nom_produit} - miniature ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-details-info">
                    <span className="product-category-badge">{produit.categorie}</span>
                    <h1>{produit.nom_produit}</h1>

                    {produit.origine && (
                        <p className="product-origin">Origine : {produit.origine}</p>
                    )}

                    <p className="product-description">{produit.description}</p>

                    <div className="product-pricing">
                        {getDiscount(produit.ID_Article) > 0 && (
                            <span className="product-promo-tag">-{getDiscount(produit.ID_Article)}% PROMO</span>
                        )}
                        {getDiscount(produit.ID_Article) > 0 ? (
                            <>
                                <span className="product-price-ttc">
                                    <span className="price-original">{parseFloat(produit.prix_ttc).toFixed(2)} €</span>
                                    {" "}
                                    <span className="price-promo">{getDiscountedPrice(produit.ID_Article, parseFloat(produit.prix_ttc)).toFixed(2)} € TTC</span>
                                </span>
                            </>
                        ) : (
                            <span className="product-price-ttc">{parseFloat(produit.prix_ttc).toFixed(2)} € TTC</span>
                        )}
                        <span className="product-price-ht">
                            {parseFloat(produit.prix_ht).toFixed(2)} € HT
                            (TVA {parseFloat(produit.taux_tva).toFixed(1)}%)
                        </span>
                    </div>

                    <div className="product-stock">
                        {produit.stock > 0 ? (
                            <span className="stock-available">
                                En stock ({produit.stock} {produit.type_vente === "poids" ? "g" : "unités"} disponibles)
                            </span>
                        ) : (
                            <span className="stock-unavailable">Rupture de stock</span>
                        )}
                    </div>

                    {produit.stock > 0 && (
                        <div className="product-add-to-cart">
                            {produit.type_vente === "poids" ? (
                                <div className="vrac-selector">
                                    <label htmlFor="vrac-poids-detail" className="vrac-label">Poids :</label>
                                    <select
                                        id="vrac-poids-detail"
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
                                </div>
                            ) : (
                                <div className="quantity-selector">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="qty-btn"
                                        aria-label="Diminuer la quantité"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={produit.stock}
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 1;
                                            setQuantity(Math.min(val, produit.stock));
                                        }}
                                        className="qty-input"
                                        aria-label="Quantité"
                                    />
                                    <button
                                        onClick={() => setQuantity(Math.min(quantity + 1, produit.stock))}
                                        className="qty-btn"
                                        aria-label="Augmenter la quantité"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <div className="dynamic-price" aria-live="polite" aria-atomic="true">
                                {produit.type_vente === "poids"
                                    ? `Total : ${(parseFloat(produit.prix_ttc) * poids / 1000).toFixed(2)} €`
                                    : `Total : ${(getDiscountedPrice(produit.ID_Article, parseFloat(produit.prix_ttc)) * quantity).toFixed(2)} €`
                                }
                            </div>

                            <button className="btn-primary btn-add-cart-detail" onClick={handleAddToCart}>
                                Ajouter au panier
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductDetails;
