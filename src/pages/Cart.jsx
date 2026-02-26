import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import { PromotionContext } from "../context/PromotionContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const { items, updateQuantity, removeFromCart, getTotal, clearCart, getItemKey, getItemPrice, getItemOriginalPrice } = useContext(CartContext);
    const { getDiscount } = useContext(PromotionContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const fraisLivraison = getTotal() >= 49 ? 0 : 5.90;
    const totalAvecLivraison = getTotal() + fraisLivraison;

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate("/login", { state: { redirect: "/checkout" } });
            return;
        }
        navigate("/checkout");
    };

    if (items.length === 0) {
        return (
            <div className="cart-container">
                <h1>Mon panier</h1>
                <div className="empty-cart">
                    <p>Votre panier est vide.</p>
                    <Link to="/" className="btn-primary">Continuer mes achats</Link>
                </div>
            </div>
        );
    }

    return (
        <>
                <title>Mon panier | CafThé</title>
                <meta name="description" content="Consultez et modifiez votre panier CafThé avant de passer commande." />
        <div className="cart-container">
            <h1>Mon panier</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {items.map((item) => {
                        const key = getItemKey(item);
                        const unitPrice = getItemPrice(item);
                        const originalPrice = getItemOriginalPrice(item);
                        const discount = getDiscount(item.ID_Article);
                        const imageUrl = item.images
                            ? `${import.meta.env.VITE_API_URL}/images/${item.images}`
                            : `https://placehold.co/100x100?text=${encodeURIComponent(item.nom_produit)}`;

                        return (
                            <div key={key} className="cart-item">
                                <img src={imageUrl} alt={item.nom_produit} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>
                                        {item.nom_produit}
                                        {item.isVrac && ` — ${item.poids >= 1000 ? `${item.poids / 1000}kg` : `${item.poids}g`}`}
                                    </h3>
                                    <p className="cart-item-price">
                                        {discount > 0 && (
                                            <span className="price-original">{originalPrice.toFixed(2)} &euro;</span>
                                        )}
                                        <span className={discount > 0 ? "price-promo" : ""}>{unitPrice.toFixed(2)} &euro;</span>
                                        {discount > 0 && <span className="cart-discount-tag">-{discount}%</span>}
                                    </p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button
                                        onClick={() => updateQuantity(key, item.quantite - 1)}
                                        className="qty-btn"
                                        aria-label="Diminuer la quantité"
                                    >
                                        -
                                    </button>
                                    <span className="qty-value">{item.quantite}</span>
                                    <button
                                        onClick={() => updateQuantity(key, item.quantite + 1)}
                                        className="qty-btn"
                                        aria-label="Augmenter la quantité"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-subtotal">
                                    {(unitPrice * item.quantite).toFixed(2)} &euro;
                                </div>
                                <button
                                    onClick={() => { if (window.confirm(`Supprimer "${item.nom_produit}" du panier ?`)) removeFromCart(key); }}
                                    className="cart-item-remove"
                                    title="Supprimer"
                                    aria-label={`Supprimer ${item.nom_produit}`}
                                >
                                    &times;
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="cart-summary">
                    <h3>Récapitulatif</h3>
                    <div className="summary-line">
                        <span>Sous-total</span>
                        <span>{getTotal().toFixed(2)} &euro;</span>
                    </div>
                    <div className="summary-line">
                        <span>Livraison</span>
                        <span>{fraisLivraison === 0 ? "Gratuit" : `${fraisLivraison.toFixed(2)} \u20AC`}</span>
                    </div>
                    {fraisLivraison > 0 && (
                        <p className="free-shipping-note">
                            Plus que {(49 - getTotal()).toFixed(2)} &euro; pour la livraison gratuite
                        </p>
                    )}
                    <div className="summary-total">
                        <span>Total TTC</span>
                        <span>{totalAvecLivraison.toFixed(2)} &euro;</span>
                    </div>
                    <button onClick={handleCheckout} className="btn-primary btn-checkout">
                        Passer commande
                    </button>
                    <button onClick={() => { if (window.confirm("Vider tout le panier ?")) clearCart(); }} className="btn-secondary btn-clear">
                        Vider le panier
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Cart;
