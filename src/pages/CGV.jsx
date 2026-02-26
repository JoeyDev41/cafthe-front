import React from "react";
import { Link } from "react-router-dom";

const CGV = () => {
    return (
        <div className="legal-page">
                <title>Conditions Générales de Vente | CafThé</title>
                <meta name="description" content="Consultez les conditions générales de vente de la boutique CafThé." />
            <div className="legal-container">
                <h1>Conditions Générales de Vente</h1>
                <p className="legal-updated">Dernière mise à jour : février 2025</p>

                <section className="legal-section">
                    <h2>Article 1 — Objet et champ d'application</h2>
                    <p>
                        Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes
                        réalisées par la société CafThé, via son site internet accessible à l'adresse
                        cafthe.fr, ainsi qu'en boutique physique.
                    </p>
                    <p>
                        Toute commande implique l'acceptation sans réserve des présentes CGV par le client.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 2 — Produits et prix</h2>
                    <p>
                        Les produits proposés à la vente sont les thés, cafés et accessoires présentés
                        sur le site au jour de la consultation. Les photographies illustrant les produits
                        n'entrent pas dans le champ contractuel.
                    </p>
                    <p>Les prix sont indiqués en euros toutes taxes comprises (TTC) :</p>
                    <ul>
                        <li>TVA à 5,5 % pour les thés et cafés (produits alimentaires)</li>
                        <li>TVA à 20 % pour les accessoires</li>
                    </ul>
                    <p>
                        CafThé se réserve le droit de modifier ses prix à tout moment. Les produits sont
                        facturés au tarif en vigueur au moment de la validation de la commande.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 3 — Commandes</h2>
                    <p>
                        Toute commande validée constitue un contrat de vente entre le client et CafThé.
                        Un numéro de commande unique au format CMD-AAAAMMJJ-XXXX est attribué à chaque
                        commande et communiqué par e-mail.
                    </p>
                    <p>Les statuts de commande sont les suivants :</p>
                    <ul>
                        <li><strong>En attente</strong> — commande enregistrée, en cours de validation</li>
                        <li><strong>En préparation</strong> — commande validée, en cours de préparation</li>
                        <li><strong>Expédiée</strong> — commande remise au transporteur</li>
                        <li><strong>Livrée</strong> — commande réceptionnée par le client</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>Article 4 — Livraison</h2>
                    <p>Les livraisons sont effectuées en France métropolitaine.</p>
                    <ul>
                        <li>Frais de livraison : 5,90 EUR pour toute commande inférieure à 49 EUR TTC</li>
                        <li>Livraison gratuite dès 49 EUR d'achat</li>
                        <li>Retrait gratuit en boutique disponible</li>
                    </ul>
                    <p>
                        Les délais de livraison sont donnés à titre indicatif. Un retard de livraison
                        ne peut donner lieu à aucune pénalité ni annulation de commande.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 5 — Droit de rétractation</h2>
                    <p>
                        Conformément à l'article L221-18 du Code de la consommation, le client dispose
                        d'un délai de 14 jours à compter de la réception de sa commande pour exercer
                        son droit de rétractation, sans avoir à justifier de motif.
                    </p>
                    <p>
                        Les produits alimentaires ouverts (thés, cafés descellés) ne peuvent faire l'objet
                        d'un retour pour des raisons d'hygiène et de sécurité alimentaire.
                    </p>
                    <p>
                        Les produits retournés doivent être dans leur état d'origine, complets et dans
                        leur emballage d'origine. Le remboursement sera effectué dans un délai de 14 jours
                        suivant la réception du retour.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 6 — Garanties</h2>
                    <p>
                        Les produits bénéficient de la garantie légale de conformité (articles L217-4 et
                        suivants du Code de la consommation) et de la garantie des vices cachés (articles
                        1641 et suivants du Code civil).
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 7 — Responsabilité</h2>
                    <p>
                        CafThé ne saurait être tenue responsable de l'inexécution du contrat en cas de
                        force majeure, de rupture de stock, de perturbation ou grève des services postaux
                        ou transporteurs.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 8 — Données personnelles</h2>
                    <p>
                        Les données personnelles collectées lors de la commande sont traitées conformément
                        au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations,
                        consultez notre <Link to="/politique-confidentialite">Politique de confidentialité</Link>.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>Article 9 — Droit applicable</h2>
                    <p>
                        Les présentes CGV sont soumises au droit français. En cas de litige, une solution
                        amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux
                        français seront seuls compétents.
                    </p>
                    <p>
                        Conformément à l'article L612-1 du Code de la consommation, le client peut
                        recourir gratuitement au service de médiation de la consommation.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CGV;
