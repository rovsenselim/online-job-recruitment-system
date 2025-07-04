import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import "./EmployerHomeContent.css";

const sliderImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReyNIDj8bTlhYZ7P3QnuilhcOOnNVQ0JKFyw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDEs6dV12u87BNcJcGtWY7Q4sNRXvjgL6_kkGxE5POh4ExMO-YdxKbyRwQjZGKV3s_BKI&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnJNOgme1kNR3joLyLKgc8vP95M7DJY1OJZTZd1T340VJEaC-IwrFol8FdJhqgg5A2AE&usqp=CAU",
];

const EmployerHomeContent = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = useSelector((state) => state.user.user?.token);
    const userId = useSelector((state) => state.user.user?.id || state.user.user?._id);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % sliderImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token || !userId) {
                setError("Giriş tələb olunur.");
                setProfile(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`http://localhost:5000/api/profile/employer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(res.data.profile);
            } catch (err) {
                setError(err.response?.data?.message || "Xəta baş verdi");
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, userId]);

    const cvs = Array.isArray(profile?.cvs) ? profile.cvs : [];

    return (
        <>
            {/* === HERO === */}
            <section className="hero-section" style={{ backgroundImage: `url(${sliderImages[currentImage]})` }}>
                <div className="overlay">
                    <div className="hero-content fade-in">
                        <h1>Hire The Best Talent for Your Company</h1>
                        <p>Explore a wide pool of professionals and connect with top talent.</p>
                        <input type="text" placeholder="Search CVs..." className="job-search" />
                    </div>
                </div>
            </section>

            {/* === FILTER + CARDS === */}
            <div className="homecard-container">
                {/* Filter Panel */}
                <aside className="filter-panel">
                    <div className="filter-wrapper">
                        <h3>Filter CVs</h3>
                        <button
                            className="reset-btn"
                            onClick={() => {
                                // Filtrləri sıfırlamaq üçün lazım olarsa state əlavə edə bilərsən
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                {/* Cards Panel */}
                <main className="cards-panel">
                    {loading && <p>Yüklənir...</p>}
                    {error && <p style={{ color: "red" }}>Xəta: {error}</p>}
                    {!loading && !error && cvs.length === 0 && <p>CV tapılmadı.</p>}

                    {!loading &&
                        !error &&
                        cvs.map((cv, idx) => (
                            <div className="home-job-card" key={idx}>
                                <div className="home-job-info-centered">
                                    <div className="job-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <h3 className="job-title">CV File #{idx + 1}</h3>
                                        <FaHeart className="heart-icon" />
                                    </div>
                                    <p className="job-company">Uploaded File</p>
                                    <p className="job-salary">
                                        <a href={`http://localhost:5000/uploads/cvs/${cv}`} target="_blank" rel="noreferrer noopener">
                                            {cv}
                                        </a>
                                    </p>
                                    <div className="job-tags">
                                        <span className="tag">CV</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </main>
            </div>
        </>
    );
};

export default EmployerHomeContent;
