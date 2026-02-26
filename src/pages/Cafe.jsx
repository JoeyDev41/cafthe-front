import React from "react";
import CategoryPage from "./CategoryPage.jsx";

const Cafe = () => {
    return (
        <>
                <title>Nos Cafés | CafThé</title>
                <meta name="description" content="Découvrez notre sélection de cafés premium : grains, moulus et capsules issus des meilleures plantations." />
            <CategoryPage
                title="Cafés"
                subtitle="Cafés de spécialité, torréfiés avec soin pour révéler toute leur richesse aromatique."
                category="cafe"
            />
        </>
    );
};

export default Cafe;
