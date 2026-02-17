// NotFound.jsx — Page 404 (page introuvable)
// Affichée automatiquement par React Router quand l'URL ne correspond à aucune route
// J'affiche le logo, un message sympa et des liens pour revenir sur le site

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/monLogo.png";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
import { Helmet } from "react-helmet-async";

const NotFound = () => {
    return (
        <div className="notfound-page">
            {/* Helmet : titre 404 pour que Google sache que cette page n'existe pas */}
            <Helmet>
                <title>Page introuvable (404) | CafThé</title>
                <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
            </Helmet>
            <div className="notfound-container">
                <img src={logo} alt="CafThé" className="notfound-logo" />
                <h1 className="notfound-code">404</h1>
                <h2 className="notfound-title">Page introuvable</h2>
                <p className="notfound-text">
                    Oups, cette page semble s'être évaporée comme un bon thé...
                </p>
                <div className="notfound-actions">
                    <Link to="/" className="btn-primary">Retour à l'accueil</Link>
                    <Link to="/produits" className="btn-secondary">Voir nos produits</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
