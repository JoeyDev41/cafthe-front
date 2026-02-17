// Composant de liste de produits avec filtres, tri, pagination et vue grille/liste
// Utilisé dans la page Produits et dans CategoryPage
// Reçoit des props optionnelles pour forcer une catégorie, cacher les filtres, etc.
// Utilise react-loading-skeleton pour afficher un squelette pendant le chargement

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard.jsx";
import { searchArticles } from "../services/api.js";

const ProductList = ({
    forcedCategory = "",
    forcedSearch,
    forcedPrixMin,
    forcedPrixMax,
    showTitle = true,
    showFilters = true,
    showPagination = true,
    showViewToggle = true,
    pageSize = 12,
    titleOverride = "",
}) => {
    const [viewMode, setViewMode] = useState("grid");
    const [searchParams, setSearchParams] = useSearchParams();
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    // États des filtres locaux
    const [tri, setTri] = useState("");
    const [ordre, setOrdre] = useState("asc");
    const [prixMin, setPrixMin] = useState("");
    const [prixMax, setPrixMax] = useState("");

    // On peut récupérer la catégorie et la recherche depuis l'URL ou depuis les props
    const categorieFromUrl = searchParams.get("categorie") || "";
    const searchFromUrl = searchParams.get("search") || "";
    const effectiveCategory = forcedCategory || categorieFromUrl;
    const effectiveSearch = forcedSearch !== undefined ? forcedSearch : searchFromUrl;
    const effectivePrixMin = forcedPrixMin !== undefined ? forcedPrixMin : prixMin;
    const effectivePrixMax = forcedPrixMax !== undefined ? forcedPrixMax : prixMax;

    // Quand on change de catégorie via le select, on met à jour les paramètres URL
    const handleCategoryChange = (event) => {
        const value = event.target.value;
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
            nextParams.set("categorie", value);
        } else {
            nextParams.delete("categorie");
        }

        setSearchParams(nextParams);
    };

    // Retour à la page 1 quand les filtres changent
    useEffect(() => {
        setPage(1);
    }, [effectiveCategory, effectiveSearch, tri, ordre, effectivePrixMin, effectivePrixMax]);

    // Appel API pour récupérer les produits filtrés
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setError(null);
                setIsLoading(true);

                const params = { page, limite: pageSize };
                if (effectiveCategory) params.categorie = effectiveCategory;
                if (effectiveSearch) params.search = effectiveSearch;
                if (tri) params.tri = tri;
                if (tri) params.ordre = ordre;
                if (effectivePrixMin !== "" && effectivePrixMin !== null && effectivePrixMin !== undefined) {
                    params.prixMin = effectivePrixMin;
                }
                if (effectivePrixMax !== "" && effectivePrixMax !== null && effectivePrixMax !== undefined) {
                    params.prixMax = effectivePrixMax;
                }

                const data = await searchArticles(params);
                setProduits(data.articles);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Erreur lors du chargement des produits :", err);
                setError("Impossible de charger les produits");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProduits();
    }, [effectiveCategory, effectiveSearch, tri, ordre, effectivePrixMin, effectivePrixMax, page, pageSize]);

    // Génère le titre dynamiquement selon la catégorie ou la recherche
    const getCategoryTitle = () => {
        if (titleOverride) return titleOverride;
        if (effectiveSearch) return `Résultats pour "${effectiveSearch}"`;
        switch (effectiveCategory) {
            case "the": return "Nos Thés";
            case "cafe": return "Nos Cafés";
            case "accessoire": return "Nos Accessoires";
            default: return "Tous nos produits";
        }
    };

    // Affichage du squelette pendant le chargement
    if (isLoading) {
        return (
            <div className="product-list-section">
                {showTitle && <h2 className="section-title">{getCategoryTitle()}</h2>}
                <div className="product-list">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="product-skeleton">
                            <Skeleton height={200} />
                            <div style={{ marginTop: "0.5rem" }}>
                                <Skeleton height={20} width="70%" />
                            </div>
                            <div style={{ marginTop: "0.3rem" }}>
                                <Skeleton height={20} width="40%" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Affichage en cas d'erreur
    if (error) {
        return (
            <div className="product-list-error">
                <div className="error-container">
                    <h3>Une erreur est survenue</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-list-section">
            {showTitle && <h2 className="section-title">{getCategoryTitle()}</h2>}

            {/* Barre de filtres */}
            {showFilters && (
                <div className="filters-bar">
                    {!forcedCategory && (
                        <div className="filter-group">
                            <label>Catégorie :</label>
                            <select value={effectiveCategory} onChange={handleCategoryChange}>
                                <option value="">Toutes</option>
                                <option value="the">Thés</option>
                                <option value="cafe">Cafés</option>
                                <option value="accessoires">Accessoires</option>
                            </select>
                        </div>
                    )}
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
                        <label>Prix :</label>
                        <input
                            type="number"
                            placeholder="Min"
                            value={effectivePrixMin ?? ""}
                            onChange={(e) => setPrixMin(e.target.value)}
                            className="filter-input"
                            min="0"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={effectivePrixMax ?? ""}
                            onChange={(e) => setPrixMax(e.target.value)}
                            className="filter-input"
                            min="0"
                        />
                    </div>
                </div>
            )}

            {/* Toggle grille / liste */}
            {showViewToggle && (
                <div className="view-toggle">
                    <button
                        className={`view-toggle-btn${viewMode === "grid" ? " active" : ""}`}
                        onClick={() => setViewMode("grid")}
                        title="Affichage grille"
                    >
                        &#9638; Grille
                    </button>
                    <button
                        className={`view-toggle-btn${viewMode === "list" ? " active" : ""}`}
                        onClick={() => setViewMode("list")}
                        title="Affichage liste"
                    >
                        &#9776; Liste
                    </button>
                </div>
            )}

            {produits.length === 0 ? (
                <p className="empty-state">Aucun produit trouvé.</p>
            ) : (
                <>
                    <div className={`product-list${viewMode === "list" ? " product-list--list" : ""}`}>
                        {produits.map((produit) => (
                            <ProductCard key={produit.ID_Article} produit={produit} viewMode={viewMode} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {showPagination && totalPages > 1 && (
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
                </>
            )}
        </div>
    );
};

export default ProductList;
