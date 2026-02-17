// Barre de navigation principale
// Contient : logo, liens catégories, barre de recherche, panier, connexion, menu burger mobile
// J'utilise useContext pour accéder au nombre d'articles dans le panier et à l'état de connexion

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";
import { CartContext } from "../context/CartContext.jsx";
import MiniCart from "./MiniCart.jsx";
// Bouton pour basculer entre thème clair et sombre
import ThemeToggle from "./ThemeToggle.jsx";
import logo from "../assets/monLogo.png";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { getItemCount } = useContext(CartContext);
    const navigate = useNavigate();

    const [showMiniCart, setShowMiniCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    // Normalise la recherche : minuscules, sans accents, sans espaces inutiles
    const normalizeSearch = (value) =>
        value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    // Si l'utilisateur cherche une catégorie (ex: "thé"), on le redirige directement
    const getCategoryRoute = (normalizedQuery) => {
        const categoryMap = {
            the: "the",
            thes: "the",
            cafe: "cafe",
            cafes: "cafe",
            accessoire: "accessoires",
            accessoires: "accessoires",
        };

        return categoryMap[normalizedQuery] || "";
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;

        const normalizedQuery = normalizeSearch(trimmedQuery);
        const categoryRoute = getCategoryRoute(normalizedQuery);

        if (categoryRoute) {
            navigate(`/${categoryRoute}`);
        } else {
            navigate(`/produits?search=${encodeURIComponent(trimmedQuery)}`);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
        setSearchQuery("");
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const itemCount = getItemCount();

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="Navigation principale">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="CafThé - Retour à l'accueil" className="logo" />
                </Link>

                {/* Liens de navigation (catégories + recherche) */}
                <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
                    <Link to="/produits" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Produits
                    </Link>
                    <Link to="/vrac" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Vrac
                    </Link>
                    <Link to="/the" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Thés
                    </Link>
                    <Link to="/cafe" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Cafés
                    </Link>
                    <Link to="/accessoires" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Accessoires
                    </Link>

                    {/* Barre de recherche */}
                    <form onSubmit={handleSearch} className="navbar-search">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                            aria-label="Rechercher un produit"
                        />
                        <button type="submit" className="search-btn" aria-label="Rechercher">&#128269;</button>
                    </form>
                </div>

                <div className="navbar-right">
                    {/* Bouton pour changer le thème (clair/sombre) */}
                    <ThemeToggle />
                    {/* Bouton panier avec badge */}
                    <button
                        className="navbar-cart-btn"
                        onClick={() => setShowMiniCart(true)}
                        title="Mon panier"
                        aria-label="Voir le panier"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </button>

                    {/* Affichage conditionnel selon si connecté ou non */}
                    {isAuthenticated ? (
                        <>
                            <Link to="/compte" className="navbar-user-link" title="Mon compte">
                                {user?.prenom || "Mon compte"}
                            </Link>
                            <button className="navbar-logout-button" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-link">
                            Se connecter
                        </Link>
                    )}

                    {/* Menu burger pour mobile */}
                    <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mini panier (panneau latéral) */}
            <MiniCart isOpen={showMiniCart} onClose={() => setShowMiniCart(false)} />
        </>
    );
};

export default Navbar;
