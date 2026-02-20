// OrderConfirmation.jsx — Page de confirmation après une commande réussie
// Elle affiche le numéro de commande, le récapitulatif des articles et le total
// Les données arrivent via location.state (passées par navigate depuis le checkout)
// Si on arrive sur cette page sans données, j'affiche un message par défaut

import React from "react";
import { useLocation, Link } from "react-router-dom";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
import { Helmet } from "react-helmet-async";

const OrderConfirmation = () => {
    const location = useLocation();

    // Je récupère les données de la commande passées par le checkout via navigate()
    const { commande, items } = location.state || {};

    // Si pas de données de commande (accès direct à l'URL par exemple)
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
            {/* Helmet : titre pour la page de confirmation */}
            <Helmet>
                <title>Commande confirmée | CafThé</title>
                <meta name="description" content="Votre commande CafThé a été confirmée avec succès." />
            </Helmet>
            {/* Message de succès avec le numéro de commande */}
            <div className="confirmation-success">
                <div className="confirmation-icon" aria-hidden="true">&#10003;</div>
                <h1>Commande confirmée !</h1>
                <p className="order-number">N° {commande.numero_commande}</p>
                <p>Merci pour votre commande.</p>
                <p className="confirmation-email-notice">
                    &#9993; Un email de confirmation a été envoyé à votre adresse.
                </p>
            </div>

            {/* Récapitulatif des articles commandés */}
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

            {/* Liens pour voir ses commandes ou continuer les achats */}
            <div className="confirmation-actions">
                <Link to="/compte" className="btn-secondary">Voir mes commandes</Link>
                <Link to="/" className="btn-primary">Continuer mes achats</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
