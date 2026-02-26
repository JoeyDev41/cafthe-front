import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContex.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { PromotionProvider } from "./context/PromotionContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Layout from "./layout/Layout.jsx";
import Loader from "./components/Loader.jsx";
import "./styles/index.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const The = lazy(() => import("./pages/The.jsx"));
const Cafe = lazy(() => import("./pages/Cafe.jsx"));
const Accessoires = lazy(() => import("./pages/Accessoires.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
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
const MentionsLegales = lazy(() => import("./pages/MentionsLegales.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const PlanDuSite = lazy(() => import("./pages/PlanDuSite.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
    return (
        <ThemeProvider>
        <AuthProvider>
            <PromotionProvider>
            <CartProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="the" element={<The />} />
                                <Route path="cafe" element={<Cafe />} />
                                <Route path="accessoires" element={<Accessoires />} />
                                <Route path="a-propos" element={<About />} />
                                <Route path="produits" element={<Products />} />
                                <Route path="vrac" element={<Navigate to="/produits?type_vente=poids" replace />} />
                                <Route path="produits/:id" element={<ProductDetails />} />
                                <Route path="login" element={<Login />} />
                                <Route path="inscription" element={<Register />} />
                                <Route path="compte" element={<Account />} />
                                <Route path="panier" element={<Cart />} />
                                <Route path="checkout" element={<Checkout />} />
                                <Route path="confirmation" element={<OrderConfirmation />} />
                                <Route path="cgv" element={<CGV />} />
                                <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
                                <Route path="mentions-legales" element={<MentionsLegales />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="mot-de-passe-oublie" element={<ForgotPassword />} />
                                <Route path="reinitialisation-mdp" element={<ResetPassword />} />
                                <Route path="plan-du-site" element={<PlanDuSite />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Suspense>
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
    );
}

export default App;
