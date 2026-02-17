// Context d'authentification
// Gère l'état de connexion de l'utilisateur dans toute l'app
// Le token JWT est stocké dans un cookie HttpOnly côté serveur (plus sécurisé que localStorage)
// J'utilise credentials: "include" pour que le navigateur envoie le cookie à chaque requête

import React, { createContext, useState, useEffect } from "react";

// Création du contexte — on pourra y accéder avec useContext(AuthContext)
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // user contient les infos du client connecté, ou null si déconnecté
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Au chargement de l'app, on vérifie si le client a déjà une session active
    // en appelant /api/clients/me — le cookie est envoyé automatiquement
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/clients/me`,
                    { credentials: "include" }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client);
                }
            } catch (error) {
                console.error("Erreur vérification session:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    // Appelée après une connexion réussie pour stocker les données du client
    const login = (userData) => {
        setUser(userData);
    };

    // Déconnexion : on appelle l'API pour supprimer le cookie côté serveur
    const logout = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
        setUser(null);
    };

    // Suppression de compte : appelle l'API puis déconnecte
    const deleteAccount = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/clients/account`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Erreur lors de la suppression");
        }

        setUser(null);
    };

    // Valeurs partagées à tous les composants enfants
    const value = {
        user,
        login,
        logout,
        deleteAccount,
        loading,
        // !!user convertit en booléen : null → false, objet → true
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
