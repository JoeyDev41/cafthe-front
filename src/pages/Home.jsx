import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "./ProductList.jsx";
import { getActivePromotions } from "../services/api.js";
import heroImg from "../assets/hero.png";

const Home = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const loadPromos = async () => {
            try {
                const data = await getActivePromotions();
                setPromotions(data.promotions);
            } catch (error) {
                console.error("Erreur chargement promotions:", error);
            }
        };
        loadPromos();
    }, []);

    return (
        <div className="home">
                <title>CafThé - Thés & Cafés Premium | Boutique en ligne</title>
                <meta name="description" content="CafThé, votre boutique en ligne de thés et cafés premium. Découvrez notre sélection artisanale." />
            <section className="hero" aria-label="Présentation CafThé">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">Nouvelle collection</span>
                        <h1>Feuilles &amp; Grains d'Exception</h1>
                        <p>
                            Sélection de thés et cafés premium, torréfiés à la main
                            dans notre atelier.
                        </p>
                        <Link to="/a-propos" className="btn-hero">
                            Découvrir notre histoire
                        </Link>
                    </div>
                    <div className="hero-media">
                        <img
                            className="hero-image"
                            src={heroImg}
                            alt="Service à thé et café"
                        />
                    </div>
                </div>
            </section>

            <section className="categories-section" id="categories" aria-label="Nos catégories">
                <div className="section-header centered">
                    <h2 className="section-title">Nos Catégories</h2>
                </div>
                <div className="categories-grid">
                    <Link to="/the" className="category-card">
                        <div className="category-frame">
                            <img src="src\assets\le-the-une-infusion-sante.jpeg" alt="tasse de thé" />
                        </div>
                        <h3>Thés</h3>
                    </Link>
                    <Link to="/cafe" className="category-card">
                        <div className="category-frame">
                            <img src="src\assets\cafe.webp" alt="tasse de café" />
                        </div>
                        <h3>Cafés</h3>
                    </Link>
                    <Link to="/accessoires" className="category-card">
                        <div className="category-frame">
                            <img src="src\assets\accessoires.webp" alt="accessoires  " />
                            </div>
                        <h3>Accessoires</h3>
                    </Link>
                </div>
            </section>

            <section className="products-section home-products" aria-label="Produits phares">
                <div className="section-header">
                    <h2 className="section-title">Produits Phares</h2>
                    <Link to="/produits" className="section-link">Voir tout</Link>
                </div>
                <ProductList showTitle={false} />
            </section>

            {promotions.length > 0 && (
                <section className="promotions-section" aria-label="Promotions en cours">
                    <div className="section-header centered">
                        <h2 className="section-title">Promotions</h2>
                    </div>
                    <div className="promotions-grid">
                        {promotions.map((promo) => (
                            <div key={promo.id} className="promo-card">
                                <span className="promo-tag">
                                    {promo.discount_percent > 0 ? `-${promo.discount_percent}%` : "Offre spéciale"}
                                </span>
                                <h3>{promo.titre}</h3>
                                <p>{promo.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="values-section" aria-label="Nos valeurs">
                <h2 className="section-title">Nos Valeurs</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <span className="value-icon" aria-hidden="true">&#9749;</span>
                        <h4>Qualité Premium</h4>
                        <p>Sélection rigoureuse</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon" aria-hidden="true">&#129309;</span>
                        <h4>Commerce Équitable</h4>
                        <p>Producteurs respectés</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon" aria-hidden="true">&#128230;</span>
                        <h4>Livraison Rapide</h4>
                        <p>24-48h chrono</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
