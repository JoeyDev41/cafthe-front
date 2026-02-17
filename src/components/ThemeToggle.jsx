// ThemeToggle : bouton pour basculer entre le thème clair et le thème sombre
// Il affiche une icône soleil (mode clair) ou lune (mode sombre)
// Le contexte ThemeContext gère la logique, ce composant ne fait qu'afficher le bouton

import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

const ThemeToggle = () => {
    // On récupère le thème actuel et la fonction pour le changer depuis le contexte
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        // Le bouton déclenche toggleTheme au clic
        // aria-label permet aux lecteurs d'écran de comprendre à quoi sert le bouton
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            title={theme === "light" ? "Mode sombre" : "Mode clair"}
        >
            {/* On affiche le soleil si on est en mode clair, la lune si on est en mode sombre */}
            {/* L'icône montre ce qui est ACTIF, pas ce vers quoi on bascule */}
            {theme === "light" ? "☀️" : "🌙"}
        </button>
    );
};

export default ThemeToggle;
