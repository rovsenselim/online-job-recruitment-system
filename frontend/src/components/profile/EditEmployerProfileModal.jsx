import React, { useState } from "react";
import "./EditEmployeeProfileModal.css";

function EditEmployeeProfileModal({ open, onClose, profile, onSave }) {
    if (!open) return null;

    const [fullname, setFullname] = useState(profile.fullname || "");
    const [profession, setProfession] = useState(profile.profession || "");
    const [age, setAge] = useState(profile.age || "");
    const [phone, setPhone] = useState(profile.phone || "");
    const [location, setLocation] = useState(profile.location || "");
    const [email, setEmail] = useState(profile.email || "");
    const [description, setDescription] = useState(profile.description || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ fullname, profession, age, phone, location, email, description });
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <label>
                        Full Name:
                        <input
                            type="text"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Profession:
                        <input
                            type="text"
                            value={profession}
                            onChange={e => setProfession(e.target.value)}
                        />
                    </label>
                    <label>
                        Age:
                        <input
                            type="number"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            min="0"
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={4}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
}

export default EditEmployeeProfileModal;
