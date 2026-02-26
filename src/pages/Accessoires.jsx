import React from "react";
import CategoryPage from "./CategoryPage.jsx";

const Accessoires = () => {
    return (
        <>
                <title>Nos Accessoires | CafThé</title>
                <meta name="description" content="Retrouvez tous nos accessoires pour une préparation parfaite : théières, moulins à café, filtres et tasses artisanales." />
            <CategoryPage
                title="Accessoires"
                subtitle="L'essentiel pour une préparation parfaite : théières, moulins, filtres et tasses."
                category="accessoires"
                showTypeVenteFilter={false}
            />
        </>
    );
};

export default Accessoires;
