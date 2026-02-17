// About.jsx — Page "À propos" de CafThé
// Page statique qui présente l'histoire de la boutique, ses valeurs et son équipe
// Pas d'appel API ici, c'est du contenu en dur

import React from "react";
import { Link } from "react-router-dom";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
// On l'utilise pour changer le titre de l'onglet et la meta description sur chaque page
import { Helmet } from "react-helmet-async";

const About = () => {
    return (
        <div className="about-page">
            {/* Helmet : titre et description pour la page À propos */}
            <Helmet>
                <title>À propos | CafThé</title>
                <meta name="description" content="Découvrez l'histoire de CafThé, nos valeurs et notre équipe passionnée. Depuis 1892, nous sélectionnons les meilleurs thés et cafés." />
            </Helmet>
            <div className="about-container">
                <header className="about-header">
                    <h1 className="about-title">À Propos de CAFTHÉ</h1>
                </header>

                {/* Section d'accroche avec icônes thé et café */}
                <section className="about-hero-card">
                    <div className="about-hero-icons" aria-hidden="true">
                        <span className="about-hero-icon">&#9749;</span>
                        <span className="about-hero-icon">&#127861;</span>
                    </div>
                    <p className="about-quote">"Depuis 1892, nous cultivons la passion du thé et du café d'exception"</p>
                </section>

                {/* Section Histoire */}
                <section className="about-panel">
                    <div className="about-panel-title">Notre Histoire</div>
                    <div className="about-panel-body about-history">
                        <div className="about-history-text">
                            <p>
                                Fondée en 1892 par un ancêtre de Joey Ferreira, passionné de botanique et d'arômes,
                                CAFTHÉ est née d'une quête simple : offrir des thés et cafés d'une qualité rare.
                            </p>
                            <p>
                                Dans notre atelier parisien, niché au cœur du Marais, la famille Ferreira perpétue depuis plus
                                d'un siècle l'art de la torréfaction et du mélange. Chaque grain, chaque feuille est sélectionné
                                avec exigence auprès de plantations partenaires à travers le monde.
                            </p>
                            <p>
                                Aujourd'hui, Joey Ferreira fait vivre cet héritage en gardant la même exigence artisanale,
                                tout en embrassant les valeurs contemporaines du commerce équitable et de la durabilité.
                            </p>
                        </div>
                        <div className="about-history-media">
                            <img src="/images/cafe.webp" alt="Torréfaction artisanale" />
                        </div>
                    </div>
                </section>

                {/* Section Valeurs : 4 cartes avec icônes */}
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

                {/* Section Équipe */}
                <section className="about-panel">
                    <div className="about-panel-title">Notre Équipe</div>
                    <div className="about-panel-body">
                        <div className="about-team-grid">
                            <div className="about-team-card">
                                <div className="about-avatar" aria-hidden="true">&#128100;</div>
                                <h3>Marie Delacroix</h3>
                                <p>Maître Torréfacteur</p>
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
                        </div>
                    </div>
                </section>

                {/* Call to action vers la boutique */}
                <section className="about-cta">
                    <h2>Envie de découvrir nos produits ?</h2>
                    <Link to="/produits" className="about-cta-btn">Découvrir la boutique</Link>
                </section>
            </div>
        </div>
    );
};

export default About;
