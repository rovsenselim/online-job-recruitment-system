// src/components/profile/EmployeeProfileInfo.jsx

import React, { useEffect, useRef, useState } from "react";
import "./EmployerProfileInfo.css";
import { FaCamera, FaEdit, FaSignOutAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import {
    getEmployeeProfile,
    uploadEmployeePhoto,
    uploadCV
} from "../../services/profileAPI";
import { toast } from "react-toastify";
import EditEmployeeProfileModal from "./EditEmployeeProfileModal";

function EmployeeProfileInfo() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { user } = useSelector((state) => state.user); // Redux içindəki user
    let [profile, setProfile] = useState(null);
    let [showEditModal, setShowEditModal] = useState(false);
    let [cvList, setCvList] = useState([]);

    let imageInputRef = useRef(null);

    useEffect(() => {
        if (user?.id) {
            loadProfile();
        }
    }, [user]);

    let loadProfile = async () => {
        try {
            let res = await getEmployeeProfile(user.id);
            setProfile(res.profile); // ⚠️ burada res.data.profile yox, res.profile
            setCvList(res.profile?.cvs || []);
        } catch (err) {
            console.error("Profil yüklənmədi:", err);
            toast.error("Profil tapılmadı");
        }
    };

    let handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    let handleImageChange = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append("photo", file);

            try {
                await uploadEmployeePhoto(user.id, formData);
                toast.success("Şəkil yükləndi");
                loadProfile();
            } catch (err) {
                toast.error("Şəkil əlavə olunarkən xəta baş verdi");
                console.error("Şəkil yüklənmə xətası:", err);
            }
        }
    };

    let handleCVUpload = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append("cv", file);

            try {
                let res = await uploadCV(user.id, formData);
                toast.success("CV uğurla yükləndi");
                setCvList(res.cvs); // ⚠️ Düz mapping
                loadProfile();
            } catch (err) {
                toast.error("CV yüklənərkən xəta baş verdi");
                console.error("CV upload error:", err);
            }
        }
    };

    return (
        <div className="employer-profile-page">
            <aside className="profile-sidebar">
                <div className="profile-photo-wrapper">
                    <img
                        src={
                            profile?.image
                                ? `http://localhost:5000/uploads/profile-pics/${profile.image}`
                                : "/default-avatar.png"
                        }
                        alt="Profil şəkli"
                        className="profile-photo"
                    />
                    <button
                        className="upload-icon"
                        onClick={() => imageInputRef.current.click()}
                    >
                        <FaCamera />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>

                <h2 className="name">{profile?.fullname || "Ad soyad yoxdur"}</h2>
                <p className="position">{profile?.profession || "Peşə yoxdur"}</p>

                <div className="profile-info-cards">
                    <div className="info-card">
                        <span className="label">Email</span>
                        <span className="value">{user?.email}</span>
                    </div>
                    <div className="info-card">
                        <span className="label">Telefon</span>
                        <span className="value">{profile?.phone || "Yoxdur"}</span>
                    </div>
                    <div className="info-card">
                        <span className="label">Şəhər</span>
                        <span className="value">{profile?.location || "Yoxdur"}</span>
                    </div>
                </div>

                <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>
                    <FaEdit /> Profili redaktə et
                </button>

                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Çıxış
                </button>
            </aside>

            <main className="profile-main-content">
                <section className="card-section">
                    <h3 className="card-title">Haqqımda</h3>
                    <p>{profile?.about || "Haqqımda məlumat yoxdur."}</p>
                </section>

                <section className="card-section">
                    <div className="card-header">
                        <h3 className="card-title">CV-lər</h3>
                        <label className="add-btn">
                            <FaPlus /> CV əlavə et
                            <input
                                type="file"
                                accept=".pdf"
                                style={{ display: "none" }}
                                onChange={handleCVUpload}
                            />
                        </label>
                    </div>

                    <div className="job-list">
                        {cvList.map((cv, index) => (
                            <div className="job-card" key={index}>
                                <img
                                    src="/pdf-icon.png"
                                    alt="CV PDF"
                                    className="job-image"
                                />
                                <div className="job-details">
                                    <h4>{profile?.fullname || "Naməlum istifadəçi"}</h4>
                                    <small>Email: {user?.email}</small>
                                    <p>CV: {cv}</p>
                                    <a
                                        href={`http://localhost:5000/uploads/cvs/${cv}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="download-link"
                                    >
                                        Yüklə
                                    </a>
                                </div>
                                <div className="cv-actions">
                                    <button onClick={() => {
                                        toast.info("CV silmək üçün backenddə DELETE endpoint çağırılmalıdır");
                                    }}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {showEditModal && (
                <EditEmployeeProfileModal
                    open={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    profile={profile}
                    onSave={loadProfile}
                    userId={user?.id}
                />
            )}
        </div>
    );
}

export default EmployeeProfileInfo;
