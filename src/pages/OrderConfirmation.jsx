import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();

    const { commande, items } = location.state || {};

    if (!commande) {
        return (
            <div className="confirmation-container">
                <h1>Aucune commande</h1>
                <p>Aucune information de commande disponible.</p>
                <Link to="/" className="btn-primary">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="confirmation-container">
                <title>Commande confirmée | CafThé</title>
                <meta name="description" content="Votre commande CafThé a bien été confirmée. Merci pour votre achat !" />
            <div className="confirmation-success">
                <div className="confirmation-icon" aria-hidden="true">&#10003;</div>
                <h1>Commande confirmée !</h1>
                <p className="order-number">N° {commande.numero_commande}</p>
                <p>Merci pour votre commande.</p>
                <p className="confirmation-email-notice">
                    &#9993; Un email de confirmation a été envoyé à votre adresse.
                </p>
            </div>

            <div className="confirmation-details">
                <h3>Détails de votre commande</h3>
                {items && items.map((item) => (
                    <div key={item.ID_Article} className="recap-item">
                        <span>{item.nom_produit} x{item.quantite}</span>
                        <span>{(item.prix_ttc * item.quantite).toFixed(2)} €</span>
                    </div>
                ))}
                <div className="summary-total">
                    <span>Total</span>
                    <span>{parseFloat(commande.montant_total).toFixed(2)} €</span>
                </div>
            </div>

            <div className="confirmation-actions">
                <Link to="/compte" className="btn-secondary">Voir mes commandes</Link>
                <Link to="/" className="btn-primary">Continuer mes achats</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
