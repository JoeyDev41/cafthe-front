import React from "react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
    return (
        <>
                <title>Mentions légales | CafThé</title>
                <meta name="description" content="Mentions légales de CafThé : informations sur l'éditeur, l'hébergeur et les droits de propriété intellectuelle." />
        <div className="legal-page">
            <div className="legal-container">
                <h1>Mentions Légales</h1>
                <p className="legal-updated">Dernière mise à jour : février 2026</p>

                <section className="legal-section">
                    <h2>1. Éditeur du site</h2>
                    <p>Le site <strong>cafthe.fr</strong> est édité par la société CafThé.</p>
                    <ul>
                        <li><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</li>
                        <li><strong>Capital social :</strong> 10 000 €</li>
                        <li><strong>Siège social :</strong> 12 Rue du Thé, 75001 Paris, France</li>
                        <li><strong>Numéro SIRET :</strong> 000 000 000 00000</li>
                        <li><strong>Numéro RCS :</strong> Paris B 000 000 000</li>
                        <li><strong>TVA intracommunautaire :</strong> FR00 000000000</li>
                        <li><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</li>
                        <li><strong>Email :</strong> contact@cafthe.fr</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>2. Directeur de la publication</h2>
                    <p>
                        Le directeur de la publication est le gérant de la société CafThé.
                        Toute demande peut être adressée à : <strong>contact@cafthe.fr</strong>
                    </p>
                </section>

                <section className="legal-section">
                    <h2>3. Hébergeur</h2>
                    <p>Le site est hébergé par :</p>
                    <ul>
                        <li><strong>Société :</strong> OVH SAS</li>
                        <li><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</li>
                        <li><strong>Site web :</strong> www.ovhcloud.com</li>
                        <li><strong>Téléphone :</strong> +33 (0)9 72 10 10 07</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>4. Propriété intellectuelle</h2>
                    <p>
                        L'ensemble des éléments constituant le site cafthe.fr (textes, graphiques,
                        logiciels, photographies, images, sons, plans, noms, logos, marques, etc.)
                        est la propriété exclusive de la société CafThé ou de ses partenaires.
                    </p>
                    <p>
                        Toute reproduction, représentation, modification, publication ou adaptation
                        de tout ou partie des éléments du site, quel que soit le moyen ou le procédé
                        utilisé, est interdite sans l'autorisation écrite préalable de CafThé.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>5. Liens hypertextes</h2>
                    <p>
                        Le site cafthe.fr peut contenir des liens vers d'autres sites internet.
                        CafThé ne saurait être tenue responsable du contenu de ces sites tiers
                        ni des éventuels dommages liés à leur utilisation.
                    </p>
                </section>

                <section className="legal-section">
                    <h2>6. Données personnelles</h2>
                    <p>
                        Le traitement des données personnelles collectées sur ce site est régi par
                        notre <Link to="/politique-confidentialite">Politique de confidentialité</Link>.
                        Pour exercer vos droits (accès, rectification, suppression), contactez-nous
                        à l'adresse : <strong>contact@cafthe.fr</strong>
                    </p>
                </section>

                <section className="legal-section">
                    <h2>7. Droit applicable</h2>
                    <p>
                        Le présent site est soumis au droit français. En cas de litige, les
                        tribunaux français seront seuls compétents.
                    </p>
                </section>
            </div>
        </div>
        </>
    );
};

export default MentionsLegales;
