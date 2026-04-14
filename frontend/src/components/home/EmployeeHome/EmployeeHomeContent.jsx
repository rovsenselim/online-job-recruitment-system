import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getAllJobs } from "../../../services/jobAPI";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../redux/features/favoritesSlice";
import "./EmployeeHomeContent.css";

let sliderImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReyNIDj8bTlhYZ7P3QnuilhcOOnNVQ0JKFyw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDEs6dV12u87BNcJcGtWY7Q4sNRXvjgL6_kkGxE5POh4ExMO-YdxKbyRwQjZGKV3s_BKI&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnJNOgme1kNR3joLyLKgc8vP95M7DJY1OJZTZd1T340VJEaC-IwrFol8FdJhqgg5A2AE&usqp=CAU",
];

const EmployeeHomeContent = () => {
    let [currentImage, setCurrentImage] = useState(0);
    let [jobs, setJobs] = useState([]);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let favorites = useSelector((state) => state.favorites.favorites);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [filterJobType, setFilterJobType] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterLocation, setFilterLocation] = useState("All");
    const [filterCompany, setFilterCompany] = useState("All");
    const [filterMaxSalary, setFilterMaxSalary] = useState(5000);

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let fetchJobs = async () => {
            try {
                let data = await getAllJobs();

                // Konsola yazdır - ilk iş elanı nümunəsi
                console.log("Jobs API Response sample:", data.jobs[0]);

                // Yalnız array yoxlayıb state-ə əlavə et
                if (Array.isArray(data.jobs)) {
                    setJobs(data.jobs);
                } else {
                    setJobs([]);
                }
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        };
        fetchJobs();
    }, []);

    let isFavorited = (jobId) => {
        return favorites.some((job) => job._id === jobId);
    };

    // Filtered jobs based on filters + search term
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesJobType = filterJobType === "All" || job.jobType === filterJobType;
        const matchesCategory = filterCategory === "All" || job.category === filterCategory;
        const matchesLocation = filterLocation === "All" || job.location === filterLocation;
        const matchesCompany = filterCompany === "All" || job.company === filterCompany;
        const matchesSalary = Number(job.salary) <= filterMaxSalary;

        return (
            matchesSearch &&
            matchesJobType &&
            matchesCategory &&
            matchesLocation &&
            matchesCompany &&
            matchesSalary
        );
    });

    return (
        <>
            {/* === HERO === */}
            <section
                className="hero-section"
                style={{ backgroundImage: `url(${sliderImages[currentImage]})` }}
            >
                <div className="overlay">
                    <div className="hero-content fade-in">
                        <h1>Build Your Career, Find The Right Job</h1>
                        <p>Thousands of top opportunities await — start your search now.</p>
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            className="job-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* === FILTER + JOB CARDS === */}
            <div className="homecard-container">
                <aside className="filter-panel">
                    <div className="filter-wrapper">
                        <h3>Filter Jobs</h3>

                        {/* ... filter elements ... */}

                        <div className="filter-group">
                            <label>Job Type</label>
                            <select
                                value={filterJobType}
                                onChange={(e) => setFilterJobType(e.target.value)}
                            >
                                <option>All</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Freelance</option>
                                <option>Internship</option>
                                <option>Contract</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Category</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option>All</option>
                                <option>IT</option>
                                <option>Marketing</option>
                                <option>Design</option>
                                <option>Sales</option>
                                <option>Finance</option>
                                <option>Customer Support</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Location</label>
                            <select
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                            >
                                <option>All</option>
                                <option>Baku</option>
                                <option>Ganja</option>
                                <option>Sumqayit</option>
                                <option>Remote</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Company</label>
                            <select
                                value={filterCompany}
                                onChange={(e) => setFilterCompany(e.target.value)}
                            >
                                <option>All</option>
                                <option>Kapital Bank</option>
                                <option>Unibank</option>
                                <option>Pasha Bank</option>
                                <option>SOCAR</option>
                                <option>Nar Mobile</option>
                                <option>Azercell</option>
                                <option>Facebook</option>
                                <option>Google</option>
                                <option>Microsoft</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Max Salary: {filterMaxSalary} AZN</label>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={filterMaxSalary}
                                onChange={(e) => setFilterMaxSalary(Number(e.target.value))}
                            />
                        </div>

                        <button
                            className="reset-btn"
                            onClick={() => {
                                setSearchTerm("");
                                setFilterJobType("All");
                                setFilterCategory("All");
                                setFilterLocation("All");
                                setFilterCompany("All");
                                setFilterMaxSalary(5000);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                <main className="cards-panel">
                    {filteredJobs.length === 0 ? (
                        <p>No job listings match the filter criteria.</p>
                    ) : (
                        filteredJobs.map((job) => (
                            <div className="home-job-card" key={job._id}>
                                <div className="home-job-info-centered">
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="job-company">{job.company}</p>
                                    <p className="job-salary">💰 {job.salary} AZN</p>
                                    <div className="job-tags">
                                        <span className="tag">{job.jobType}</span>
                                        <span className="tag">{job.location}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            console.log("Clicked job _id:", job._id);
                                            navigate(`/job/${job._id}`);
                                        }}
                                        className="icon-btn"
                                    >
                                        Details
                                    </button>
                                </div>

                                <FaHeart
                                    className={`heart-icon ${isFavorited(job._id) ? "favorited" : ""}`}
                                    onClick={() => dispatch(toggleFavorite(job))}
                                    title="Toggle Favorite"
                                />
                            </div>
                        ))
                    )}
                </main>
            </div>
        </>
    );
};

export default EmployeeHomeContent;
