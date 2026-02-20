// Footer du site
// Contient les liens de navigation, informations légales et mention RGAA (accessibilité)

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>CafThé</h4>
                    <p>
                        Spécialiste des thés et cafés haut de gamme,
                        sélectionnés avec soin depuis les meilleurs terroirs mondiaux.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/a-propos">À propos</Link></li>
                        <li><Link to="/the">Nos Thés</Link></li>
                        <li><Link to="/cafe">Nos Cafés</Link></li>
                        <li><Link to="/accessoires">Accessoires</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Mon compte</h4>
                    <ul>
                        <li><Link to="/compte">Mon espace</Link></li>
                        <li><Link to="/panier">Mon panier</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Engagements</h4>
                    <ul>
                        <li>Commerce équitable</li>
                        <li>Agriculture durable</li>
                        <li>Qualité premium</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Informations légales</h4>
                    <ul>
                        <li><Link to="/mentions-legales">Mentions légales</Link></li>
                        <li><Link to="/cgv">Conditions générales de vente</Link></li>
                        <li><Link to="/politique-confidentialite">Politique de confidentialité</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CafThé - Tous droits réservés</p>
                <p className="footer-rgaa">
                    Ce site s'engage à respecter le référentiel général d'amélioration de l'accessibilité (RGAA).
                </p>
            </div>
        </footer>
    );
};

export default Footer;
