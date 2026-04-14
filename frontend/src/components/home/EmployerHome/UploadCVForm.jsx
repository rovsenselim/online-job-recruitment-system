// components/UploadCVForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UploadCVForm = () => {
    const [fullname, setFullname] = useState("");
    const [profession, setProfession] = useState("");
    const [cvFile, setCvFile] = useState(null);

    const user = useSelector((state) => state.user.user);
    const token = user?.token;
    const userId = user?.id || user?._id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullname || !profession || !cvFile) {
            return alert("Bütün sahələri doldur!");
        }

        let formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("profession", profession);
        formData.append("cv", cvFile);

        try {
            let res = await axios.post(
                `http://localhost:5000/api/profile/employer/upload-cv/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("✅ CV uğurla yükləndi!");
            console.log(res.data);
        } catch (err) {
            console.error("❌ CV yüklənmədi:", err.response?.data?.message || err.message);
            alert("CV yüklənmədi");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
            <input
                type="text"
                placeholder="Full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
            />
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files[0])}
                required
            />
            <button type="submit">CV Yüklə</button>
        </form>
    );
};

export default UploadCVForm;
