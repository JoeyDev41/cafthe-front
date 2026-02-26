import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrder, getProfile } from "../services/api.js";

const Checkout = () => {
    const { items, getTotal, clearCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState(null);
    const [modeLivraison, setModeLivraison] = useState("livraison");
    const [modePaiement, setModePaiement] = useState("cb");
    const [adresse, setAdresse] = useState({
        adresse: "",
        cp: "",
        ville: "",
    });
    const [selectedCarrier, setSelectedCarrier] = useState("colissimo");
    const [isLoading, setIsLoading] = useState(false);

    const carriers = [
        {
            id: "colissimo",
            nom: "Colissimo",
            delai: "3-5 jours ouvrés",
            prix: getTotal() >= 49 ? 0 : 5.90,
        },
        {
            id: "chronopost",
            nom: "Chronopost Express",
            delai: "24h",
            prix: 9.90,
        },
        {
            id: "relais",
            nom: "Point Relais",
            delai: "2-4 jours ouvrés",
            prix: 3.90,
        },
    ];

    const getCarrierPrice = () => {
        if (modeLivraison === "retrait") return 0;
        const carrier = carriers.find((c) => c.id === selectedCarrier);
        return carrier ? carrier.prix : 0;
    };

    const fraisLivraison = getCarrierPrice();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { state: { redirect: "/checkout" } });
            return;
        }
        if (items.length === 0) {
            navigate("/panier");
            return;
        }
        loadProfile();
    }, [isAuthenticated]);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data.client);
            if (data.client.adresse_livraison) {
                setAdresse({
                    adresse: data.client.adresse_livraison || "",
                    cp: data.client.cp_livraison || "",
                    ville: data.client.ville_livraison || "",
                });
            }
        } catch (error) {
            console.error("Erreur chargement profil", error);
        }
    };

    const [paypalRedirect, setPaypalRedirect] = useState(false);

    const handleConfirmOrder = async () => {
        setIsLoading(true);

        if (modePaiement === "paypal") {
            setPaypalRedirect(true);
            await new Promise((r) => setTimeout(r, 2000));
            setPaypalRedirect(false);
        }

        try {
            const orderItems = items.map((item) => ({
                id_article: item.ID_Article,
                quantite: item.quantite,
                prix_ttc: item.prix_ttc,
            }));

            const data = await createOrder(orderItems, modePaiement);

            clearCart();
            navigate("/confirmation", {
                state: {
                    commande: data.commande,
                    items: items,
                },
            });
        } catch (error) {
            toast.error(error.message || "Erreur lors de la commande");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="checkout-container">
                <title>Passer commande | CafThé</title>
                <meta name="description" content="Finalisez votre commande CafThé en toute sécurité." />
            <h1>Finaliser ma commande</h1>

            <div className="checkout-steps" role="list" aria-label="Étapes de la commande">
                <div className={`step ${step >= 1 ? "active" : ""}`} role="listitem" aria-current={step === 1 ? "step" : undefined}>1. Livraison</div>
                <div className={`step ${step >= 2 ? "active" : ""}`} role="listitem" aria-current={step === 2 ? "step" : undefined}>2. Paiement</div>
                <div className={`step ${step >= 3 ? "active" : ""}`} role="listitem" aria-current={step === 3 ? "step" : undefined}>3. Confirmation</div>
            </div>

            {step === 1 && (
                <div className="checkout-step-content">
                    <h3>Mode de livraison</h3>
                    <div className="delivery-options">
                        <label className={`delivery-option ${modeLivraison === "livraison" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="livraison"
                                value="livraison"
                                checked={modeLivraison === "livraison"}
                                onChange={(e) => setModeLivraison(e.target.value)}
                            />
                            <div>
                                <strong>Livraison à domicile</strong>
                                <p>Choix du transporteur à l'étape suivante</p>
                            </div>
                        </label>
                        <label className={`delivery-option ${modeLivraison === "retrait" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="livraison"
                                value="retrait"
                                checked={modeLivraison === "retrait"}
                                onChange={(e) => setModeLivraison(e.target.value)}
                            />
                            <div>
                                <strong>Retrait en magasin</strong>
                                <p>Gratuit - Disponible sous 24h</p>
                            </div>
                        </label>
                    </div>

                    {modeLivraison === "livraison" && (
                        <div className="carrier-section">
                            <h3>Choisir le transporteur</h3>
                            <div className="carrier-options">
                                {carriers.map((carrier) => (
                                    <label
                                        key={carrier.id}
                                        className={`carrier-option ${selectedCarrier === carrier.id ? "selected" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name="transporteur"
                                            value={carrier.id}
                                            checked={selectedCarrier === carrier.id}
                                            onChange={(e) => setSelectedCarrier(e.target.value)}
                                        />
                                        <div className="carrier-info">
                                            <strong>{carrier.nom}</strong>
                                            <span className="carrier-delay">{carrier.delai}</span>
                                        </div>
                                        <span className="carrier-price">
                                            {carrier.prix === 0 ? "Gratuit" : `${carrier.prix.toFixed(2)} €`}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {modeLivraison === "livraison" && (
                        <div className="address-form">
                            <h3>Adresse de livraison</h3>
                            <div className="form-group">
                                <label htmlFor="adresse-rue">Adresse <span className="required-star" aria-hidden="true">*</span></label>
                                <input
                                    id="adresse-rue"
                                    autoComplete="street-address"
                                    value={adresse.adresse}
                                    onChange={(e) => setAdresse({ ...adresse, adresse: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="adresse-cp">Code postal <span className="required-star" aria-hidden="true">*</span></label>
                                    <input
                                        id="adresse-cp"
                                        autoComplete="postal-code"
                                        value={adresse.cp}
                                        onChange={(e) => setAdresse({ ...adresse, cp: e.target.value })}
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="adresse-ville">Ville <span className="required-star" aria-hidden="true">*</span></label>
                                    <input
                                        id="adresse-ville"
                                        autoComplete="address-level2"
                                        value={adresse.ville}
                                        onChange={(e) => setAdresse({ ...adresse, ville: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <p className="rgpd-notice">
                                Votre adresse est utilisée uniquement pour la livraison de cette commande.
                                En savoir plus : <Link to="/politique-confidentialite">politique de confidentialité</Link>.
                            </p>
                        </div>
                    )}

                    <button className="btn-primary" onClick={() => setStep(2)}>
                        Continuer vers le paiement
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="checkout-step-content">
                    <h3>Mode de paiement</h3>
                    <div className="payment-options">
                        <label className={`payment-option ${modePaiement === "cb" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="paiement"
                                value="cb"
                                checked={modePaiement === "cb"}
                                onChange={(e) => setModePaiement(e.target.value)}
                            />
                            <span>Carte bancaire</span>
                        </label>
                        <label className={`payment-option payment-paypal ${modePaiement === "paypal" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="paiement"
                                value="paypal"
                                checked={modePaiement === "paypal"}
                                onChange={(e) => setModePaiement(e.target.value)}
                            />
                            <span className="paypal-label">
                                <span className="paypal-logo">Pay<span className="paypal-pal">Pal</span></span>
                            </span>
                        </label>
                        {modeLivraison === "retrait" && (
                            <label className={`payment-option ${modePaiement === "magasin" ? "selected" : ""}`}>
                                <input
                                    type="radio"
                                    name="paiement"
                                    value="magasin"
                                    checked={modePaiement === "magasin"}
                                    onChange={(e) => setModePaiement(e.target.value)}
                                />
                                <span>Paiement en magasin au retrait</span>
                            </label>
                        )}
                    </div>

                    <div className="checkout-nav">
                        <button className="btn-secondary" onClick={() => setStep(1)}>Retour</button>
                        <button className="btn-primary" onClick={() => setStep(3)}>Vérifier ma commande</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="checkout-step-content">
                    <h3>Récapitulatif de votre commande</h3>

                    <div className="checkout-recap">
                        <div className="recap-items">
                            {items.map((item) => (
                                <div key={item.ID_Article} className="recap-item">
                                    <span>{item.nom_produit} x{item.quantite}</span>
                                    <span>{(item.prix_ttc * item.quantite).toFixed(2)} €</span>
                                </div>
                            ))}
                        </div>

                        <div className="recap-details">
                            <div className="summary-line">
                                <span>Sous-total</span>
                                <span>{getTotal().toFixed(2)} €</span>
                            </div>
                            <div className="summary-line">
                                <span>
                                    Livraison ({modeLivraison === "retrait"
                                        ? "Retrait en magasin"
                                        : carriers.find((c) => c.id === selectedCarrier)?.nom})
                                </span>
                                <span>{fraisLivraison === 0 ? "Gratuit" : `${fraisLivraison.toFixed(2)} €`}</span>
                            </div>
                            <div className="summary-line">
                                <span>Paiement</span>
                                <span>{modePaiement === "cb" ? "Carte bancaire" : modePaiement === "paypal" ? "PayPal" : "En magasin"}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total TTC</span>
                                <span>{(getTotal() + fraisLivraison).toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-nav">
                        <button className="btn-secondary" onClick={() => setStep(2)}>Retour</button>
                        <button
                            className="btn-primary btn-confirm"
                            onClick={handleConfirmOrder}
                            disabled={isLoading}
                        >
                            {paypalRedirect ? "Redirection vers PayPal..." : isLoading ? "Commande en cours..." : "Confirmer ma commande"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
