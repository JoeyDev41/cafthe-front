import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/monLogo.png";

const NotFound = () => {
    return (
        <div className="notfound-page">
                <title>Page introuvable (404) | CafThé</title>
                <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
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
