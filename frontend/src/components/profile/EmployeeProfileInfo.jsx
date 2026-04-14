import React, { useRef, useState, useEffect } from "react";
import axios from "axios"; // 🔹 Axios burada import olunmalıdır
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
    getMyEmployeeProfile,
    updateEmployeeProfile,
    uploadCV,
    deleteCV,
} from "../../services/profileService";
import AddCVModal from "./AddCvModal";
import EditEmployeeProfileModal from "./EditEmployeeProfileModal";
import "./EmployeeProfileInfo.css";

function EmployeeProfileInfo({ profile: initialProfile, setProfile, token, onLogout }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);
    const imageRef = useRef(null);

    const [profileData, setProfileData] = useState(initialProfile);

    // ================= PROFİLİ ÇƏK =================
    useEffect(() => {
        const fetchProfile = async () => {
            if (initialProfile) {
                setProfileData(initialProfile);
                setIsLoading(false);
                return;
            }

            try {
                const { data } = await getMyEmployeeProfile(token);
                setProfileData(data.profile);
                setProfile(data.profile);
            } catch (err) {
                console.error(err);
                toast.error("Profil tapılmadı");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [initialProfile, token, setProfile]);

    // ================= PROFİL ŞƏKLİ YÜKLƏ – DƏYİŞİB DÜZGÜN VERSİYA =================
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !profileData?._id) return;

        const formData = new FormData();
        formData.append("profilePic", file); // 🔹 Key mütləq "profilePic"

        try {
            const res = await axios.post(
                "http://localhost:5000/api/profile/employee/me/profile-pic",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Content-Type təyin etmə! Axios özü təyin edəcək
                    },
                }
            );

            setProfileData((prev) => ({
                ...prev,
                profilePic: res.data.profilePic,
            }));

            setProfile((prev) => ({
                ...prev,
                profilePic: res.data.profilePic,
            }));

            toast.success("Profil şəkli yükləndi");
        } catch (err) {
            console.error("Şəkil yüklənmədi", err);
            toast.error("Şəkil yüklənmədi");
        }
    };

    // ================= PROFİL REDAKTƏ =================
    const handleProfileSave = async (updatedData) => {
        try {
            const { data } = await updateEmployeeProfile(updatedData, token);
            setProfileData(data.profile);
            setProfile(data.profile);
            toast.success("Profil yeniləndi");
        } catch (err) {
            console.error(err);
            toast.error("Profil yenilənmədi");
        } finally {
            setIsEditOpen(false);
        }
    };

    // ================= CV ƏLAVƏ ET =================
    const handleAddCV = async (newCV) => {
        const formData = new FormData();
        formData.append("cv", newCV.file);
        formData.append("fullname", newCV.fullname);
        formData.append("profession", newCV.profession);

        try {
            const { data } = await uploadCV(formData, token);
            setProfileData((prev) => ({ ...prev, cvs: data.cvs }));
            setProfile((prev) => ({ ...prev, cvs: data.cvs }));
            toast.success("CV əlavə olundu");
        } catch (err) {
            console.error(err);
            toast.error("CV əlavə olunmadı");
        }
    };

    // ================= CV SİL =================
    const handleDeleteCV = async (filename) => {
        try {
            await deleteCV(filename, token);
            setProfileData((prev) => ({
                ...prev,
                cvs: prev.cvs.filter((cv) => cv.filename !== filename),
            }));
            setProfile((prev) => ({
                ...prev,
                cvs: prev.cvs.filter((cv) => cv.filename !== filename),
            }));
            toast.success("CV silindi");
        } catch (err) {
            console.error(err);
            toast.error("CV silinmədi");
        }
    };

    if (isLoading) return <p className="center">Yüklənir...</p>;
    if (!profileData) return <p className="center">Profil tapılmadı</p>;

    return (
        <div className="profile-container">
            <aside className="profile-sidebar">
                <div className="profile-photo-wrapper">
                    <img
                        src={
                            profileData.profilePic
                                ? `http://localhost:5000${profileData.profilePic}`
                                : "/default-profile.png"
                        }
                        alt="Profile"
                        className="profile-photo"
                        onError={(e) => (e.target.src = "/default-profile.png")}
                    />

                    <button
                        className="photo-upload-icon"
                        onClick={() => imageRef.current.click()}
                    >
                        +
                    </button>

                    <input
                        type="file"
                        ref={imageRef}
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </div>

                <h2 className="profile-name">
                    {profileData.fullname || "Məlumat yoxdur"}
                </h2>

                <div className="info-boxes">
                    <div className="info-box">
                        <span className="info-label">Email</span>
                        <span>{profileData.email || "Məlumat yoxdur"}</span>
                    </div>
                    <div className="info-box">
                        <span className="info-label">Peşə</span>
                        <span>{profileData.profession || "Məlumat yoxdur"}</span>
                    </div>
                    <div className="info-box">
                        <span className="info-label">Yaş</span>
                        <span>{profileData.age || "Məlumat yoxdur"}</span>
                    </div>
                    <div className="info-box">
                        <span className="info-label">Yer</span>
                        <span>{profileData.location || "Məlumat yoxdur"}</span>
                    </div>
                    <div className="info-box">
                        <span className="info-label">Telefon</span>
                        <span>{profileData.phone || "Məlumat yoxdur"}</span>
                    </div>
                </div>

                <button
                    className="btn-edit-profile"
                    onClick={() => setIsEditOpen(true)}
                >
                    Edit Profile
                </button>

                <button className="btn-logout" onClick={onLogout}>
                    Logout
                </button>
            </aside>

            <main className="profile-main-content">
                <div className="about-box">
                    <h2 className="about-title">Haqqında</h2>
                    <p className="about-text">
                        {profileData.description || "Məlumat yoxdur"}
                    </p>
                </div>

                <div className="cv-section">
                    <div className="cv-section-header">
                        <button
                            className="btn-add-cv"
                            onClick={() => setIsCVModalOpen(true)}
                        >
                            CV əlavə et
                        </button>
                    </div>

                    <div className="cv-grid">
                        {profileData.cvs?.length ? (
                            profileData.cvs.map((cv) => (
                                <div key={cv.filename} className="cv-card">
                                    <Link
                                        to={`/cv-detail/${encodeURIComponent(cv.filename)}`}
                                        className="cv-link"
                                    >
                                        <p className="cv-fullname">{cv.fullname}</p>
                                        <p className="cv-profession">{cv.profession}</p>
                                    </Link>

                                    <button
                                        className="delete-cv-btn"
                                        onClick={() => handleDeleteCV(cv.filename)}
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="center">Hələ CV yoxdur</p>
                        )}
                    </div>
                </div>
            </main>

            <AddCVModal
                open={isCVModalOpen}
                onClose={() => setIsCVModalOpen(false)}
                onSave={handleAddCV}
            />

            <EditEmployeeProfileModal
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                profile={profileData}
                onSave={handleProfileSave}
            />
        </div>
    );
}

export default EmployeeProfileInfo;
