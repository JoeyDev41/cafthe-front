// Page catégorie Thés
// Utilise le composant générique CategoryPage avec la catégorie "the"

import React from "react";
import CategoryPage from "./CategoryPage.jsx";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
// On l'utilise pour changer le titre de l'onglet et la meta description sur chaque page
import { Helmet } from "react-helmet-async";

const The = () => {
    return (
        <>
            {/* Helmet : titre et description spécifiques pour la page Thés */}
            {/* Google affichera ce titre et cette description dans les résultats de recherche */}
            <Helmet>
                <title>Nos Thés | CafThé</title>
                <meta name="description" content="Découvrez notre sélection de thés premium : thés verts, noirs, blancs et oolong issus des meilleurs terroirs du monde." />
            </Helmet>
            <CategoryPage
                title="Thés"
                subtitle="Sélection de thés d'exception, noirs, verts et blancs, issus des meilleurs terroirs."
                category="the"
            />
        </>
    );
};

export default The;
