// Spinner affiché par <Suspense> dans App.jsx pendant le chargement lazy d'une page.

import React from "react";

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
        </div>
    );
};

export default Loader;
