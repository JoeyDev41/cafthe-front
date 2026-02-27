import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContex.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const redirect = location.state?.redirect || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
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

            if (!response.ok) {
                toast.error(data.message || "Erreur de connexion");
                return;
            }

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
                <title>Connexion | CafThé</title>
                <meta name="description" content="Connectez-vous à votre compte CafThé pour suivre vos commandes et profiter d'offres exclusives." />
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de connexion">
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
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        value={motDePasse}
                        required
                        autoComplete="current-password"
                        placeholder="Votre mot de passe"
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                    <Link to="/mot-de-passe-oublie" className="forgot-password-link">
                        Mot de passe oublié ?
                    </Link>
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                </button>

                <p className="rgpd-notice">
                    Votre adresse e-mail est utilisée uniquement pour identifier votre compte.
                    Consultez notre <Link to="/politique-confidentialite">politique de confidentialité</Link>.
                </p>
            </form>

            <p className="form-link">
                Pas encore de compte ? <Link to="/inscription" state={{ redirect }}>Créer un compte</Link>
            </p>
        </div>
    );
};

export default Login;
