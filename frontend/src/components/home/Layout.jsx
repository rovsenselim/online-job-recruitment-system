import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import EmployeeNavbar from "./navbar/EmployeeNavbar";
import EmployerNavbar from "./navbar/EmployerNavbar";
import { useSelector } from "react-redux";

const Layout = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <>
                <Outlet />
                <Footer />
            </>
        );
    }

    const path = location.pathname;

    const isEmployeeRoute =
        path.startsWith("/employee") ||
        path.includes("/profile/employee") ||
        path.includes("/jobs");

    const isEmployerRoute =
        path.startsWith("/employer") ||
        path.includes("/profile/employer") ||
        path.includes("/cv");

    return (
        <>
            {isEmployeeRoute && <EmployeeNavbar />}
            {isEmployerRoute && <EmployerNavbar />}

            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
