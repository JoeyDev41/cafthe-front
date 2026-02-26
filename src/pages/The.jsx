import React from "react";
import CategoryPage from "./CategoryPage.jsx";

const The = () => {
    return (
        <>
            <title>Nos Thés | CafThé</title>
            <meta name="description" content="Découvrez notre sélection de thés premium : thés verts, noirs, blancs et oolong issus des meilleurs terroirs du monde." />
            <CategoryPage
                title="Thés"
                subtitle="Sélection de thés d'exception, noirs, verts et blancs, issus des meilleurs terroirs."
                category="the"
            />
        </>
    );
};

export default The;
