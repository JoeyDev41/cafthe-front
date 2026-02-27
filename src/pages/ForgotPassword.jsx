import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Une erreur s'est produite");
                return;
            }

            setSent(true);
        } catch (error) {
            console.error("Erreur mot de passe oublié:", error);
            toast.error("Une erreur s'est produite");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
                <title>Mot de passe oublié | CafThé</title>
                <meta name="description" content="Réinitialisez votre mot de passe CafThé." />
            <h1>Mot de passe oublié</h1>

            {sent ? (
                <div className="success-message">
                    Si cet email est associé à un compte CafThé, vous recevrez un lien de réinitialisation sous peu.
                    Pensez à vérifier vos spams.
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Réinitialisation du mot de passe">
                    <p className="forgot-intro">
                        Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                    </p>

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

                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? "Envoi..." : "Envoyer le lien"}
                    </button>
                </form>
            )}

            <p className="form-link">
                <Link to="/login">Retour à la connexion</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
