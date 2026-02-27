import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [nouveauMdp, setNouveauMdp] = useState("");
    const [confirmMdp, setConfirmMdp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nouveauMdp !== confirmMdp) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        if (nouveauMdp.length < 8) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, nouveau_mdp: nouveauMdp }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Lien invalide ou expiré");
                return;
            }

            toast.success("Mot de passe modifié avec succès");
            navigate("/login");
        } catch (error) {
            console.error("Erreur réinitialisation:", error);
            toast.error("Une erreur s'est produite");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <>
                <title>Lien invalide | CafThé</title>
            <div className="login-container">
                <h1>Lien invalide</h1>
                <div className="error-message">
                    Ce lien de réinitialisation est invalide ou a expiré.
                </div>
                <p className="form-link">
                    <Link to="/mot-de-passe-oublie">Demander un nouveau lien</Link>
                </p>
            </div>
            </>
        );
    }

    return (
        <>
                <title>Nouveau mot de passe | CafThé</title>
                <meta name="description" content="Définissez votre nouveau mot de passe pour votre compte CafThé." />
        <div className="login-container">
            <h1>Nouveau mot de passe</h1>

            <form onSubmit={handleSubmit} noValidate aria-label="Définir un nouveau mot de passe">
                <div className="form-group">
                    <label htmlFor="nouveau-mdp">Nouveau mot de passe</label>
                    <input
                        id="nouveau-mdp"
                        type="password"
                        value={nouveauMdp}
                        required
                        autoComplete="new-password"
                        placeholder="8 caractères minimum"
                        onChange={(e) => setNouveauMdp(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-mdp">Confirmer le mot de passe</label>
                    <input
                        id="confirm-mdp"
                        type="password"
                        value={confirmMdp}
                        required
                        autoComplete="new-password"
                        placeholder="Répétez votre mot de passe"
                        onChange={(e) => setConfirmMdp(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Enregistrement..." : "Enregistrer le mot de passe"}
                </button>
            </form>

            <p className="form-link">
                <Link to="/login">Retour à la connexion</Link>
            </p>
        </div>
        </>
    );
};

export default ResetPassword;
