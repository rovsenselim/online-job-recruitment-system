import React, { useState, useEffect } from "react";
import "./EditEmployeeProfileModal.css";

function EditEmployeeProfileModal({ open, onClose, profile, onSave }) {
    const [formData, setFormData] = useState({
        fullname: "",
        profession: "",
        age: "",
        location: "",
        phone: "",
        email: "",
        description: ""
    });

    useEffect(() => {
        if (profile && open) {
            setFormData({
                fullname: profile.fullname || "",
                profession: profile.profession || "",
                age: profile.age || "",
                location: profile.location || "",
                phone: profile.phone || "",
                email: profile.email || "",
                description: profile.description || ""
            });
        }
    }, [profile, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Profili Redaktə Et</h2>

                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <label>
                        Ad Soyad
                        <input name="fullname" value={formData.fullname} onChange={handleChange} />
                    </label>

                    <label>
                        Peşə
                        <input name="profession" value={formData.profession} onChange={handleChange} />
                    </label>

                    <label>
                        Yaş
                        <input type="number" name="age" value={formData.age} onChange={handleChange} />
                    </label>

                    <label>
                        Yer
                        <input name="location" value={formData.location} onChange={handleChange} />
                    </label>

                    <label>
                        Telefon
                        <input name="phone" value={formData.phone} onChange={handleChange} />
                    </label>

                    <label>
                        Email
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>

                    <label>
                        Haqqımda
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit" className="btn-save">Yadda saxla</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Ləğv et</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployeeProfileModal;
