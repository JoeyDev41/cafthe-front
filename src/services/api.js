// Service API centralisé
// Toutes les requêtes vers le backend passent par ici
// Ça évite de dupliquer le code fetch() dans chaque composant
// et ça centralise la gestion des erreurs

const API_URL = import.meta.env.VITE_API_URL;

// Fonction utilitaire : ajoute les headers JSON et le cookie d'auth à chaque requête
// credentials: "include" = le navigateur envoie automatiquement le cookie HttpOnly
const fetchWithAuth = async (endpoint, options = {}) => {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Erreur HTTP ${response.status}`);
    }

    return data;
};

// === Articles ===

export const getArticles = () => fetchWithAuth("/api/articles");

export const getArticleById = (id) => fetchWithAuth(`/api/articles/${id}`);

export const getArticlesByCategory = (categorie) =>
    fetchWithAuth(`/api/articles/categorie/${categorie}`);

// Recherche avec filtres, tri et pagination
export const searchArticles = (params) => {
    const query = new URLSearchParams(params).toString();
    return fetchWithAuth(`/api/articles/search?${query}`);
};

// === Authentification Client ===

export const loginClient = (email, mot_de_passe) =>
    fetchWithAuth("/api/clients/login", {
        method: "POST",
        body: JSON.stringify({ email, mot_de_passe }),
    });

export const registerClient = (data) =>
    fetchWithAuth("/api/clients/register", {
        method: "POST",
        body: JSON.stringify(data),
    });

// === Profil Client ===

export const getProfile = () => fetchWithAuth("/api/clients/profile");

export const updateProfile = (data) =>
    fetchWithAuth("/api/clients/profile", {
        method: "PUT",
        body: JSON.stringify(data),
    });

export const changePassword = (ancien_mdp, nouveau_mdp) =>
    fetchWithAuth("/api/clients/password", {
        method: "PUT",
        body: JSON.stringify({ ancien_mdp, nouveau_mdp }),
    });

// Suppression de compte (anonymisation RGPD)
export const deleteAccount = () =>
    fetchWithAuth("/api/clients/account", {
        method: "DELETE",
    });

// === Commandes ===

export const createOrder = (items, mode_paiement) =>
    fetchWithAuth("/api/orders", {
        method: "POST",
        body: JSON.stringify({ items, mode_paiement }),
    });

export const getMyOrders = () => fetchWithAuth("/api/orders/my");

// === Promotions ===

export const getActivePromotions = () => fetchWithAuth("/api/promotions/active");

export const getPromotionArticles = () => fetchWithAuth("/api/promotions/articles");
