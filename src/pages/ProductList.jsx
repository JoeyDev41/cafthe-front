import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard.jsx";
import VracProductCard from "../components/VracProductCard.jsx";
import { searchArticles } from "../services/api.js";

const ProductList = ({
    forcedCategory = "",
    forcedSearch,
    forcedPrixMin,
    forcedPrixMax,
    forcedTri,
    forcedOrdre,
    forcedTypeVente,
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

    const [tri, setTri] = useState("");
    const [ordre, setOrdre] = useState("asc");
    const [prixMin, setPrixMin] = useState("");
    const [prixMax, setPrixMax] = useState("");
    const [typeVente, setTypeVente] = useState("all");

    const categorieFromUrl = searchParams.get("categorie") || "";
    const searchFromUrl = searchParams.get("search") || "";
    const typeVenteFromUrl = searchParams.get("type_vente") || "";
    const effectiveCategory = forcedCategory || categorieFromUrl;
    const effectiveSearch = forcedSearch !== undefined ? forcedSearch : searchFromUrl;
    const effectivePrixMin = forcedPrixMin !== undefined ? forcedPrixMin : prixMin;
    const effectivePrixMax = forcedPrixMax !== undefined ? forcedPrixMax : prixMax;
    const effectiveTri = forcedTri !== undefined ? forcedTri : tri;
    const effectiveOrdre = forcedOrdre !== undefined ? forcedOrdre : ordre;
    const effectiveTypeVente = forcedTypeVente !== undefined ? forcedTypeVente : (typeVenteFromUrl || typeVente);

    useEffect(() => {
        const tvFromUrl = searchParams.get("type_vente");
        if (tvFromUrl) {
            setTypeVente(tvFromUrl);
        }
    }, [searchParams]);

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

    useEffect(() => {
        setPage(1);
    }, [effectiveCategory, effectiveSearch, effectiveTri, effectiveOrdre, effectivePrixMin, effectivePrixMax, effectiveTypeVente]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setError(null);
                setIsLoading(true);

                const params = { page, limite: pageSize };
                if (effectiveCategory) params.categorie = effectiveCategory;
                if (effectiveSearch) params.search = effectiveSearch;
                if (effectiveTri) params.tri = effectiveTri;
                if (effectiveTri) params.ordre = effectiveOrdre;
                if (effectivePrixMin !== "" && effectivePrixMin !== null && effectivePrixMin !== undefined) {
                    params.prixMin = effectivePrixMin;
                }
                if (effectivePrixMax !== "" && effectivePrixMax !== null && effectivePrixMax !== undefined) {
                    params.prixMax = effectivePrixMax;
                }
                if (effectiveTypeVente) {
                    params.type_vente = effectiveTypeVente;
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
    }, [effectiveCategory, effectiveSearch, effectiveTri, effectiveOrdre, effectivePrixMin, effectivePrixMax, effectiveTypeVente, page, pageSize]);

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

    if (isLoading) {
        return (
            <div className="product-list-section">
                {showTitle && <h1 className="section-title">{getCategoryTitle()}</h1>}
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
            {showTitle && <h1 className="section-title">{getCategoryTitle()}</h1>}

            {showFilters && (
                <div className="filters-bar">
                    {!forcedCategory && (
                        <div className="filter-group">
                            <label htmlFor="filter-categorie">Catégorie :</label>
                            <select id="filter-categorie" value={effectiveCategory} onChange={handleCategoryChange}>
                                <option value="">Toutes</option>
                                <option value="the">Thés</option>
                                <option value="cafe">Cafés</option>
                                <option value="accessoires">Accessoires</option>
                            </select>
                        </div>
                    )}
                    <div className="filter-group">
                        <label htmlFor="filter-type-vente">Type :</label>
                        <select
                            id="filter-type-vente"
                            value={typeVente}
                            onChange={(e) => setTypeVente(e.target.value)}
                        >
                            <option value="all">Tous</option>
                            <option value="unité">Unité</option>
                            <option value="poids">Vrac</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="filter-tri">Trier par :</label>
                        <select id="filter-tri" value={tri} onChange={(e) => setTri(e.target.value)}>
                            <option value="">Par défaut</option>
                            <option value="prix_ttc">Prix</option>
                            <option value="nom_produit">Nom</option>
                        </select>
                        {tri && (
                            <button
                                className="order-toggle"
                                onClick={() => setOrdre(ordre === "asc" ? "desc" : "asc")}
                                aria-label={ordre === "asc" ? "Ordre croissant, cliquer pour décroissant" : "Ordre décroissant, cliquer pour croissant"}
                                title={ordre === "asc" ? "Croissant" : "Décroissant"}
                            >
                                {ordre === "asc" ? "↑" : "↓"}
                            </button>
                        )}
                    </div>

                    <div className="filter-group">
                        <label htmlFor="filter-prix-min">Prix :</label>
                        <input
                            id="filter-prix-min"
                            type="number"
                            placeholder="Min"
                            value={effectivePrixMin ?? ""}
                            onChange={(e) => setPrixMin(e.target.value)}
                            className="filter-input"
                            min="0"
                            aria-label="Prix minimum"
                        />
                        <span aria-hidden="true">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={effectivePrixMax ?? ""}
                            onChange={(e) => setPrixMax(e.target.value)}
                            className="filter-input"
                            min="0"
                            aria-label="Prix maximum"
                        />
                    </div>
                </div>
            )}

            {produits.length === 0 ? (
                <p className="empty-state">Aucun produit trouvé.</p>
            ) : (
                <>
                    <div className="product-cards-wrapper">
                        {showViewToggle && (
                            <div className="view-toggle">
                                <button
                                    className={`view-toggle-btn${viewMode === "grid" ? " active" : ""}`}
                                    onClick={() => setViewMode("grid")}
                                    aria-label="Affichage en grille"
                                    aria-pressed={viewMode === "grid"}
                                    title="Affichage grille"
                                >
                                    <span aria-hidden="true">&#9638;</span> Grille
                                </button>
                                <button
                                    className={`view-toggle-btn${viewMode === "list" ? " active" : ""}`}
                                    onClick={() => setViewMode("list")}
                                    aria-label="Affichage en liste"
                                    aria-pressed={viewMode === "list"}
                                    title="Affichage liste"
                                >
                                    <span aria-hidden="true">&#9776;</span> Liste
                                </button>
                            </div>
                        )}

                        <div className={`product-list${viewMode === "list" ? " product-list--list" : ""}`}>
                            {produits.map((produit) => (
                                produit.type_vente === "poids" ? (
                                    <VracProductCard key={produit.ID_Article} produit={produit} />
                                ) : (
                                    <ProductCard key={produit.ID_Article} produit={produit} viewMode={viewMode} />
                                )
                            ))}
                        </div>
                    </div>

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
