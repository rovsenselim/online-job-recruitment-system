import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import EmployeeNavbar from './navbar/EmployeeNavbar';
import EmployerNavbar from './navbar/EmployerNavbar';

const Layout = () => {
    let location = useLocation();

    // Yolun içində employer varsa employer navbar göstər
    let isEmployer = location.pathname.includes("employer");
    let isEmployee = location.pathname.includes("employee");

    return (
        <div>
            {isEmployer ? <EmployerNavbar /> : <EmployeeNavbar />}
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
