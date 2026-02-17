// Account.jsx — Page "Mon espace" du client connecté
// Elle est organisée en onglets : Profil, Adresses, Commandes, Mot de passe
// Chaque onglet a son propre formulaire ou sa propre vue
// Si le client n'est pas connecté, il est redirigé vers /login

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContex.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfile, updateProfile, changePassword, getMyOrders } from "../services/api.js";
// Helmet : permet de modifier le <head> du HTML depuis un composant React
import { Helmet } from "react-helmet-async";

const Account = () => {
    const { user, isAuthenticated, logout, deleteAccount } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Onglet actif par défaut : "profil"
    const [activeTab, setActiveTab] = useState("profil");
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Toggle pour afficher/masquer les formulaires de modification
    const [editingProfile, setEditingProfile] = useState(false);
    const [editingAdresses, setEditingAdresses] = useState(false);

    // State pour le formulaire de modification du profil
    const [formProfile, setFormProfile] = useState({});

    // State pour le formulaire de changement de mot de passe
    const [formPassword, setFormPassword] = useState({
        ancien_mdp: "",
        nouveau_mdp: "",
        confirm_mdp: "",
    });

    // Au chargement, je vérifie que le client est connecté puis je charge son profil
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        loadProfile();
    }, [isAuthenticated]);

    // Chargement du profil depuis l'API et pré-remplissage du formulaire
    const loadProfile = async () => {
        try {
            setIsLoading(true);
            const data = await getProfile();
            setProfile(data.client);

            // Je pré-remplis le formulaire avec les données existantes du client
            setFormProfile({
                nom: data.client.nom_client || "",
                prenom: data.client.prenom_client || "",
                telephone: data.client.telephone_client || "",
                adresse_facturation: data.client.adresse_facturation || "",
                cp_facturation: data.client.cp_facturation || "",
                ville_facturation: data.client.ville_facturation || "",
                adresse_livraison: data.client.adresse_livraison || "",
                cp_livraison: data.client.cp_livraison || "",
                ville_livraison: data.client.ville_livraison || "",
            });
        } catch (error) {
            toast.error("Erreur lors du chargement du profil");
        } finally {
            setIsLoading(false);
        }
    };

    // Chargement des commandes (appelé uniquement quand on clique sur l'onglet "Commandes")
    const loadOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data.commandes);
        } catch (error) {
            toast.error("Erreur lors du chargement des commandes");
        }
    };

    // Je charge les commandes seulement quand l'onglet "commandes" est actif
    useEffect(() => {
        if (activeTab === "commandes") {
            loadOrders();
        }
    }, [activeTab]);

    // Gestion des changements dans le formulaire profil (clé dynamique avec e.target.name)
    const handleProfileChange = (e) => {
        setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
    };

    // Envoi des modifications du profil à l'API
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formProfile);
            toast.success("Profil mis à jour avec succès");
            await loadProfile();
            setEditingProfile(false);
            setEditingAdresses(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Gestion du formulaire mot de passe
    const handlePasswordChange = (e) => {
        setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
    };

    // Envoi du changement de mot de passe
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        // Vérification que les 2 nouveaux mots de passe correspondent
        if (formPassword.nouveau_mdp !== formPassword.confirm_mdp) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            await changePassword(formPassword.ancien_mdp, formPassword.nouveau_mdp);
            toast.success("Mot de passe modifié avec succès");
            // Je vide le formulaire après succès
            setFormPassword({ ancien_mdp: "", nouveau_mdp: "", confirm_mdp: "" });
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fonction utilitaire pour formater les dates en format français (jj/mm/aaaa)
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Traduction des statuts de commande en labels lisibles
    const getStatusLabel = (statut) => {
        const labels = {
            en_attente: "En attente",
            en_preparation: "En préparation",
            expediee: "Expédiée",
            livree: "Livrée",
        };
        return labels[statut] || statut;
    };

    // Fonction "Recommander" : remet tous les articles d'une ancienne commande dans le panier
    const handleReorder = (order) => {
        if (!order.items || order.items.length === 0) return;

        order.items.forEach((item) => {
            addToCart({
                ID_Article: item.ID_Article,
                nom_produit: item.nom_produit,
                prix_ttc: item.prix_ttc,
                images: item.images || null,
                stock: 999,
            }, parseInt(item.Quantite));
        });

        toast.success(`${order.items.length} article(s) ajouté(s) au panier`);
        setTimeout(() => navigate("/panier"), 1200);
    };

    // Affichage du chargement
    if (isLoading) {
        return <div className="account-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="account-container">
            {/* Helmet : titre pour la page Mon compte */}
            <Helmet>
                <title>Mon compte | CafThé</title>
                <meta name="description" content="Gérez votre profil, vos adresses et consultez vos commandes sur votre espace CafThé." />
            </Helmet>
            <h2>Mon espace</h2>

            {/* Navigation par onglets */}
            <div className="account-tabs">
                <button
                    className={`tab-btn ${activeTab === "profil" ? "active" : ""}`}
                    onClick={() => setActiveTab("profil")}
                >
                    Mon profil
                </button>
                <button
                    className={`tab-btn ${activeTab === "adresses" ? "active" : ""}`}
                    onClick={() => setActiveTab("adresses")}
                >
                    Mes adresses
                </button>
                <button
                    className={`tab-btn ${activeTab === "commandes" ? "active" : ""}`}
                    onClick={() => setActiveTab("commandes")}
                >
                    Mes commandes
                </button>
                <button
                    className={`tab-btn ${activeTab === "mdp" ? "active" : ""}`}
                    onClick={() => setActiveTab("mdp")}
                >
                    Mot de passe
                </button>
            </div>

            {/* Onglet Profil : bloc d'affichage + formulaire de modification */}
            {activeTab === "profil" && (
                <>
                    <div className="info-card">
                        <div className="info-card-header">
                            <h3>Mes informations</h3>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Prénom</span>
                            <span className="info-value">{profile?.prenom_client || "Non renseigné"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Nom</span>
                            <span className="info-value">{profile?.nom_client || "Non renseigné"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Email</span>
                            <span className="info-value">{profile?.email_client || "Non renseigné"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Téléphone</span>
                            <span className="info-value">{profile?.telephone_client || "Non renseigné"}</span>
                        </div>
                        <button
                            className="btn-edit"
                            onClick={() => setEditingProfile(!editingProfile)}
                        >
                            {editingProfile ? "Annuler" : "Modifier"}
                        </button>
                    </div>

                    {editingProfile && (
                        <form onSubmit={handleProfileSubmit} className="account-form">
                            <h3>Modifier mes informations</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Prénom :</label>
                                    <input name="prenom" value={formProfile.prenom} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label>Nom :</label>
                                    <input name="nom" value={formProfile.nom} onChange={handleProfileChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email :</label>
                                <input value={profile?.email_client || ""} disabled />
                            </div>
                            <div className="form-group">
                                <label>Téléphone :</label>
                                <input name="telephone" value={formProfile.telephone} onChange={handleProfileChange} placeholder="0612345678" />
                            </div>
                            <button type="submit" className="btn-primary">Enregistrer</button>
                        </form>
                    )}
                </>
            )}

            {/* Onglet Adresses : blocs d'affichage + formulaire de modification */}
            {activeTab === "adresses" && (
                <>
                    <div className="info-cards-grid">
                        <div className="info-card">
                            <div className="info-card-header">
                                <h3>Adresse de facturation</h3>
                            </div>
                            {profile?.adresse_facturation ? (
                                <>
                                    <div className="info-row">
                                        <span className="info-label">Adresse</span>
                                        <span className="info-value">{profile.adresse_facturation}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Code postal</span>
                                        <span className="info-value">{profile.cp_facturation}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Ville</span>
                                        <span className="info-value">{profile.ville_facturation}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="info-empty">Aucune adresse de facturation renseignée</p>
                            )}
                        </div>

                        <div className="info-card">
                            <div className="info-card-header">
                                <h3>Adresse de livraison</h3>
                            </div>
                            {profile?.adresse_livraison ? (
                                <>
                                    <div className="info-row">
                                        <span className="info-label">Adresse</span>
                                        <span className="info-value">{profile.adresse_livraison}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Code postal</span>
                                        <span className="info-value">{profile.cp_livraison}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Ville</span>
                                        <span className="info-value">{profile.ville_livraison}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="info-empty">Aucune adresse de livraison renseignée</p>
                            )}
                        </div>
                    </div>

                    <button
                        className="btn-edit"
                        onClick={() => setEditingAdresses(!editingAdresses)}
                        style={{ marginBottom: "1rem" }}
                    >
                        {editingAdresses ? "Annuler" : "Modifier mes adresses"}
                    </button>

                    {editingAdresses && (
                        <form onSubmit={handleProfileSubmit} className="account-form">
                            <h3>Adresse de facturation</h3>
                            <div className="form-group">
                                <label>Adresse :</label>
                                <input name="adresse_facturation" value={formProfile.adresse_facturation} onChange={handleProfileChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code postal :</label>
                                    <input name="cp_facturation" value={formProfile.cp_facturation} onChange={handleProfileChange} maxLength="5" />
                                </div>
                                <div className="form-group">
                                    <label>Ville :</label>
                                    <input name="ville_facturation" value={formProfile.ville_facturation} onChange={handleProfileChange} />
                                </div>
                            </div>

                            <h3>Adresse de livraison</h3>
                            <div className="form-group">
                                <label>Adresse :</label>
                                <input name="adresse_livraison" value={formProfile.adresse_livraison} onChange={handleProfileChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code postal :</label>
                                    <input name="cp_livraison" value={formProfile.cp_livraison} onChange={handleProfileChange} maxLength="5" />
                                </div>
                                <div className="form-group">
                                    <label>Ville :</label>
                                    <input name="ville_livraison" value={formProfile.ville_livraison} onChange={handleProfileChange} />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary">Enregistrer</button>
                        </form>
                    )}
                </>
            )}

            {/* Onglet Commandes : historique avec possibilité de recommander */}
            {activeTab === "commandes" && (
                <div className="orders-list">
                    {orders.length === 0 ? (
                        <p className="empty-state">Aucune commande pour le moment.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.ID_Commande} className="order-card">
                                <div className="order-header">
                                    <span className="order-number">{order.numero_commande}</span>
                                    <span className={`order-status status-${order.statut_commande}`}>
                                        {getStatusLabel(order.statut_commande)}
                                    </span>
                                </div>
                                <div className="order-info">
                                    <span>Date : {formatDate(order.date_commande)}</span>
                                    <span>Total : {parseFloat(order.montant_paiement).toFixed(2)} €</span>
                                </div>
                                {/* Liste des articles de la commande */}
                                {order.items && (
                                    <div className="order-items">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="order-item">
                                                <span>{item.nom_produit}</span>
                                                <span>x{parseInt(item.Quantite)}</span>
                                                <span>{parseFloat(item.prix_ttc).toFixed(2)} €</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Bouton pour remettre la commande dans le panier */}
                                {order.items && order.items.length > 0 && (
                                    <button
                                        className="btn-reorder"
                                        onClick={() => handleReorder(order)}
                                    >
                                        &#8635; Recommander
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Onglet Mot de passe : ancien mdp + nouveau + confirmation */}
            {activeTab === "mdp" && (
                <form onSubmit={handlePasswordSubmit} className="account-form">
                    <div className="form-group">
                        <label>Ancien mot de passe :</label>
                        <input name="ancien_mdp" type="password" value={formPassword.ancien_mdp} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nouveau mot de passe :</label>
                        <input name="nouveau_mdp" type="password" value={formPassword.nouveau_mdp} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-group">
                        <label>Confirmer :</label>
                        <input name="confirm_mdp" type="password" value={formPassword.confirm_mdp} onChange={handlePasswordChange} required />
                    </div>
                    <button type="submit" className="btn-primary">Modifier le mot de passe</button>
                </form>
            )}

            {/* Boutons déconnexion et suppression de compte */}
            <div className="account-actions">
                <button className="btn-logout" onClick={() => { logout(); navigate("/"); }}>
                    Se déconnecter
                </button>
                <button
                    className="btn-delete-account"
                    onClick={() => {
                        toast((t) => (
                            <div>
                                <p><strong>Supprimer votre compte ?</strong></p>
                                <p style={{ fontSize: "0.85rem", margin: "0.5rem 0" }}>
                                    Cette action est irréversible. Vos données personnelles seront supprimées mais vos commandes seront conservées.
                                </p>
                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                                    <button
                                        onClick={async () => {
                                            toast.dismiss(t.id);
                                            try {
                                                await deleteAccount();
                                                toast.success("Compte supprimé avec succès");
                                                navigate("/");
                                            } catch (error) {
                                                toast.error(error.message);
                                            }
                                        }}
                                        style={{
                                            padding: "0.4rem 1rem",
                                            background: "#dc3545",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Confirmer la suppression
                                    </button>
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        style={{
                                            padding: "0.4rem 1rem",
                                            background: "#6c757d",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        ), { duration: Infinity });
                    }}
                >
                    Supprimer mon compte
                </button>
            </div>
        </div>
    );
};

export default Account;
