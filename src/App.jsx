// Composant principal de l'application CafThé
// J'utilise React.lazy pour le code splitting : chaque page est chargée
// uniquement quand l'utilisateur y accède, ce qui améliore les performances
// Suspense affiche un loader pendant le chargement d'une page

import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// HelmetProvider : fournit le contexte nécessaire à react-helmet-async
// Il doit englober toute l'application pour que <Helmet> fonctionne dans chaque page
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContex.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { PromotionProvider } from "./context/PromotionContext.jsx";
// ThemeProvider : gère le thème clair/sombre et le stocke dans le localStorage
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Layout from "./layout/Layout.jsx";
import Loader from "./components/Loader.jsx";
// On importe index.css qui charge tous les fichiers CSS dans le bon ordre
import "./styles/index.css";

// Chargement lazy des pages (code splitting)
// Au lieu d'importer toutes les pages d'un coup, chacune est un "chunk" séparé
const Home = lazy(() => import("./pages/Home.jsx"));
const The = lazy(() => import("./pages/The.jsx"));
const Cafe = lazy(() => import("./pages/Cafe.jsx"));
const Accessoires = lazy(() => import("./pages/Accessoires.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Vrac = lazy(() => import("./pages/Vrac.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation.jsx"));
const CGV = lazy(() => import("./pages/CGV.jsx"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
    return (
        // Les Providers englobent toute l'app pour partager les données
        // (auth, panier, promotions) entre tous les composants via Context API
        // HelmetProvider englobe tout : il permet à chaque page d'utiliser <Helmet>
        // pour modifier dynamiquement le <head> du HTML (titre, meta description, etc.)
        <HelmetProvider>
        {/* ThemeProvider : fournit le thème (clair/sombre) à toute l'app */}
        <ThemeProvider>
        <AuthProvider>
            <PromotionProvider>
            <CartProvider>
                <BrowserRouter>
                    {/* Suspense : affiche le Loader pendant le chargement lazy */}
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            {/* Layout contient Navbar + Outlet + Footer */}
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="the" element={<The />} />
                                <Route path="cafe" element={<Cafe />} />
                                <Route path="accessoires" element={<Accessoires />} />
                                <Route path="a-propos" element={<About />} />
                                <Route path="produits" element={<Products />} />
                                <Route path="vrac" element={<Vrac />} />
                                <Route path="produits/:id" element={<ProductDetails />} />
                                <Route path="login" element={<Login />} />
                                <Route path="inscription" element={<Register />} />
                                <Route path="compte" element={<Account />} />
                                <Route path="panier" element={<Cart />} />
                                <Route path="checkout" element={<Checkout />} />
                                <Route path="confirmation" element={<OrderConfirmation />} />
                                <Route path="cgv" element={<CGV />} />
                                <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Suspense>
                    {/* Toast : notifications en haut à droite (succès vert, erreur rouge) */}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: { fontFamily: "Montserrat, sans-serif" },
                            success: { style: { background: "#d4edda", color: "#155724" } },
                            error: { style: { background: "#f8d7da", color: "#721c24" } },
                        }}
                    />
                </BrowserRouter>
            </CartProvider>
            </PromotionProvider>
        </AuthProvider>
        </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
