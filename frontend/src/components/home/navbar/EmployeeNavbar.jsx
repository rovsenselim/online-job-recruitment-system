import React from "react";
import "./EmployeeNavbar.css";
import { Link } from "react-router-dom";
import {
    FaHome,
    FaClipboardList,
    FaInfoCircle,
    FaPhoneAlt,
    FaUserCircle,
    FaBuilding,
    FaHeart,
} from "react-icons/fa";

function EmployeeNavbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/employee-home">Hire<span>Connect</span></Link>
            </div>

            <ul className="navlist">
                <li><Link to="/employee-home"><FaHome /><span>Home</span></Link></li>
                <li><Link to="/jobs"><FaClipboardList /><span>Jobs</span></Link></li>
                <li><Link to="/companies"><FaBuilding /><span>Companies</span></Link></li>
                <li><Link to="/blog"><FaInfoCircle /><span>Blog</span></Link></li>
                <li><Link to="/about"><FaInfoCircle /><span>About</span></Link></li>
                <li><Link to="/contact"><FaPhoneAlt /><span>Contact</span></Link></li>
            </ul>

            <div className="actions">
                <Link to="/favorites" className="icon-btn"><FaHeart /><span>Favorites</span></Link>
                <Link to="/profile/employee" className="icon-btn profile"><FaUserCircle /><span>Profile</span></Link>
            </div>
        </nav>
    );
}

export default EmployeeNavbar;
