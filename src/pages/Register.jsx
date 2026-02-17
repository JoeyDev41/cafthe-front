// Register.jsx — Page d'inscription d'un nouveau client
// Le formulaire demande : prénom, nom, email, mot de passe + confirmation
// Après l'inscription, je connecte automatiquement le client et je le redirige

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContex.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerClient, loginClient } from "../services/api.js";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
import { Helmet } from "react-helmet-async";

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // URL de redirection après inscription (ex: /checkout si le client venait du panier)
    const redirect = location.state?.redirect || "/";

    // Je regroupe tous les champs dans un seul state objet
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        confirm_mdp: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fonction générique pour mettre à jour n'importe quel champ du formulaire
    // J'utilise e.target.name comme clé dynamique pour éviter de faire une fonction par champ
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification côté client : les 2 mots de passe doivent correspondre
        if (formData.mot_de_passe !== formData.confirm_mdp) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        // Vérification de la longueur minimum du mot de passe
        if (formData.mot_de_passe.length < 6) {
            toast.error("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        setIsLoading(true);

        try {
            // Étape 1 : inscription via l'API
            await registerClient({
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
            });

            // Étape 2 : connexion automatique après inscription
            const data = await loginClient(formData.email, formData.mot_de_passe);
            toast.success("Inscription réussie !");
            login(data.token, data.client);
            navigate(redirect);
        } catch (error) {
            toast.error(error.message || "Erreur lors de l'inscription");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            {/* Helmet : titre et description pour la page d'inscription */}
            <Helmet>
                <title>Inscription | CafThé</title>
                <meta name="description" content="Créez votre compte CafThé pour commander en ligne et profiter de nos offres exclusives." />
            </Helmet>
            <h2>Créer un compte</h2>

            <form onSubmit={handleSubmit}>
                {/* Prénom et nom sur la même ligne */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom :</label>
                        <input
                            id="prenom"
                            name="prenom"
                            type="text"
                            value={formData.prenom}
                            required
                            placeholder="Votre prénom"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom">Nom :</label>
                        <input
                            id="nom"
                            name="nom"
                            type="text"
                            value={formData.nom}
                            required
                            placeholder="Votre nom"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        required
                        placeholder="votre@email.fr"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mot_de_passe">Mot de passe :</label>
                    <input
                        id="mot_de_passe"
                        name="mot_de_passe"
                        type="password"
                        value={formData.mot_de_passe}
                        required
                        placeholder="Minimum 6 caractères"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_mdp">Confirmer le mot de passe :</label>
                    <input
                        id="confirm_mdp"
                        name="confirm_mdp"
                        type="password"
                        value={formData.confirm_mdp}
                        required
                        placeholder="Confirmez votre mot de passe"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>

            {/* Lien vers la page de connexion pour ceux qui ont déjà un compte */}
            <p className="form-link">
                Déjà un compte ? <Link to="/login" state={{ redirect }}>Se connecter</Link>
            </p>
        </div>
    );
};

export default Register;
