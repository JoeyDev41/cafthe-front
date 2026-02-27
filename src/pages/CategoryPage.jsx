import React, { useState } from "react";
import ProductList from "./ProductList.jsx";

const CategoryPage = ({ title, subtitle, category, showTypeVenteFilter = true }) => {
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [tri, setTri] = useState("");
    const [ordre, setOrdre] = useState("asc");
    const [typeVente, setTypeVente] = useState("all");

    const handleReset = () => {
        setPriceMin("");
        setPriceMax("");
        setTri("");
        setOrdre("asc");
        setTypeVente("all");
    };

    return (
        <div className="category-page">
            <aside className="category-sidebar" aria-label="Filtres de produits">
                <div className="sidebar-card">
                    <h3>Filtres</h3>

                    <div className="sidebar-section">
                        <h4>Trier par</h4>
                        <div className="sidebar-tri">
                            <select
                                id={`sidebar-tri-${category}`}
                                value={tri}
                                onChange={(e) => setTri(e.target.value)}
                                className="sidebar-tri-select"
                                aria-label="Trier par"
                            >
                                <option value="">Par défaut</option>
                                <option value="prix_ttc">Prix</option>
                                <option value="nom_produit">Nom</option>
                            </select>
                            {tri && (
                                <button
                                    className="order-toggle"
                                    onClick={() => setOrdre(ordre === "asc" ? "desc" : "asc")}
                                    aria-label={ordre === "asc" ? "Ordre croissant, cliquer pour décroissant" : "Ordre décroissant, cliquer pour croissant"}
                                >
                                    {ordre === "asc" ? "↑" : "↓"}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h4>Prix</h4>
                        <div className="sidebar-price">
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                                className="sidebar-price-input"
                                min="0"
                                aria-label="Prix minimum"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                                className="sidebar-price-input"
                                min="0"
                                aria-label="Prix maximum"
                            />
                        </div>
                    </div>

                    {showTypeVenteFilter && (
                        <div className="sidebar-section">
                            <h4>Type de vente</h4>
                            <div className="sidebar-type-vente">
                                {[
                                    { value: "all", label: "Tous" },
                                    { value: "unité", label: "Unité" },
                                    { value: "poids", label: "Vrac" },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`sidebar-type-btn${typeVente === option.value ? " active" : ""}`}
                                        onClick={() => setTypeVente(option.value)}
                                        aria-pressed={typeVente === option.value}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="sidebar-reset" type="button" onClick={handleReset} aria-label="Réinitialiser les filtres">
                        Réinitialiser
                    </button>
                </div>
            </aside>

            <main className="category-main" aria-label="Liste des produits">
                <div className="category-header">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

                <ProductList
                    forcedCategory={category}
                    forcedPrixMin={priceMin}
                    forcedPrixMax={priceMax}
                    forcedTri={tri}
                    forcedOrdre={ordre}
                    forcedTypeVente={typeVente}
                    showTitle={false}
                    showFilters={false}
                    showPagination={false}
                    pageSize={50}
                />
            </main>
        </div>
    );
};

export default CategoryPage;
