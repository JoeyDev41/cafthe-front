import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/monLogo.png";

const Footer = () => {
    return (
        <footer className="footer" aria-label="Pied de page">
            <div className="footer-top-accent" aria-hidden="true"></div>

            <div className="footer-main">
                <div className="footer-brand">
                    <Link to="/" aria-label="Retour à l'accueil">
                        <img src={logo} alt="CafThé" className="footer-logo" />
                    </Link>
                    <p className="footer-tagline">
                        L'art du thé & du café d'exception
                    </p>
                    <p className="footer-description">
                        Sélection rigoureuse des meilleurs terroirs,
                        torréfaction artisanale et savoir-faire depuis 2024.
                    </p>
                    <div className="footer-contact-info">
                        <a href="mailto:contact@cafthe.fr" aria-label="Envoyer un email à CafThé">
                            <span aria-hidden="true">&#9993;</span> contact@cafthe.fr
                        </a>
                        <a href="tel:+33123456789" aria-label="Appeler CafThé">
                            <span aria-hidden="true">&#9742;</span> +33 (0)1 23 45 67 89
                        </a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-section">
                        <h4>La Boutique</h4>
                        <ul>
                            <li><Link to="/the">Nos Thés</Link></li>
                            <li><Link to="/cafe">Nos Cafés</Link></li>
                            <li><Link to="/accessoires">Accessoires</Link></li>
                            <li><Link to="/produits">Tous les produits</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Découvrir</h4>
                        <ul>
                            <li><Link to="/">Accueil</Link></li>
                            <li><Link to="/a-propos">Notre histoire</Link></li>
                            <li><Link to="/contact">Nous contacter</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Mon Compte</h4>
                        <ul>
                            <li><Link to="/compte">Mon espace</Link></li>
                            <li><Link to="/panier">Mon panier</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Informations</h4>
                        <ul>
                            <li><Link to="/mentions-legales">Mentions légales</Link></li>
                            <li><Link to="/cgv">CGV</Link></li>
                            <li><Link to="/politique-confidentialite">Confidentialité</Link></li>
                            <li><Link to="/plan-du-site">Plan du site</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-engagements">
                <div className="footer-engagement-item">
                    <span className="footer-engagement-icon" aria-hidden="true">&#9749;</span>
                    <span>Torréfaction artisanale</span>
                </div>
                <div className="footer-divider" aria-hidden="true"></div>
                <div className="footer-engagement-item">
                    <span className="footer-engagement-icon" aria-hidden="true">&#127807;</span>
                    <span>Commerce équitable</span>
                </div>
                <div className="footer-divider" aria-hidden="true"></div>
                <div className="footer-engagement-item">
                    <span className="footer-engagement-icon" aria-hidden="true">&#128230;</span>
                    <span>Livraison 24-48h</span>
                </div>
                <div className="footer-divider" aria-hidden="true"></div>
                <div className="footer-engagement-item">
                    <span className="footer-engagement-icon" aria-hidden="true">&#10003;</span>
                    <span>Qualité premium</span>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CafThé — Tous droits réservés</p>
                <p className="footer-rgaa">
                    Ce site s'engage à respecter le référentiel général d'amélioration de l'accessibilité (RGAA).
                </p>
            </div>
        </footer>
    );
};

export default Footer;
