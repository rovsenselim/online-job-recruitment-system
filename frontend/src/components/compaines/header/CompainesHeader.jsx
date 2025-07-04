import React from "react";
import "./CompainesHeader.css";

const CompainesHeader = () => {
    return (
        <header className="companies-hero">
            <div className="overlay" />
            <div className="companies-container">
                <h1 className="companies-title">Discover Top Hiring Companies</h1>
                <p className="companies-subtitle">
                    Explore trusted employers hiring across various industries and locations. Start your journey with companies that value talent like yours.
                </p>
            </div>
        </header>
    );
};

export default CompainesHeader;
