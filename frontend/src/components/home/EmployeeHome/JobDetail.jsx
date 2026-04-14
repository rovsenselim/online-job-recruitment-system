import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetail.css";

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(response.data);
            } catch (err) {
                setError("Job tapılmadı və ya serverdə xəta baş verdi");
            }
        };

        fetchJob();
    }, [id]);

    if (error) return <div className="loading">{error}</div>;
    if (!job) return <div className="loading">Yüklənir...</div>;

    return (
        <div className="detail-wrapper">
            <div className="detail-card">
                <header className="detail-header">
                    <h2>{job.title}</h2>
                    <p className="detail-company">{job.company}</p>
                </header>

                <div className="detail-grid">
                    <div className="detail-box">
                        <strong>Əlavə edən ID:</strong>
                        <br />
                        {job.postedBy}
                    </div>

                    <div className="detail-box">
                        <strong>Əlavə olundu:</strong>
                        <br />
                        {new Date(job.createdAt).toLocaleDateString()}
                    </div>

                    <div className="detail-box">
                        <strong>Yerləşmə:</strong>
                        <br />
                        {job.location || "Məlumat yoxdur"}
                    </div>

                    <div className="detail-box">
                        <strong>Kateqoriya:</strong>
                        <br />
                        {job.category || "Məlumat yoxdur"}
                    </div>

                    <div className="detail-box">
                        <strong>İş növü:</strong>
                        <br />
                        {job.jobType || "Məlumat yoxdur"}
                    </div>

                    <div className="detail-box">
                        <strong>Əmək haqqı:</strong>
                        <br />
                        {job.salary ? `${job.salary} AZN` : "Məlumat yoxdur"}
                    </div>
                </div>

                <div className="description-box">
                    <h4>Təsvir</h4>
                    <p>{job.description}</p>
                </div>

                <div className="detail-actions">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        Geri
                    </button>

                </div>
            </div>
        </div>
    );
};

export default JobDetail;
