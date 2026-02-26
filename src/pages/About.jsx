import React from "react";
import { Link } from "react-router-dom";
import boutique from "../assets/boutique.webp";
import logo from "../assets/monLogo.png";

const About = () => {
    return (
        <div className="about-page">
                <title>À propos | CafThé</title>
                <meta name="description" content="Découvrez CafThé, votre boutique parisienne de thés et cafés d'exception depuis 2020." />
            <div className="about-container">
                <header className="about-header">
                    <h1 className="about-title">À Propos de CAFTHÉ</h1>
                </header>

                <section className="about-hero-card">
                    <img src={logo} alt="" aria-hidden="true" className="about-hero-logo" />
                    <p className="about-quote">"Sélectionnés avec soin, dégustés avec plaisir — bienvenue chez CafThé."</p>
                </section>

                <section className="about-panel">
                    <div className="about-panel-title">Notre Histoire</div>
                    <div className="about-panel-body about-history">
                        <div className="about-history-text">
                            <p>
                                CafThé est née d'une passion simple : réunir sous un même toit les meilleurs thés
                                et cafés du monde. Notre boutique parisienne, au cœur du 1er arrondissement,
                                est un espace pensé pour les amateurs d'arômes authentiques.
                            </p>
                            <p>
                                Chaque référence est sélectionnée avec soin auprès de producteurs engagés,
                                privilégiant le commerce équitable et l'agriculture durable. Thés d'origine,
                                cafés de spécialité, accessoires de dégustation : tout est réuni pour sublimer
                                votre tasse quotidienne.
                            </p>
                            <p>
                                Commandez en ligne ou venez nous rendre visite en boutique — nos conseils
                                sont toujours gratuits, et le retrait de vos commandes se fait sans frais.
                            </p>
                        </div>
                        <div className="about-history-media">
                            <img src={boutique} alt="Intérieur de la boutique CafThé" />
                        </div>
                    </div>
                </section>

                <section className="about-panel">
                    <div className="about-panel-title">Nos Valeurs</div>
                    <div className="about-panel-body">
                        <div className="about-values-grid">
                            <div className="about-value-card">
                                <span className="about-value-icon" aria-hidden="true">&#127793;</span>
                                <div>
                                    <h3>Agriculture Durable</h3>
                                    <p>Partenariats avec des fermes bio certifiées</p>
                                </div>
                            </div>
                            <div className="about-value-card">
                                <span className="about-value-icon" aria-hidden="true">&#129309;</span>
                                <div>
                                    <h3>Commerce Équitable</h3>
                                    <p>Rémunération juste des producteurs</p>
                                </div>
                            </div>
                            <div className="about-value-card">
                                <span className="about-value-icon" aria-hidden="true">&#10024;</span>
                                <div>
                                    <h3>Qualité Premium</h3>
                                    <p>Sélection rigoureuse grain par grain</p>
                                </div>
                            </div>
                            <div className="about-value-card">
                                <span className="about-value-icon" aria-hidden="true">&#128293;</span>
                                <div>
                                    <h3>Torréfaction Artisanale</h3>
                                    <p>Méthodes traditionnelles à petit lot</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-panel">
                    <div className="about-panel-title">Notre Équipe</div>
                    <div className="about-panel-body">
                        <div className="about-team-grid">
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Joey Ferreira</h3>
                                <p>Directeur & PDG</p>
                            </div>
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Marie Delacroix</h3>
                                <p>Responsable Boutique</p>
                            </div>
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Pierre Rousseau</h3>
                                <p>Expert en Thé</p>
                            </div>
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Sophie Laurent</h3>
                                <p>Responsable Achats</p>
                            </div>
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Lucas Martin</h3>
                                <p>Vendeur</p>
                            </div>
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Camille Durand</h3>
                                <p>Vendeur</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-cta">
                    <h2>Envie de découvrir nos produits ?</h2>
                    <Link to="/produits" className="about-cta-btn">Découvrir la boutique</Link>
                </section>
            </div>
        </div>
    );
};

export default About;
