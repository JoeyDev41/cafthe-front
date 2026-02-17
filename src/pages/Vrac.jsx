// Page de vente en vrac (thés et cafés au poids)
// Utilise le composant VracProductCard au lieu de ProductCard
// Filtres : catégorie, tri, fourchette de prix au kg

import React, { useEffect, useState } from "react";
import { searchArticles } from "../services/api.js";
import VracProductCard from "../components/VracProductCard.jsx";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
// On l'utilise pour changer le titre de l'onglet et la meta description sur chaque page
import { Helmet } from "react-helmet-async";

const Vrac = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    // États des filtres
    const [tri, setTri] = useState("");
    const [ordre, setOrdre] = useState("asc");
    const [prixMin, setPrixMin] = useState("");
    const [prixMax, setPrixMax] = useState("");
    const [categorie, setCategorie] = useState("");

    // Quand un filtre change, on revient à la page 1
    useEffect(() => {
        setPage(1);
    }, [tri, ordre, prixMin, prixMax, categorie]);

    // Chargement des produits vrac depuis l'API
    useEffect(() => {
        const fetchVrac = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // type_vente: "poids" pour ne récupérer que les produits vendus au poids
                const params = { type_vente: "poids", page, limite: 12 };
                if (categorie) params.categorie = categorie;
                if (tri) params.tri = tri;
                if (tri) params.ordre = ordre;
                if (prixMin !== "") params.prixMin = prixMin;
                if (prixMax !== "") params.prixMax = prixMax;

                const result = await searchArticles(params);
                setProduits(result.articles || []);
                setTotalPages(result.totalPages || 1);
            } catch (err) {
                console.error("Erreur chargement produits vrac:", err);
                setError("Impossible de charger les produits en vrac");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVrac();
    }, [tri, ordre, prixMin, prixMax, categorie, page]);

    return (
        <div className="products-page">
            {/* Helmet : titre et description pour la page Vrac */}
            <Helmet>
                <title>Vrac - Thés & Cafés au poids | CafThé</title>
                <meta name="description" content="Achetez vos thés et cafés en vrac au poids. Choisissez la quantité qui vous convient et profitez de prix avantageux." />
            </Helmet>
            <div className="product-list-section">
                {/* Barre de filtres */}
                <div className="filters-bar">
                    <div className="filter-group">
                        <label>Catégorie :</label>
                        <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                            <option value="">Toutes</option>
                            <option value="the">Thés</option>
                            <option value="cafe">Cafés</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Trier par :</label>
                        <select value={tri} onChange={(e) => setTri(e.target.value)}>
                            <option value="">Par défaut</option>
                            <option value="prix_ttc">Prix</option>
                            <option value="nom_produit">Nom</option>
                        </select>
                        {tri && (
                            <button
                                className="order-toggle"
                                onClick={() => setOrdre(ordre === "asc" ? "desc" : "asc")}
                                title={ordre === "asc" ? "Croissant" : "Décroissant"}
                            >
                                {ordre === "asc" ? "↑" : "↓"}
                            </button>
                        )}
                    </div>
                    <div className="filter-group">
                        <label>Prix /kg :</label>
                        <input
                            type="number"
                            placeholder="Min"
                            value={prixMin}
                            onChange={(e) => setPrixMin(e.target.value)}
                            className="filter-input"
                            min="0"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={prixMax}
                            onChange={(e) => setPrixMax(e.target.value)}
                            className="filter-input"
                            min="0"
                        />
                    </div>
                </div>

                <h1 className="section-title">Nos Thés & Cafés en Vrac</h1>

                {isLoading && (
                    <p className="empty-state" style={{ gridArea: "list" }}>Chargement...</p>
                )}

                {error && (
                    <div className="product-list-error" style={{ gridArea: "list" }}>
                        <div className="error-container">
                            <h3>Erreur</h3>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                {!isLoading && !error && produits.length === 0 && (
                    <p className="empty-state">Aucun produit en vrac disponible.</p>
                )}

                {!isLoading && !error && produits.length > 0 && (
                    <div className="product-list">
                        {produits.map((produit) => (
                            <VracProductCard key={produit.ID_Article} produit={produit} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && !error && totalPages > 1 && (
                    <div className="pagination">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                            className="pagination-btn"
                        >
                            Précédent
                        </button>
                        <span className="pagination-info">
                            Page {page} / {totalPages}
                        </span>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            className="pagination-btn"
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vrac;
