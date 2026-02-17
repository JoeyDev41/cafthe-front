// Page catégorie Accessoires
// Utilise le composant générique CategoryPage avec la catégorie "accessoires"

import React from "react";
import CategoryPage from "./CategoryPage.jsx";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
// On l'utilise pour changer le titre de l'onglet et la meta description sur chaque page
import { Helmet } from "react-helmet-async";

const Accessoires = () => {
    return (
        <>
            {/* Helmet : titre et description spécifiques pour la page Accessoires */}
            <Helmet>
                <title>Nos Accessoires | CafThé</title>
                <meta name="description" content="Retrouvez tous nos accessoires pour une préparation parfaite : théières, moulins à café, filtres et tasses artisanales." />
            </Helmet>
            <CategoryPage
                title="Accessoires"
                subtitle="L'essentiel pour une préparation parfaite : théières, moulins, filtres et tasses."
                category="accessoires"
            />
        </>
    );
};

export default Accessoires;
