import React from "react";
import ProductList from "./ProductList.jsx";

const Products = () => {
    return (
        <>
            <title>Tous nos produits | CafThé</title>
            <meta name="description" content="Parcourez l'ensemble de notre catalogue : thés, cafés et accessoires premium. Filtrez par catégorie, prix et disponibilité." />
            <div className="products-page">
                <ProductList />
            </div>
        </>
    );
};

export default Products;
