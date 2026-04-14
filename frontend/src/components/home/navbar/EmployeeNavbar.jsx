import React, { useState } from "react";
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
    FaBars,
    FaTimes,
} from "react-icons/fa";

function EmployeeNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/employee-home" onClick={closeMenu}>
                    Hire<span>Connect</span>
                </Link>
            </div>

            <div className="burger" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={`navlist ${menuOpen ? "active" : ""}`}>
                <li>
                    <Link to="/employee-home" onClick={closeMenu}>
                        <FaHome />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/jobs" onClick={closeMenu}>
                        <FaClipboardList />
                        <span>Jobs</span>
                    </Link>
                </li>
                <li>
                    <Link to="/companies" onClick={closeMenu}>
                        <FaBuilding />
                        <span>Companies</span>
                    </Link>
                </li>
                <li>
                    <Link to="/blog" onClick={closeMenu}>
                        <FaInfoCircle />
                        <span>Blog</span>
                    </Link>
                </li>
                <li>
                    <Link to="/about" onClick={closeMenu}>
                        <FaInfoCircle />
                        <span>About</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contact" onClick={closeMenu}>
                        <FaPhoneAlt />
                        <span>Contact</span>
                    </Link>
                </li>
            </ul>

            <div className="actions">
                <Link to="/favorites" className="icon-btn" onClick={closeMenu}>
                    <FaHeart />
                    <span>Favorites</span>
                </Link>
                <Link to="/profile/employee" className="icon-btn profile" onClick={closeMenu}>
                    <FaUserCircle />
                    <span>Profile</span>
                </Link>
            </div>
        </nav>
    );
}

export default EmployeeNavbar;
