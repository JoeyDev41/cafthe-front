// Layout : structure commune à toutes les pages
// Contient la Navbar en haut, le contenu de la page au milieu (Outlet), et le Footer en bas
// Outlet est un composant de React Router qui affiche la page correspondant à l'URL

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
    return (
        <>
            {/* Lien d'accessibilité : permet aux utilisateurs clavier/lecteur d'écran
                de sauter directement au contenu sans passer par toute la navigation */}
            <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
            <Navbar />
            {/* Balise <main> = balise sémantique HTML5 pour le contenu principal */}
            <main id="main-content">
                {/* Outlet affiche le composant de la route active
                    ex: si URL = /produits, il affiche <Products /> */}
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
