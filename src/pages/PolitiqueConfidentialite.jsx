import React from "react";

const PolitiqueConfidentialite = () => {
    return (
        <>
            <title>Politique de confidentialité | CafThé</title>
            <meta name="description" content="Politique de confidentialité de CafThé : traitement des données personnelles, cookies et droits RGPD." />
            <div className="legal-page">
            <div className="legal-container">
                <h1>Politique de Confidentialité</h1>
                <p className="legal-updated">Dernière mise à jour : février 2026</p>

                <section className="legal-section">
                    <h2>1. Responsable du traitement</h2>
                    <p>
                        Le responsable du traitement des données personnelles est la société CafThé,
                        dont le siège social est situé à Paris, France.
                    </p>
                    <p>Contact : contact@cafthe.fr</p>
                </section>

                <section className="legal-section">
                    <h2>2. Données collectées</h2>
                    <p>Dans le cadre de notre activité, nous collectons les données suivantes :</p>

                    <h3>Lors de la création de compte</h3>
                    <ul>
                        <li>Nom et prénom</li>
                        <li>Adresse e-mail</li>
                        <li>Mot de passe (stocké sous forme chiffrée avec bcrypt)</li>
                        <li>Numéro de téléphone (facultatif)</li>
                    </ul>

                    <h3>Lors d'une commande</h3>
                    <ul>
                        <li>Adresse de livraison et/ou de facturation</li>
                        <li>Historique des commandes</li>
                        <li>Informations de paiement (traitées par notre prestataire de paiement sécurisé, non stockées sur nos serveurs)</li>
                    </ul>

                    <h3>Lors de la navigation</h3>
                    <ul>
                        <li>Adresse IP</li>
                        <li>Données de navigation (pages visitées, durée)</li>
                        <li>Données du panier (stockées localement dans votre navigateur)</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>3. Finalités et bases légales</h2>
                    <table className="legal-table">
                        <thead>
                            <tr>
                                <th scope="col">Finalité</th>
                                <th scope="col">Base légale</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Gestion des commandes et livraisons</td>
                                <td>Exécution du contrat</td>
                            </tr>
                            <tr>
                                <td>Gestion du compte client</td>
                                <td>Exécution du contrat</td>
                            </tr>
                            <tr>
                                <td>Service après-vente</td>
                                <td>Exécution du contrat</td>
                            </tr>
                            <tr>
                                <td>Envoi de newsletters commerciales</td>
                                <td>Consentement</td>
                            </tr>
                            <tr>
                                <td>Amélioration du site et statistiques</td>
                                <td>Intérêt légitime</td>
                            </tr>
                            <tr>
                                <td>Obligations comptables et fiscales</td>
                                <td>Obligation légale</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="legal-section">
                    <h2>4. Durée de conservation</h2>
                    <ul>
                        <li>Données de compte : conservées pendant toute la durée de la relation commerciale, puis 3 ans après le dernier contact</li>
                        <li>Données de commande : 10 ans (obligations comptables)</li>
                        <li>Données de navigation : 13 mois maximum</li>
                        <li>Consentement aux cookies : 13 mois</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>5. Vos droits</h2>
                    <p>
                        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
                        loi Informatique et Libertés, vous disposez des droits suivants :
                    </p>
                    <ul>
                        <li><strong>Droit d'accès</strong> — obtenir une copie de vos données personnelles</li>
                        <li><strong>Droit de rectification</strong> — corriger des données inexactes ou incomplètes</li>
                        <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
                        <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible</li>
                        <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données pour des motifs légitimes</li>
                        <li><strong>Droit à la limitation</strong> — demander la suspension du traitement de vos données</li>
                        <li><strong>Retrait du consentement</strong> — retirer votre consentement à tout moment pour les traitements basés sur celui-ci</li>
                    </ul>
                    <p>
                        Pour exercer vos droits, contactez-nous à l'adresse : contact@cafthe.fr.
                        Nous répondrons dans un délai de 30 jours.
                    </p>
                    <p>
                        Vous disposez également du droit d'introduire une réclamation auprès de la CNIL
                        (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>6. Cookies</h2>
                    <p>Notre site utilise des cookies pour :</p>
                    <ul>
                        <li><strong>Cookies essentiels</strong> — fonctionnement du site, authentification sécurisée (JWT en cookie HttpOnly)</li>
                        <li><strong>Stockage local (localStorage)</strong> — votre panier d'achat est conservé dans le stockage local de votre navigateur. Ces données restent sur votre appareil, ne sont pas transmises à nos serveurs et peuvent être supprimées à tout moment via les paramètres de votre navigateur. Elles sont automatiquement effacées à la suppression de votre compte.</li>
                        <li><strong>Cookies analytiques</strong> — mesure d'audience et amélioration du service (soumis à consentement)</li>
                    </ul>
                    <p>
                        Vous pouvez gérer vos préférences de cookies et supprimer le stockage local à tout moment via les paramètres
                        de votre navigateur.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>7. Sécurité des données</h2>
                    <p>
                        Nous mettons en place des mesures techniques et organisationnelles pour protéger
                        vos données personnelles : chiffrement des mots de passe (bcrypt), authentification
                        par jeton sécurisé (JWT), requêtes paramétrées pour prévenir les injections SQL,
                        protocole HTTPS.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>8. Modifications</h2>
                    <p>
                        CafThé se réserve le droit de modifier la présente politique de confidentialité
                        à tout moment. Toute modification sera publiée sur cette page avec la date de
                        mise à jour.
                    </p>
                </section>
            </div>
        </div>
        </>
    );
};

export default PolitiqueConfidentialite;
