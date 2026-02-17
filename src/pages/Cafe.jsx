// Page catégorie Cafés
// Utilise le composant générique CategoryPage avec la catégorie "cafe"

import React from "react";
import CategoryPage from "./CategoryPage.jsx";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
// On l'utilise pour changer le titre de l'onglet et la meta description sur chaque page
import { Helmet } from "react-helmet-async";

const Cafe = () => {
    return (
        <>
            {/* Helmet : titre et description spécifiques pour la page Cafés */}
            <Helmet>
                <title>Nos Cafés | CafThé</title>
                <meta name="description" content="Découvrez notre sélection de cafés de spécialité, torréfiés avec soin pour révéler toute leur richesse aromatique." />
            </Helmet>
            <CategoryPage
                title="Cafés"
                subtitle="Cafés de spécialité, torréfiés avec soin pour révéler toute leur richesse aromatique."
                category="cafe"
            />
        </>
    );
};

export default Cafe;
