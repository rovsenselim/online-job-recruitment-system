import React from "react";
import "./Footer.css";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-top">
                <div className="footer-col">
                    <h3>JobRecruit</h3>
                    <p>
                        The smarter way to find the right job or candidate. Join thousands
                        of job seekers and employers on our platform.
                    </p>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaYoutube /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Jobs</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>For Job Seekers</h4>
                    <ul>
                        <li><a href="#">Browse Jobs</a></li>
                        <li><a href="#">Upload CV</a></li>
                        <li><a href="#">Job Alerts</a></li>
                        <li><a href="#">Career Advice</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>For Employers</h4>
                    <ul>
                        <li><a href="#">Post a Job</a></li>
                        <li><a href="#">Search Candidates</a></li>
                        <li><a href="#">Plans & Pricing</a></li>
                        <li><a href="#">Employer Login</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} JobRecruit. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
