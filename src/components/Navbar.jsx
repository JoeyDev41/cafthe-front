import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";
import { CartContext } from "../context/CartContext.jsx";
import MiniCart from "./MiniCart.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import logo from "../assets/monLogo.png";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { getItemCount } = useContext(CartContext);
    const navigate = useNavigate();

    const [showMiniCart, setShowMiniCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const normalizeSearch = (value) =>
        value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

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

                <div id="navbar-menu" className={`navbar-center ${menuOpen ? "open" : ""}`}>
                    <Link to="/produits" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Nos Produits
                    </Link>
                    <Link to="/accessoires" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                        Accessoires
                    </Link>

                    {/* Compte / Connexion visible dans le menu burger en mobile */}
                    {isAuthenticated ? (
                        <>
                            <Link to="/compte" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                                {user?.prenom || "Mon compte"}
                            </Link>
                            <button className="navbar-logout-button" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-cat-link" onClick={() => setMenuOpen(false)}>
                            Se connecter
                        </Link>
                    )}

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
                    <ThemeToggle />
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

                    <button
                        className="navbar-burger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={menuOpen}
                        aria-controls="navbar-menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <MiniCart isOpen={showMiniCart} onClose={() => setShowMiniCart(false)} />
        </>
    );
};

export default Navbar;