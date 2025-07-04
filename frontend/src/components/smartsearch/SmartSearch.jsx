import React from "react";
import "./SmartSearch.css";

const SmartSearch = () => {
    return (
        <section className="smart-section">
            <h2 className="smart-main-title">A smarter way to search for jobs</h2>

            <div className="smart-part">
                <div className="smart-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfb8R-j3nqCihFSitiXGhhO-bx6qLjk9R7xA&s" alt="Fast Job Matching" />
                </div>
                <div className="smart-text">
                    <h3>Fast Job Matching</h3>
                    <p>Quickly find jobs that match your experience, skills, and career goals. We use advanced matching algorithms to ensure you see the most relevant roles — no endless scrolling required.</p>

                </div>
            </div>

            <div className="smart-part reverse">
                <div className="smart-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuj9rPrtQ8TEFfX8HIfsTo2CzZKo6M9umTZw&s" alt="Personalized Filters" />
                </div>
                <div className="smart-text">
                    <h3>Personalized Filters</h3>
                    <p>Take control of your job search by customizing filters like job type, salary range, location, and preferred companies. Save your preferences for faster future searches.</p>
                </div>
            </div>

            <div className="smart-part">
                <div className="smart-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4qyBhW_Dx_-KTCUIWeicUDbiAVdsbgauK2A&s" alt="One-click Applications" />
                </div>
                <div className="smart-text">
                    <h3>One-click Applications</h3>
                    <p>Speed up your job hunt with our one-click application system. Apply to multiple job postings instantly and keep track of every application from your dashboard.</p>
                </div>
            </div>
        </section>
    );
};

export default SmartSearch;
