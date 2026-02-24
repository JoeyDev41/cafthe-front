// Login.jsx — Page de connexion client
// J'utilise un formulaire classique avec email + mot de passe
// Si la connexion réussit, je redirige le client vers la page d'où il venait
// (par exemple le checkout s'il voulait passer commande)

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContex.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
import { Helmet } from "react-helmet-async";

const Login = () => {
    // Je récupère la fonction login depuis mon contexte d'authentification
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // States pour les champs du formulaire et le chargement
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Si l'utilisateur a été redirigé ici (ex: depuis le checkout), je récupère l'URL de retour
    const redirect = location.state?.redirect || "/";

    // Soumission du formulaire de connexion
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Appel à l'API de connexion avec credentials: "include" pour les cookies JWT
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        mot_de_passe: motDePasse,
                    }),
                },
            );

            const data = await response.json();

            // Si la réponse n'est pas OK, j'affiche l'erreur dans un toast
            if (!response.ok) {
                toast.error(data.message || "Erreur de connexion");
                return;
            }

            // Connexion réussie : je mets à jour le contexte et je redirige
            toast.success("Connexion réussie");
            login(data.client);
            navigate(redirect);
        } catch (error) {
            console.error("Erreur lors de la connexion: ", error);
            toast.error("Une erreur s'est produite lors de la connexion");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Helmet : titre et description pour la page de connexion */}
            <Helmet>
                <title>Connexion | CafThé</title>
                <meta name="description" content="Connectez-vous à votre compte CafThé pour accéder à vos commandes et votre espace personnel." />
            </Helmet>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        required
                        autoComplete="email"
                        placeholder="votre@email.fr"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <div className="form-group-header">
                        <label htmlFor="password">Mot de passe</label>
                        <Link to="/mot-de-passe-oublie" className="forgot-password-link">
                            Mot de passe oublié ?
                        </Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={motDePasse}
                        required
                        autoComplete="current-password"
                        placeholder="Votre mot de passe"
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                </div>

                {/* Le bouton est désactivé pendant le chargement pour éviter les double-clics */}
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                </button>

                {/* Notice RGPD art. 13 : informer du traitement des données */}
                <p className="rgpd-notice">
                    Votre adresse e-mail est utilisée uniquement pour identifier votre compte.
                    Consultez notre <Link to="/politique-confidentialite">politique de confidentialité</Link>.
                </p>
            </form>

            {/* Lien vers la page d'inscription, je passe aussi l'URL de redirection */}
            <p className="form-link">
                Pas encore de compte ? <Link to="/inscription" state={{ redirect }}>Créer un compte</Link>
            </p>
        </div>
    );
};

export default Login;
