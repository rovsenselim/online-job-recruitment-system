import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobDetail.css";

const JobDetails = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    let [job, setJob] = useState(null);
    let [employer, setEmployer] = useState(null);

    useEffect(() => {
        let fetchJob = async () => {
            try {
                let res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(res.data.job);

                // 🟡 Elanı yerləşdirən işverənin e-mailini tapmaq üçün:
                let userId = res.data.job.postedBy;
                let userRes = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
                setEmployer(userRes.data.user);
            } catch (err) {
                console.error("❌ Error fetching job:", err);
            }
        };
        fetchJob();
    }, [id]);

    if (!job) return <p className="loading">Loading job details...</p>;

    return (
        <div className="detail-wrapper">
            <div className="detail-card">
                <div className="detail-header">
                    <h2>{job.title}</h2>
                    <p className="detail-company">{job.company}</p>
                </div>

                <div className="detail-grid">
                    <div className="detail-box"><strong>Location:</strong> {job.location}</div>
                    <div className="detail-box"><strong>Category:</strong> {job.category}</div>
                    <div className="detail-box"><strong>Type:</strong> {job.jobType}</div>
                    <div className="detail-box"><strong>Salary:</strong> {job.salary} AZN</div>
                    <div className="detail-box"><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</div>
                </div>

                <div className="description-box">
                    <h4>Job Description</h4>
                    <p>{job.description || "No description provided."}</p>
                </div>

                {employer && (
                    <div className="employer-box">
                        <p><strong>Employer Email:</strong> {employer.email}</p>
                    </div>
                )}

                <div className="detail-actions">
                    <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
