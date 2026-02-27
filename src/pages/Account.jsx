import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContex.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfile, updateProfile, changePassword, getMyOrders } from "../services/api.js";

const Account = () => {
    const { user, isAuthenticated, logout, deleteAccount } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("profil");
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [editingProfile, setEditingProfile] = useState(false);
    const [editingAdresses, setEditingAdresses] = useState(false);

    const [formProfile, setFormProfile] = useState({});

    const [formPassword, setFormPassword] = useState({
        ancien_mdp: "",
        nouveau_mdp: "",
        confirm_mdp: "",
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        loadProfile();
    }, [isAuthenticated]);

    const loadProfile = async () => {
        try {
            setIsLoading(true);
            const data = await getProfile();
            setProfile(data.client);

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

    const loadOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data.commandes);
        } catch (error) {
            toast.error("Erreur lors du chargement des commandes");
        }
    };

    useEffect(() => {
        if (activeTab === "commandes") {
            loadOrders();
        }
    }, [activeTab]);

    const handleProfileChange = (e) => {
        setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
    };

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

    const handlePasswordChange = (e) => {
        setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (formPassword.nouveau_mdp !== formPassword.confirm_mdp) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            await changePassword(formPassword.ancien_mdp, formPassword.nouveau_mdp);
            toast.success("Mot de passe modifié avec succès");
            setFormPassword({ ancien_mdp: "", nouveau_mdp: "", confirm_mdp: "" });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getStatusLabel = (statut) => {
        const labels = {
            en_attente: "En attente",
            en_preparation: "En préparation",
            expediee: "Expédiée",
            livree: "Livrée",
        };
        return labels[statut] || statut;
    };

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

    if (isLoading) {
        return <div className="account-container"><p>Chargement...</p></div>;
    }

    return (
        <div className="account-container">
                <title>Mon compte | CafThé</title>
                <meta name="description" content="Gérez votre compte CafThé : informations personnelles, historique de commandes et paramètres." />
            <h1>Mon espace</h1>

            <div className="account-tabs" role="tablist" aria-label="Navigation du compte">
                <button
                    role="tab"
                    id="tab-profil"
                    aria-selected={activeTab === "profil"}
                    aria-controls="panel-profil"
                    className={`tab-btn ${activeTab === "profil" ? "active" : ""}`}
                    onClick={() => setActiveTab("profil")}
                    tabIndex={activeTab === "profil" ? 0 : -1}
                >
                    Mon profil
                </button>
                <button
                    role="tab"
                    id="tab-adresses"
                    aria-selected={activeTab === "adresses"}
                    aria-controls="panel-adresses"
                    className={`tab-btn ${activeTab === "adresses" ? "active" : ""}`}
                    onClick={() => setActiveTab("adresses")}
                    tabIndex={activeTab === "adresses" ? 0 : -1}
                >
                    Mes adresses
                </button>
                <button
                    role="tab"
                    id="tab-commandes"
                    aria-selected={activeTab === "commandes"}
                    aria-controls="panel-commandes"
                    className={`tab-btn ${activeTab === "commandes" ? "active" : ""}`}
                    onClick={() => setActiveTab("commandes")}
                    tabIndex={activeTab === "commandes" ? 0 : -1}
                >
                    Mes commandes
                </button>
                <button
                    role="tab"
                    id="tab-mdp"
                    aria-selected={activeTab === "mdp"}
                    aria-controls="panel-mdp"
                    className={`tab-btn ${activeTab === "mdp" ? "active" : ""}`}
                    onClick={() => setActiveTab("mdp")}
                    tabIndex={activeTab === "mdp" ? 0 : -1}
                >
                    Mot de passe
                </button>
            </div>

            {activeTab === "profil" && (
                <div role="tabpanel" id="panel-profil" aria-labelledby="tab-profil" tabIndex={0}>
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
                        <form onSubmit={handleProfileSubmit} className="account-form" aria-label="Modifier mes informations">
                            <h3>Modifier mes informations</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="profile-prenom">Prénom :</label>
                                    <input id="profile-prenom" name="prenom" autoComplete="given-name" value={formProfile.prenom} onChange={handleProfileChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="profile-nom">Nom :</label>
                                    <input id="profile-nom" name="nom" autoComplete="family-name" value={formProfile.nom} onChange={handleProfileChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-email">Email :</label>
                                <input id="profile-email" value={profile?.email_client || ""} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-telephone">Téléphone :</label>
                                <input id="profile-telephone" name="telephone" autoComplete="tel" value={formProfile.telephone} onChange={handleProfileChange} placeholder="0612345678" />
                            </div>
                            <button type="submit" className="btn-primary">Enregistrer</button>
                        </form>
                    )}
                </div>
            )}

            {activeTab === "adresses" && (
                <div role="tabpanel" id="panel-adresses" aria-labelledby="tab-adresses" tabIndex={0}>
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
                        <form onSubmit={handleProfileSubmit} className="account-form" aria-label="Modifier mes adresses">
                            <h3>Adresse de facturation</h3>
                            <div className="form-group">
                                <label htmlFor="fact-adresse">Adresse :</label>
                                <input id="fact-adresse" name="adresse_facturation" autoComplete="billing street-address" value={formProfile.adresse_facturation} onChange={handleProfileChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="fact-cp">Code postal :</label>
                                    <input id="fact-cp" name="cp_facturation" autoComplete="billing postal-code" value={formProfile.cp_facturation} onChange={handleProfileChange} maxLength="5" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fact-ville">Ville :</label>
                                    <input id="fact-ville" name="ville_facturation" autoComplete="billing address-level2" value={formProfile.ville_facturation} onChange={handleProfileChange} />
                                </div>
                            </div>

                            <h3>Adresse de livraison</h3>
                            <div className="form-group">
                                <label htmlFor="liv-adresse">Adresse :</label>
                                <input id="liv-adresse" name="adresse_livraison" autoComplete="shipping street-address" value={formProfile.adresse_livraison} onChange={handleProfileChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="liv-cp">Code postal :</label>
                                    <input id="liv-cp" name="cp_livraison" autoComplete="shipping postal-code" value={formProfile.cp_livraison} onChange={handleProfileChange} maxLength="5" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="liv-ville">Ville :</label>
                                    <input id="liv-ville" name="ville_livraison" autoComplete="shipping address-level2" value={formProfile.ville_livraison} onChange={handleProfileChange} />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary">Enregistrer</button>
                        </form>
                    )}
                </div>
            )}

            {activeTab === "commandes" && (
                <div role="tabpanel" id="panel-commandes" aria-labelledby="tab-commandes" tabIndex={0} className="orders-list">
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

            {activeTab === "mdp" && (
                <div role="tabpanel" id="panel-mdp" aria-labelledby="tab-mdp" tabIndex={0}>
                    <form onSubmit={handlePasswordSubmit} className="account-form" aria-label="Modifier le mot de passe">
                        <div className="form-group">
                            <label htmlFor="ancien-mdp">Ancien mot de passe :</label>
                            <input id="ancien-mdp" name="ancien_mdp" type="password" autoComplete="current-password" value={formPassword.ancien_mdp} onChange={handlePasswordChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nouveau-mdp">Nouveau mot de passe :</label>
                            <input id="nouveau-mdp" name="nouveau_mdp" type="password" autoComplete="new-password" value={formPassword.nouveau_mdp} onChange={handlePasswordChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-mdp">Confirmer le nouveau mot de passe :</label>
                            <input id="confirm-mdp" name="confirm_mdp" type="password" autoComplete="new-password" value={formPassword.confirm_mdp} onChange={handlePasswordChange} required />
                        </div>
                        <button type="submit" className="btn-primary">Modifier le mot de passe</button>
                    </form>
                </div>
            )}

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
