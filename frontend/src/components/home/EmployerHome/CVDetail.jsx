// src/pages/CVDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./CVDetail.css";

const CVDetailPage = () => {
    let { filename } = useParams();

    return (
        <div className="cv-detail-container">
            <h2>CV Detail</h2>
            <div className="cv-frame">
                <iframe
                    src={`http://localhost:5000/uploads/cvs/${filename}`}
                    title="CV Preview"
                    width="100%"
                    height="600px"
                />
            </div>
        </div>
    );
};

export default CVDetailPage;
