import React from "react";

const JobCard = ({ job, onEdit, onDelete }) => {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 16,
                marginBottom: 16,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 6px 0", color: "#007bff" }}>{job.title}</h4>
                <p style={{ margin: 0, fontWeight: "600" }}>{job.company}</p>
                <p style={{ margin: "4px 0", color: "#555" }}>
                    Maaş: {job.salary} AZN | {job.jobType}
                </p>
                <p style={{ margin: 0, color: "#777" }}>Location: {job.location}</p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
                <button
                    onClick={onEdit}
                    style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: "#ffc107",
                        color: "#222",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobCard;
