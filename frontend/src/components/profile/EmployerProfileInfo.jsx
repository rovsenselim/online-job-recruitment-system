// src/components/profile/EmployerProfileInfo.jsx
import React, { useEffect, useRef, useState } from "react";
import "./EmployerProfileInfo.css";
import { FaCamera, FaEdit, FaSignOutAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { getEmployerProfile, uploadEmployerLogo } from "../../services/profileAPI";
import { toast } from "react-toastify";

import EditEmployerProfileModal from "./EditEmployerProfileModal";
import AddJobModal from "./AddJobModal";

function EmployerProfileInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const [profile, setProfile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);
    const [jobList, setJobList] = useState([]);

    const imageInputRef = useRef(null);

    useEffect(() => {
        if (user?.id) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = () => {
        getEmployerProfile(user.id)
            .then((res) => {
                setProfile(res.data.profile);
                setJobList(res.data.profile?.jobs || []);
            })
            .catch((err) => {
                toast.error("Profil alınmadı");
                console.error("Profil alınmadı:", err);
            });
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("logo", file);

            try {
                await uploadEmployerLogo(user.id, formData);
                toast.success("Logo yükləndi");
                loadProfile();
            } catch (err) {
                toast.error("Logo əlavə olunarkən xəta baş verdi");
                console.error("Logo yükləmə xətası:", err);
            }
        }
    };

    const handleNewJob = (jobData) => {
        setJobList((prev) => [...prev, jobData]);
        toast.success("Yeni elan əlavə olundu");
    };

    const handleDeleteJob = (index) => {
        const filtered = jobList.filter((_, i) => i !== index);
        setJobList(filtered);
        toast.info("Elan silindi");
    };

    // Redaktə üçün modal göstərmək və cari redaktə ediləcək elan məlumatını ötürmək üçün
    const [editingJobIndex, setEditingJobIndex] = useState(null);
    const [editingJobData, setEditingJobData] = useState(null);

    const handleEditJob = (index) => {
        setEditingJobIndex(index);
        setEditingJobData(jobList[index]);
        setShowJobModal(true);
    };

    // Redaktə tamamlandıqda iş elanını yeniləmək üçün
    const handleUpdateJob = (updatedJob) => {
        setJobList((prev) =>
            prev.map((job, idx) => (idx === editingJobIndex ? updatedJob : job))
        );
        toast.success("Elan redaktə olundu");
        setEditingJobIndex(null);
        setEditingJobData(null);
        setShowJobModal(false);
    };

    // Yeni elan əlavə edilərkən və redaktə edilərkən istifadə olunan modalun bağlanması
    const handleCloseJobModal = () => {
        setShowJobModal(false);
        setEditingJobIndex(null);
        setEditingJobData(null);
    };

    return (
        <div className="employer-profile-page">
            <aside className="profile-sidebar">
                <div className="profile-photo-wrapper">
                    <img
                        src={profile?.logo || "/default-company.png"}
                        alt="Şirkət loqosu"
                        className="profile-photo"
                    />
                    <button
                        className="upload-icon"
                        onClick={() => imageInputRef.current.click()}
                        title="Profil şəklini dəyiş"
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

                <h2 className="name">{profile?.companyName || "Şirkət adı yoxdur"}</h2>
                <p className="position">{profile?.industry || "Sektor yoxdur"}</p>

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
                    <div className="info-card">
                        <span className="label">Vebsayt</span>
                        <span className="value">{profile?.website || "Yoxdur"}</span>
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
                    <h3 className="card-title">Haqqımızda</h3>
                    <p>{profile?.description || "Haqqımızda məlumat yoxdur."}</p>
                </section>

                <section className="card-section">
                    <h3 className="card-title">İş Yerləri və Komanda</h3>
                    <ul>
                        <li>Əməkdaş sayı: {profile?.teamSize || "Naməlum"}</li>
                        <li>Remote və ofis rejimli iş imkanı</li>
                    </ul>
                </section>

                <section className="card-section">
                    <div className="card-header">
                        <h3 className="card-title">Elanlar</h3>
                        <button className="add-btn" onClick={() => setShowJobModal(true)}>
                            <FaPlus /> Elan yerləşdir
                        </button>
                    </div>

                    <div className="job-list">
                        {jobList.length === 0 && <p>Elan tapılmadı.</p>}
                        {jobList.map((job, index) => (
                            <div className="job-card" key={index}>
                                {job.imagePreview && (
                                    <img
                                        src={job.imagePreview}
                                        alt="Elan şəkli"
                                        className="job-image"
                                    />
                                )}
                                <div className="job-details">
                                    <h4>{job.title}</h4>
                                    <small>Maaş: {job.salary} AZN</small>
                                    <p>{job.description}</p>
                                    <div className="cv-actions">
                                        <button onClick={() => handleEditJob(index)} title="Redaktə et">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDeleteJob(index)} title="Sil">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {showEditModal && (
                <EditEmployerProfileModal
                    open={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    profile={profile}
                    onSave={loadProfile}
                    userId={user.id}
                />
            )}

            {showJobModal && (
                <AddJobModal
                    open={showJobModal}
                    onClose={handleCloseJobModal}
                    onAdd={handleNewJob}
                    onUpdate={handleUpdateJob}
                    editingJob={editingJobData}
                />
            )}
        </div>
    );
}

export default EmployerProfileInfo;