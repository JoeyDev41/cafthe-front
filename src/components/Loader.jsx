// Loader : spinner affiché pendant le chargement des pages (Suspense / lazy loading)

import React from "react";

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
        </div>
    );
};

export default Loader;
