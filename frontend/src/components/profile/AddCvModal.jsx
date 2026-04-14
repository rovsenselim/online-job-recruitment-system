import React, { useState } from "react";
import "./AddCVModal.css";

function AddCVModal({ open, onClose, onSave }) {
    const [fullname, setFullname] = useState("");
    const [profession, setProfession] = useState("");
    const [cvFile, setCvFile] = useState(null);

    if (!open) return null;

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cvFile) {
            alert("Zəhmət olmasa, CV faylı seçin.");
            return;
        }

        const newCV = {
            fullname,
            profession,
            file: cvFile,
        };

        onSave(newCV);

        setFullname("");
        setProfession("");
        setCvFile(null);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>CV əlavə et</h2>
                <form onSubmit={handleSubmit} className="cv-form">
                    <label>
                        Tam Ad:
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Tam adınızı daxil edin"
                        />
                    </label>
                    <label>
                        Peşə:
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="Peşənizi daxil edin"
                        />
                    </label>
                    <label>
                        CV faylı (.pdf):
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit" className="btn btn-save">Yadda saxla</button>
                        <button type="button" className="btn btn-cancel" onClick={onClose}>Ləğv et</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCVModal;
