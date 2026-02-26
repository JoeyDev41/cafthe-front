import { Link } from "react-router-dom";

const PlanDuSite = () => {
    return (
        <>
            <title>Plan du site - CafThé</title>
            <meta name="description" content="Plan du site CafThé - Découvrez la structure complète de notre boutique en ligne de thés et cafés premium." />
            <div className="sitemap-container">
                <div className="sitemap-header">
                    <h1>Plan du site</h1>
                    <p>E-commerce Café &amp; Thé - Structure Complète</p>
                </div>

                <div className="sitemap-tree">
                    <Link to="/" className="sitemap-root">
                        🏠 ACCUEIL
                    </Link>

                    <div className="sitemap-connections">
                        <div className="sitemap-column">
                            <Link to="/the" className="sitemap-main-node">
                                <div className="sitemap-icon">🍵</div>
                                <div className="sitemap-title">THÉS</div>
                                <div className="sitemap-subtitle">Catalogue complet</div>
                                <span className="sitemap-badge">Catalogue</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Filtres (Type, Origine, Prix)</div>
                                    <div className="sitemap-sub-node">Liste des produits (Grille)</div>
                                    <div className="sitemap-sub-node">Tri (Prix, Popularité, Nouveautés)</div>
                                    <div className="sitemap-sub-node">Fiche produit détaillée</div>
                                    <div className="sitemap-sub-node">Produits similaires</div>
                                </div>
                            </Link>

                            <Link to="/cafe" className="sitemap-main-node">
                                <div className="sitemap-icon">☕</div>
                                <div className="sitemap-title">CAFÉS</div>
                                <div className="sitemap-subtitle">Catalogue complet</div>
                                <span className="sitemap-badge">Catalogue</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Filtres (Type, Torréfaction)</div>
                                    <div className="sitemap-sub-node">Liste des produits (Grille)</div>
                                    <div className="sitemap-sub-node">Tri et pagination</div>
                                    <div className="sitemap-sub-node">Fiche produit détaillée</div>
                                    <div className="sitemap-sub-node">Ajout rapide au panier</div>
                                </div>
                            </Link>

                            <Link to="/accessoires" className="sitemap-main-node">
                                <div className="sitemap-icon">🔧</div>
                                <div className="sitemap-title">ACCESSOIRES</div>
                                <div className="sitemap-subtitle">Théières, tasses...</div>
                                <span className="sitemap-badge">Catalogue</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Filtres par catégorie</div>
                                    <div className="sitemap-sub-node">Liste des produits</div>
                                    <div className="sitemap-sub-node">Fiche produit</div>
                                </div>
                            </Link>
                        </div>

                        <div className="sitemap-column">
                            <Link to="/panier" className="sitemap-main-node">
                                <div className="sitemap-icon">🛒</div>
                                <div className="sitemap-title">PANIER</div>
                                <div className="sitemap-subtitle">Gestion des achats</div>
                                <span className="sitemap-badge sitemap-badge--secondary">Achat</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Liste produits ajoutés</div>
                                    <div className="sitemap-sub-node">Modification quantité</div>
                                    <div className="sitemap-sub-node">Supprimer article</div>
                                    <div className="sitemap-sub-node">Récapitulatif (Total, Promo)</div>
                                    <div className="sitemap-sub-node">Code promo</div>
                                </div>
                            </Link>

                            <Link to="/checkout" className="sitemap-main-node">
                                <div className="sitemap-icon">💳</div>
                                <div className="sitemap-title">COMMANDE</div>
                                <div className="sitemap-subtitle">Tunnel d'achat</div>
                                <span className="sitemap-badge sitemap-badge--secondary">Achat</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">1. Identification</div>
                                    <div className="sitemap-sub-node">2. Adresse de livraison</div>
                                    <div className="sitemap-sub-node">3. Mode de livraison</div>
                                    <div className="sitemap-sub-node">4. Paiement sécurisé</div>
                                    <div className="sitemap-sub-node">5. Confirmation</div>
                                </div>
                            </Link>

                            <Link to="/produits" className="sitemap-main-node">
                                <div className="sitemap-icon">🔍</div>
                                <div className="sitemap-title">RECHERCHE</div>
                                <div className="sitemap-subtitle">Trouver un produit</div>
                                <span className="sitemap-badge sitemap-badge--info">Utilitaire</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Barre de recherche</div>
                                    <div className="sitemap-sub-node">Résultats produits</div>
                                    <div className="sitemap-sub-node">Filtres de recherche</div>
                                    <div className="sitemap-sub-node">Suggestions</div>
                                </div>
                            </Link>
                        </div>

                        <div className="sitemap-column">
                            <Link to="/compte" className="sitemap-main-node">
                                <div className="sitemap-icon">👤</div>
                                <div className="sitemap-title">MON COMPTE</div>
                                <div className="sitemap-subtitle">Espace client</div>
                                <span className="sitemap-badge sitemap-badge--secondary">Compte</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Connexion / Inscription</div>
                                    <div className="sitemap-sub-node">Mon Profil</div>
                                    <div className="sitemap-sub-node">Mes Commandes</div>
                                    <div className="sitemap-sub-node">Suivi de livraison</div>
                                    <div className="sitemap-sub-node">Mes Adresses</div>
                                    <div className="sitemap-sub-node">Mes Favoris</div>
                                    <div className="sitemap-sub-node">Paramètres compte</div>
                                </div>
                            </Link>

                            <Link to="/compte" className="sitemap-main-node">
                                <div className="sitemap-icon">❤️</div>
                                <div className="sitemap-title">FAVORIS</div>
                                <div className="sitemap-subtitle">Produits sauvegardés</div>
                                <span className="sitemap-badge sitemap-badge--info">Utilitaire</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Liste des favoris</div>
                                    <div className="sitemap-sub-node">Ajouter au panier</div>
                                    <div className="sitemap-sub-node">Supprimer favoris</div>
                                </div>
                            </Link>
                        </div>

                        <div className="sitemap-column">
                            <Link to="/a-propos" className="sitemap-main-node">
                                <div className="sitemap-icon">ℹ️</div>
                                <div className="sitemap-title">À PROPOS</div>
                                <div className="sitemap-subtitle">Notre histoire</div>
                                <span className="sitemap-badge sitemap-badge--info">Information</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Histoire de la marque</div>
                                    <div className="sitemap-sub-node">Nos valeurs</div>
                                    <div className="sitemap-sub-node">Nos engagements</div>
                                </div>
                            </Link>

                            <Link to="/contact" className="sitemap-main-node">
                                <div className="sitemap-icon">📧</div>
                                <div className="sitemap-title">CONTACT</div>
                                <div className="sitemap-subtitle">Nous joindre</div>
                                <span className="sitemap-badge sitemap-badge--info">Information</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">Formulaire de contact</div>
                                    <div className="sitemap-sub-node">Email / Téléphone</div>
                                    <div className="sitemap-sub-node">FAQ</div>
                                </div>
                            </Link>

                            <Link to="/mentions-legales" className="sitemap-main-node">
                                <div className="sitemap-icon">📄</div>
                                <div className="sitemap-title">MENTIONS LÉGALES</div>
                                <div className="sitemap-subtitle">Infos légales</div>
                                <span className="sitemap-badge sitemap-badge--info">Information</span>
                                <div className="sitemap-sub-nodes">
                                    <div className="sitemap-sub-node">CGV</div>
                                    <div className="sitemap-sub-node">Mentions légales</div>
                                    <div className="sitemap-sub-node">Politique de confidentialité</div>
                                    <div className="sitemap-sub-node">Cookies</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="sitemap-legend">
                    <h3>Légende</h3>
                    <div className="sitemap-legend-items">
                        <div className="sitemap-legend-item">
                            <div className="sitemap-legend-color sitemap-legend-color--main"></div>
                            <div>
                                <strong>Page d'accueil</strong><br />
                                <small>Point d'entrée principal du site</small>
                            </div>
                        </div>
                        <div className="sitemap-legend-item">
                            <div className="sitemap-legend-color sitemap-legend-color--node"></div>
                            <div>
                                <strong>Pages principales</strong><br />
                                <small>Sections majeures du site</small>
                            </div>
                        </div>
                        <div className="sitemap-legend-item">
                            <div className="sitemap-legend-color sitemap-legend-color--sub"></div>
                            <div>
                                <strong>Sous-pages &amp; fonctionnalités</strong><br />
                                <small>Détail des fonctionnalités de chaque section</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlanDuSite;
