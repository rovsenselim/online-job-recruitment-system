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
                    <h1>Find Your Dream Job with Ease</h1>
                    <p>Explore thousands of job opportunities from trusted employers.</p>
                    <Link to="/register">
                        <button className="get-started">Get Started</button>
                    </Link>
                </div>
                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b2"
                        alt="Job Hunt"
                    />
                </div>
            </section>

            {/* Feature Section */}
            <section className="features">
                <div className="feature-card">
                    <h3>Smart Search</h3>
                    <p>Filter jobs based on your skills and preferences.</p>
                </div>
                <div className="feature-card">
                    <h3>Trusted Employers</h3>
                    <p>Work with top-rated verified companies worldwide.</p>
                </div>
                <div className="feature-card">
                    <h3>Real-time Alerts</h3>
                    <p>Be the first to apply for your desired job openings.</p>
                </div>
            </section>


            {/* Footer */}
            <footer className="footer">
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
                <p>&copy; 2025 JobQuest. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Landing;
