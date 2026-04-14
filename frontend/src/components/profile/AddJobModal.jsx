import React, { useState, useEffect } from "react";
import "./AddJobModal.css";

function AddJobModal({ open, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        salary: "",
        location: "",
        jobType: "",
        category: "",
    });

    useEffect(() => {
        if (!open) {
            // Modal bağlandıqda formu sıfırla
            setFormData({
                title: "",
                description: "",
                salary: "",
                location: "",
                jobType: "",
                category: "",
            });
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Job</h2>
                <form onSubmit={handleSubmit} className="job-form">
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </label>

                    <label>
                        Salary
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Location
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Job Type
                        <input
                            type="text"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Category
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="form-buttons">
                        <button type="submit" className="save-btn">Add Job</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddJobModal;
