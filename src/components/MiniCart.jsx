import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

const MiniCart = ({ isOpen, onClose }) => {
    const { items, updateQuantity, removeFromCart, getTotal, getItemCount, getItemKey, getItemPrice } = useContext(CartContext);

    if (!isOpen) return null;

    return (
        <div className="minicart-overlay" onClick={onClose}>
            <div className="minicart" onClick={(e) => e.stopPropagation()}>
                <div className="minicart-header">
                    <h3>Mon panier ({getItemCount()})</h3>
                    <button onClick={onClose} className="minicart-close" aria-label="Fermer le panier">&times;</button>
                </div>

                {items.length === 0 ? (
                    <p className="minicart-empty">Votre panier est vide</p>
                ) : (
                    <>
                        <div className="minicart-items">
                            {items.map((item) => {
                                const key = getItemKey(item);
                                const unitPrice = getItemPrice(item);
                                const imageUrl = item.images
                                    ? `${import.meta.env.VITE_API_URL}/images/${item.images}`
                                    : `https://placehold.co/60x60?text=${encodeURIComponent(item.nom_produit)}`;
                                return (
                                    <div key={key} className="minicart-item">
                                        <img src={imageUrl} alt={item.nom_produit} className="minicart-item-image" />
                                        <div className="minicart-item-info">
                                            <span className="minicart-item-name">
                                                {item.nom_produit}
                                                {item.isVrac && ` (${item.poids >= 1000 ? `${item.poids / 1000}kg` : `${item.poids}g`})`}
                                            </span>
                                            <span className="minicart-item-price">
                                                {(unitPrice * item.quantite).toFixed(2)} &euro;
                                            </span>
                                        </div>
                                        <div className="minicart-item-actions">
                                            <button onClick={() => updateQuantity(key, item.quantite - 1)} className="qty-btn" aria-label="Diminuer la quantité">-</button>
                                            <span>{item.quantite}</span>
                                            <button onClick={() => updateQuantity(key, item.quantite + 1)} className="qty-btn" aria-label="Augmenter la quantité">+</button>
                                            <button onClick={() => { if (window.confirm(`Supprimer "${item.nom_produit}" ?`)) removeFromCart(key); }} className="minicart-remove" aria-label={`Supprimer ${item.nom_produit}`}>&times;</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="minicart-footer">
                            <div className="minicart-total">
                                <span>Total</span>
                                <span>{getTotal().toFixed(2)} &euro;</span>
                            </div>
                            <Link to="/panier" className="btn-primary" onClick={onClose}>
                                Voir mon panier
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MiniCart;
