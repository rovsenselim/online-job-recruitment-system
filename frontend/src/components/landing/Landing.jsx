import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
    return (
        <div className="app">
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/home" className="logo-landing">
                    JobQuest
                </Link>

                <Link to="/login">
                    <button className="login-btn">Login</button>
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Discover Your <span className="highlight">Dream Job</span> Today</h1>
                    <p>Thousands of trusted job listings, tailored just for you.</p>
                    <Link to="/register">
                        <button className="get-started">Get Started</button>
                    </Link>
                </div>
                <div className="hero-visual">
                    <svg className="hero-svg" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="300" cy="200" r="180" fill="url(#gradient)" />
                        <defs>
                            <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.8">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#4f46e5" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="hero-svg-text">
                        <h2>Welcome to JobQuest</h2>
                        <p>Your career journey starts here.</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Smart Search</h3>
                    <p>Filter jobs based on your skills and preferences.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🏢</div>
                    <h3>Trusted Employers</h3>
                    <p>Work with top-rated verified companies worldwide.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Real-time Alerts</h3>
                    <p>Be the first to apply for your desired job openings.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="social-icons">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                </div>
                <p>&copy; 2025 JobQuest. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Landing;
