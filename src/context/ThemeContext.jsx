// ThemeContext : gère le thème clair/sombre de toute l'application
// On utilise le Context API de React pour partager le thème entre tous les composants
// Le choix de l'utilisateur est sauvegardé dans le localStorage du navigateur
// pour qu'il soit conservé même après avoir fermé le navigateur

import React, { createContext, useState, useEffect } from "react";

// On crée le contexte qui sera partagé dans toute l'app
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // On initialise le thème :
    // 1. D'abord on regarde si l'utilisateur a déjà fait un choix (localStorage)
    // 2. Sinon on regarde la préférence système (Windows/Mac mode sombre)
    // 3. Par défaut on met "light"
    const [theme, setTheme] = useState(() => {
        // On vérifie si un thème a été sauvegardé dans le localStorage
        const savedTheme = localStorage.getItem("cafthe-theme");
        if (savedTheme) return savedTheme;

        // Si pas de choix sauvegardé, on regarde la préférence du système
        // window.matchMedia vérifie si l'utilisateur a activé le mode sombre dans ses paramètres
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        // Par défaut : thème clair
        return "light";
    });

    // useEffect se déclenche à chaque changement de thème
    // Il applique le thème au HTML et le sauvegarde dans le localStorage
    useEffect(() => {
        // On ajoute l'attribut data-theme sur la balise <html>
        // Le CSS utilise ce sélecteur [data-theme="dark"] pour appliquer les couleurs sombres
        document.documentElement.setAttribute("data-theme", theme);

        // On sauvegarde le choix dans le localStorage
        // Comme ça, quand l'utilisateur revient sur le site, on se souvient de son choix
        localStorage.setItem("cafthe-theme", theme);
    }, [theme]);

    // Fonction pour basculer entre les thèmes
    // Si on est en light, on passe en dark, et vice versa
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // On fournit le thème actuel et la fonction pour le changer à tous les composants enfants
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
