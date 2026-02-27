import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContex.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerClient, loginClient } from "../services/api.js";

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.state?.redirect || "/";

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        confirm_mdp: "",
        cgv_consent: false,
        privacy_acknowledged: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.mot_de_passe !== formData.confirm_mdp) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.mot_de_passe.length < 6) {
            toast.error("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        if (!formData.cgv_consent) {
            toast.error("Vous devez accepter les Conditions Générales de Vente");
            return;
        }
        if (!formData.privacy_acknowledged) {
            toast.error("Vous devez confirmer avoir pris connaissance de la politique de confidentialité");
            return;
        }

        setIsLoading(true);

        try {
            await registerClient({
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
            });

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
        <>
                <title>Inscription | CafThé</title>
                <meta name="description" content="Créez votre compte CafThé pour commander vos thés et cafés préférés." />
        <div className="register-container">
            <h1>Créer un compte</h1>

            <p className="required-legend"><span className="required-star" aria-hidden="true">*</span> Champs obligatoires</p>

            <form onSubmit={handleSubmit} noValidate aria-label="Formulaire d'inscription">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom <span className="required-star" aria-hidden="true">*</span></label>
                        <input
                            id="prenom"
                            name="prenom"
                            type="text"
                            value={formData.prenom}
                            required
                            autoComplete="given-name"
                            placeholder="Votre prénom"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom">Nom <span className="required-star" aria-hidden="true">*</span></label>
                        <input
                            id="nom"
                            name="nom"
                            type="text"
                            value={formData.nom}
                            required
                            autoComplete="family-name"
                            placeholder="Votre nom"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Adresse e-mail <span className="required-star" aria-hidden="true">*</span></label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        required
                        autoComplete="email"
                        placeholder="votre@email.fr"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mot_de_passe">Mot de passe <span className="required-star" aria-hidden="true">*</span></label>
                    <input
                        id="mot_de_passe"
                        name="mot_de_passe"
                        type="password"
                        value={formData.mot_de_passe}
                        required
                        autoComplete="new-password"
                        placeholder="Minimum 6 caractères"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_mdp">Confirmer le mot de passe <span className="required-star" aria-hidden="true">*</span></label>
                    <input
                        id="confirm_mdp"
                        name="confirm_mdp"
                        type="password"
                        value={formData.confirm_mdp}
                        required
                        autoComplete="new-password"
                        placeholder="Confirmez votre mot de passe"
                        onChange={handleChange}
                    />
                </div>

                <div className="consent-group">
                    <input
                        id="cgv_consent"
                        name="cgv_consent"
                        type="checkbox"
                        checked={formData.cgv_consent}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="cgv_consent">
                        J'accepte les{" "}
                        <Link to="/cgv" target="_blank" rel="noopener noreferrer">
                            Conditions Générales de Vente
                            <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
                        </Link>
                        {" "}<span className="required-star" aria-hidden="true">*</span>
                    </label>
                </div>

                <div className="consent-group">
                    <input
                        id="privacy_acknowledged"
                        name="privacy_acknowledged"
                        type="checkbox"
                        checked={formData.privacy_acknowledged}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="privacy_acknowledged">
                        J'ai pris connaissance de la{" "}
                        <Link to="/politique-confidentialite" target="_blank" rel="noopener noreferrer">
                            Politique de confidentialité
                            <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
                        </Link>
                        {" "}<span className="required-star" aria-hidden="true">*</span>
                    </label>
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </button>

                <p className="rgpd-notice">
                    Vos données personnelles (nom, prénom, e-mail) sont utilisées uniquement pour la gestion de votre compte et de vos commandes, conformément à notre{" "}
                    <Link to="/politique-confidentialite">politique de confidentialité</Link>.
                    Vous pouvez les modifier ou les supprimer à tout moment depuis votre espace client.
                </p>
            </form>

            <p className="form-link">
                Déjà un compte ? <Link to="/login" state={{ redirect }}>Se connecter</Link>
            </p>
        </div>
        </>
    );
};

export default Register;
