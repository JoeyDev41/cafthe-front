import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/monLogo.png";

const Contact = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        message: "",
        privacy_consent: false,
    });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nom.trim() || !formData.prenom.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (!formData.privacy_consent) {
            toast.error("Veuillez accepter la politique de confidentialité pour continuer.");
            return;
        }
        setSending(true);
        setTimeout(() => {
            toast.success("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
            setFormData({ nom: "", prenom: "", email: "", message: "", privacy_consent: false });
            setSending(false);
        }, 800);
    };

    return (
        <div className="contact-page">
                <title>Contact | CafThé</title>
                <meta
                    name="description"
                    content="Contactez l'équipe CafThé pour toute question sur nos thés, cafés ou accessoires. Formulaire de contact, email et téléphone."
                />
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">Contactez-nous</h1>
                    <p className="contact-subtitle">
                        Notre équipe est à votre écoute pour toute question ou demande.
                    </p>
                </div>

                <div className="contact-grid">
                    <div className="contact-panel contact-info-panel">
                        <div className="contact-panel-title">Notre boutique</div>
                        <div className="contact-panel-body">
                            <img src={logo} alt="CafThé" className="contact-logo" />
                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <span className="contact-info-label">Adresse</span>
                                    <address className="contact-info-value">
                                        12 Rue du Thé<br />
                                        75001 Paris, France
                                    </address>
                                </div>
                                <div className="contact-info-item">
                                    <span className="contact-info-label">Téléphone</span>
                                    <span className="contact-info-value">
                                        <a href="tel:+33123456789">+33 (0)1 23 45 67 89</a>
                                    </span>
                                </div>
                                <div className="contact-info-item">
                                    <span className="contact-info-label">Email</span>
                                    <span className="contact-info-value">
                                        <a href="mailto:contact@cafthe.fr">contact@cafthe.fr</a>
                                    </span>
                                </div>
                                <div className="contact-info-item">
                                    <span className="contact-info-label">Horaires d'ouverture</span>
                                    <div className="contact-info-value contact-hours">
                                        <div>
                                            <span>Lundi – Vendredi</span>
                                            <span>9h00 – 19h00</span>
                                        </div>
                                        <div>
                                            <span>Samedi</span>
                                            <span>10h00 – 18h00</span>
                                        </div>
                                        <div className="contact-hours-closed">
                                            <span>Dimanche</span>
                                            <span>Fermé</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-retrait-notice">
                                    <strong>Retrait en boutique disponible</strong>
                                    <p>
                                        Passez votre commande en ligne et récupérez-la directement
                                        en magasin, sans frais de livraison.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-panel contact-map-panel">
                        <div className="contact-panel-title">Nous trouver</div>
                        <div className="contact-map-wrapper">
                            <iframe
                                title="Localisation de la boutique CafThé, Paris 1er"
                                src="https://maps.google.com/maps?q=48.8607,2.3480&z=16&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                aria-label="Carte Google Maps indiquant la localisation de la boutique CafThé dans le 1er arrondissement de Paris"
                            />
                        </div>
                    </div>

                    <div className="contact-panel contact-form-panel">
                        <div className="contact-panel-title">Envoyer un message</div>
                        <div className="contact-panel-body">
                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                                noValidate
                                aria-label="Formulaire de contact"
                            >
                                <div className="contact-form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-prenom">Prénom *</label>
                                        <input
                                            type="text"
                                            id="contact-prenom"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            autoComplete="given-name"
                                            required
                                            placeholder="Votre prénom"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-nom">Nom *</label>
                                        <input
                                            type="text"
                                            id="contact-nom"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                            required
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-email">Adresse e-mail *</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                        placeholder="vous@exemple.fr"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-message">Message *</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Décrivez votre demande…"
                                        className="contact-textarea"
                                    />
                                </div>

                                <div className="consent-group">
                                    <input
                                        type="checkbox"
                                        id="contact-privacy"
                                        name="privacy_consent"
                                        checked={formData.privacy_consent}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="contact-privacy">
                                        J'accepte que mes données soient utilisées pour traiter
                                        ma demande, conformément à la{" "}
                                        <Link to="/politique-confidentialite" target="_blank" rel="noopener noreferrer">
                                            Politique de confidentialité
                                            <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
                                        </Link> *
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary contact-submit-btn"
                                    disabled={sending}
                                    aria-busy={sending}
                                >
                                    {sending ? "Envoi en cours…" : "Envoyer le message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
