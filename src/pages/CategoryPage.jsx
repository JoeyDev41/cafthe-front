// Composant générique pour les pages catégorie (Thés, Cafés, Accessoires)
// Reçoit en props le titre, sous-titre et la catégorie à filtrer
// Contient une sidebar avec filtre de prix et le composant ProductList

import React, { useState } from "react";
import ProductList from "./ProductList.jsx";

const CategoryPage = ({ title, subtitle, category }) => {
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [tri, setTri] = useState("");
    const [ordre, setOrdre] = useState("asc");

    const handleReset = () => {
        setPriceMin("");
        setPriceMax("");
        setTri("");
        setOrdre("asc");
    };

    return (
        <div className="category-page">
            {/* Sidebar avec filtres */}
            <aside className="category-sidebar">
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

                    <button className="sidebar-reset" type="button" onClick={handleReset} aria-label="Réinitialiser les filtres">
                        Réinitialiser
                    </button>
                </div>
            </aside>

            {/* Contenu principal : titre + liste de produits filtrés */}
            <main className="category-main">
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
