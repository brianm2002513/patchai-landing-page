import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Footer from "./LayoutPanel";

function NavFooterLayout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.refreshLayout) window.refreshLayout();
        else ScrollTrigger.refresh();
    }, [location]);

    return (
        <>
            <div className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <Navbar />
                <div className="relative top-16 md:top-20 flex-1">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default NavFooterLayout