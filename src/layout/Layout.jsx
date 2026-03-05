import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
    const { pathname } = useLocation();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
            <Navbar />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
            <button
                className={`scroll-to-top${showScrollTop ? " visible" : ""}`}
                onClick={scrollToTop}
                aria-label="Remonter en haut de la page"
                title="Haut de page"
            >
                &#8593;
            </button>
        </>
    );
};

export default Layout;
