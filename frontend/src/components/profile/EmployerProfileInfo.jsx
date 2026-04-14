import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import API from "../../services/api";
import EditEmployerProfileModal from "./EditEmployerProfileModal";
import AddJobModal from "./AddJobModal";
import EditJobModal from "./EditJobModal";
import "./EmployerProfileInfo.css";

function EmployerProfileInfo() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddJobOpen, setIsAddJobOpen] = useState(false);
    const [editJobModalOpen, setEditJobModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    // --- Fetch employer profile ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await API.get("/profile/employer/me");

                if (!res?.data?.profile) {
                    toast.error("Profil tapılmadı və ya daxil olmamısınız");
                    setProfile(null);
                } else {
                    setProfile(res.data.profile);
                    setJobs(res.data.profile.jobPosts || []);
                }
            } catch (err) {
                console.error(err);
                toast.error("Profil tapılmadı və ya daxil olmamısınız");
                setProfile(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- Logout ---
    const handleLogout = () => {
        document.cookie = "token=; Max-Age=0";
        navigate("/login");
    };

    // --- Profile picture upload ---
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !profile?._id) return;

        const formData = new FormData();
        formData.append("photo", file);

        try {
            const res = await API.post(`/profile/employer/upload-photo/${profile._id}`, formData);
            setProfile((prev) => ({ ...prev, profilePic: res.data.profilePic }));
            toast.success("Şəkil yükləndi");
        } catch (err) {
            console.error("Şəkil yüklənmədi", err);
            toast.error("Şəkil yüklənmədi");
        }
    };

    // --- Profile update ---
    const handleProfileSave = async (updatedData) => {
        try {
            const res = await API.put(`/profile/employer/${profile._id}`, updatedData);
            setProfile(res.data.profile);
            toast.success("Profil yeniləndi");
        } catch (err) {
            console.error("Profil yenilənmədi", err);
            toast.error("Profil yenilənmədi");
        } finally {
            setIsEditOpen(false);
        }
    };

    // --- Add Job ---
    const handleAddJob = async (jobData) => {
        try {
            if (!profile?._id) {
                toast.error("İstifadəçi ID tapılmadı");
                return;
            }

            const res = await API.post(`/profile/employer/add-job/${profile._id}`, jobData);
            setJobs((prev) => [...prev, res.data.job]);
            toast.success("Elan əlavə olundu");
        } catch (err) {
            console.error("Elan əlavə edilə bilmədi", err);
            toast.error("Elan əlavə edilə bilmədi");
        } finally {
            setIsAddJobOpen(false);
        }
    };

    // --- Delete Job ---
    const handleDeleteJob = async (jobId) => {
        try {
            if (!profile?._id) return;

            await API.delete(`/profile/employer/delete-job/${profile._id}/${jobId}`);
            setJobs((prev) => prev.filter((job) => job._id !== jobId));
            toast.success("Elan silindi");
        } catch (err) {
            console.error("Elan silinmədi", err);
            toast.error("Elan silinərkən xəta baş verdi");
        }
    };

    // --- Edit Job ---
    const handleEditJobClick = (job) => {
        setSelectedJob(job);
        setEditJobModalOpen(true);
    };

    const handleEditJobSave = async (updatedData) => {
        if (!selectedJob) return;

        try {
            const res = await API.put(
                `/profile/employer/edit-job/${profile._id}/${selectedJob._id}`,
                updatedData
            );

            setJobs((prev) =>
                prev.map((job) => (job._id === selectedJob._id ? res.data.job : job))
            );
            toast.success("Elan yeniləndi");
        } catch (err) {
            console.error("Elan yenilənmədi", err);
            toast.error("Elan yenilənmədi");
        } finally {
            setEditJobModalOpen(false);
        }
    };

    if (isLoading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Yüklənir...</p>;
    if (!profile) return <p style={{ textAlign: "center", marginTop: "50px" }}>Profil məlumatı mövcud deyil</p>;

    return (
        <div className="profile-container">
            {/* Sidebar */}
            <aside className="profile-sidebar">
                <div className="profile-photo-wrapper">
                    {profile.profilePic ? (
                        <img
                            src={`http://localhost:5000/uploads/profile-pics/${profile.profilePic}`}
                            alt="Profile"
                            className="profile-photo"
                        />
                    ) : (
                        <div className="profile-photo-empty">🏢</div>
                    )}
                    <button className="photo-upload-icon" onClick={() => imageRef.current.click()}>+</button>
                    <input
                        ref={imageRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>

                <h2 className="profile-name">{profile.companyName || "Company Name"}</h2>

                <div className="info-boxes">
                    <div className="info-box">
                        <span className="info-label">Location</span>
                        <span>{profile.location || "Empty"}</span>
                    </div>
                    <div className="info-box">
                        <span className="info-label">Phone</span>
                        <span>{profile.phone || "Empty"}</span>
                    </div>
                    <div className="info-box">
                        <span className="info-label">Email</span>
                        <span>{profile.email || "Empty"}</span>
                    </div>
                </div>

                <button className="btn-edit-profile" onClick={() => setIsEditOpen(true)}>Edit Profile</button>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </aside>

            {/* Main content */}
            <main className="profile-main-content">
                <div className="about-box">
                    <h2 className="about-title">About Us</h2>
                    <p className={`about-text ${!profile.description?.trim() && "empty"}`}>
                        {profile.description || "Empty"}
                    </p>
                </div>

                <div className="job-section">
                    <div className="job-header">
                        <h2>Elanlar</h2>
                        <button className="btn-add-cv" onClick={() => setIsAddJobOpen(true)}>+ Add Job</button>
                    </div>
                    <div className="job-list">
                        {jobs.length === 0 ? (
                            <p style={{ fontStyle: "italic", color: "gray" }}>Elan yoxdur</p>
                        ) : (
                            jobs.map((job) => (
                                <div key={job._id} className="job-card">
                                    <div className="job-info">
                                        <h3>{job.title}</h3>
                                        <p><strong>Company:</strong> {profile.companyName || "—"}</p>
                                        <p><strong>Location:</strong> {job.location || "Remote"}</p>
                                        <p><strong>Salary:</strong> {job.salary || "—"}</p>
                                        <p>{job.description}</p>
                                    </div>
                                    <div className="job-card-actions">
                                        <button onClick={() => handleEditJobClick(job)}><FaEdit /></button>
                                        <button onClick={() => handleDeleteJob(job._id)}><FaTrash /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <EditEmployerProfileModal
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                profile={profile}
                onSave={handleProfileSave}
                userId={profile._id}
            />

            <AddJobModal
                open={isAddJobOpen}
                onClose={() => setIsAddJobOpen(false)}
                onSave={handleAddJob}
            />

            <EditJobModal
                open={editJobModalOpen}
                job={selectedJob}
                onClose={() => setEditJobModalOpen(false)}
                onSave={handleEditJobSave}
            />
        </div>
    );
}

export default EmployerProfileInfo;
