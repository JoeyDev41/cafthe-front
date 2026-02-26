import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
            <Navbar />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
