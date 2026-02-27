import React, { useEffect, useState } from "react";
import { searchArticles } from "../services/api.js";
import VracProductCard from "../components/VracProductCard.jsx";

const Vrac = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const [tri, setTri] = useState("");
    const [ordre, setOrdre] = useState("asc");
    const [prixMin, setPrixMin] = useState("");
    const [prixMax, setPrixMax] = useState("");
    const [categorie, setCategorie] = useState("");

    useEffect(() => {
        setPage(1);
    }, [tri, ordre, prixMin, prixMax, categorie]);

    useEffect(() => {
        const fetchVrac = async () => {
            try {
                setIsLoading(true);
                setError(null);

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
                <title>Vrac - Thés & Cafés au poids | CafThé</title>
                <meta name="description" content="Achetez vos thés et cafés en vrac au poids. Choisissez la quantité qui vous convient parmi notre sélection premium." />
            <div className="product-list-section">
                <div className="filters-bar">
                    <div className="filter-group">
                        <label htmlFor="vrac-filter-categorie">Catégorie :</label>
                        <select id="vrac-filter-categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                            <option value="">Toutes</option>
                            <option value="the">Thés</option>
                            <option value="cafe">Cafés</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="vrac-filter-tri">Trier par :</label>
                        <select id="vrac-filter-tri" value={tri} onChange={(e) => setTri(e.target.value)}>
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
                        <label htmlFor="vrac-prix-min">Prix /kg :</label>
                        <input
                            id="vrac-prix-min"
                            type="number"
                            placeholder="Min"
                            value={prixMin}
                            onChange={(e) => setPrixMin(e.target.value)}
                            className="filter-input"
                            min="0"
                            aria-label="Prix minimum par kg"
                        />
                        <span aria-hidden="true">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={prixMax}
                            onChange={(e) => setPrixMax(e.target.value)}
                            className="filter-input"
                            min="0"
                            aria-label="Prix maximum par kg"
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

                {!isLoading && !error && totalPages > 1 && (
                    <nav className="pagination" aria-label="Pagination des produits vrac">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                            className="pagination-btn"
                            aria-label="Page précédente"
                        >
                            Précédent
                        </button>
                        <span className="pagination-info" aria-live="polite">
                            Page {page} / {totalPages}
                        </span>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            className="pagination-btn"
                            aria-label="Page suivante"
                        >
                            Suivant
                        </button>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Vrac;
