// Page "Tous nos produits"
// Affiche la liste complète avec filtres, tri et pagination via le composant ProductList

import React from "react";
import ProductList from "./ProductList.jsx";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
// On l'utilise pour changer le titre de l'onglet et la meta description sur chaque page
import { Helmet } from "react-helmet-async";

const Products = () => {
    return (
        <div className="products-page">
            {/* Helmet : titre et description spécifiques pour la page tous les produits */}
            <Helmet>
                <title>Tous nos produits | CafThé</title>
                <meta name="description" content="Parcourez l'ensemble de notre catalogue : thés, cafés et accessoires premium. Filtrez par catégorie, prix et disponibilité." />
            </Helmet>
            <ProductList />
        </div>
    );
};

export default Products;
