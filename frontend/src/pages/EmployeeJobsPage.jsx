import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getAllJobs } from "../services/jobAPI";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/features/favoritesSlice";
import "./EmployeeJobsPage.css";

const EmployeeJobsPage = () => {
    let [jobs, setJobs] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");
    let [filterJobType, setFilterJobType] = useState("All");
    let [filterCategory, setFilterCategory] = useState("All");
    let [filterLocation, setFilterLocation] = useState("All");
    let [filterCompany, setFilterCompany] = useState("All");
    let [filterMaxSalary, setFilterMaxSalary] = useState(5000);
    let [sortOrder, setSortOrder] = useState("none");

    let dispatch = useDispatch();
    let favorites = useSelector((state) => state.favorites.favorites);
    let navigate = useNavigate();

    useEffect(() => {
        let fetchJobs = async () => {
            try {
                let data = await getAllJobs();
                setJobs(data.jobs);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        };
        fetchJobs();
    }, []);

    let isFavorited = (jobId) => {
        return favorites.some((job) => job._id === jobId);
    };

    let filteredJobs = jobs.filter((job) => {
        let matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesJobType = filterJobType === "All" || job.jobType === filterJobType;
        let matchesCategory = filterCategory === "All" || job.category === filterCategory;
        let matchesLocation = filterLocation === "All" || job.location === filterLocation;
        let matchesCompany = filterCompany === "All" || job.company === filterCompany;
        let matchesSalary = Number(job.salary) <= filterMaxSalary;

        return (
            matchesSearch &&
            matchesJobType &&
            matchesCategory &&
            matchesLocation &&
            matchesCompany &&
            matchesSalary
        );
    });

    if (sortOrder === "asc") {
        filteredJobs.sort((a, b) => a.salary - b.salary);
    } else if (sortOrder === "desc") {
        filteredJobs.sort((a, b) => b.salary - a.salary);
    } else if (sortOrder === "az") {
        filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "za") {
        filteredJobs.sort((a, b) => b.title.localeCompare(a.title));
    }

    return (
        <div className="employee-jobs-page">
            <div className="filter-panel">
                <h3>Filter Jobs</h3>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select value={filterJobType} onChange={(e) => setFilterJobType(e.target.value)}>
                    <option>All</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                </select>

                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option>All</option>
                    <option>IT</option>
                    <option>Marketing</option>
                    <option>Design</option>
                    <option>Sales</option>
                </select>

                <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                    <option>All</option>
                    <option>Baku</option>
                    <option>Ganja</option>
                    <option>Sumqayit</option>
                    <option>Remote</option>
                </select>

                <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
                    <option>All</option>
                    <option>Kapital Bank</option>
                    <option>Unibank</option>
                    <option>SOCAR</option>
                    <option>Facebook</option>
                    <option>Azercell</option>
                    <option>Pasha Holding</option>
                </select>

                <label>Max Salary: {filterMaxSalary} AZN</label>
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filterMaxSalary}
                    onChange={(e) => setFilterMaxSalary(Number(e.target.value))}
                />

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="none">Sort by</option>
                    <option value="asc">Salary: Low to High</option>
                    <option value="desc">Salary: High to Low</option>
                    <option value="az">Title: A - Z</option>
                    <option value="za">Title: Z - A</option>
                </select>

                <button
                    onClick={() => {
                        setSearchTerm("");
                        setFilterJobType("All");
                        setFilterCategory("All");
                        setFilterLocation("All");
                        setFilterCompany("All");
                        setFilterMaxSalary(5000);
                        setSortOrder("none");
                    }}
                >
                    Reset Filters
                </button>
            </div>

            <div className="cards-panel">
                {filteredJobs.length === 0 ? (
                    <p>No jobs found.</p>
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
                                    onClick={() => navigate(`/job/${job._id}`)}
                                    className="icon-btn"
                                >
                                    Details
                                </button>
                            </div>

                            <FaHeart
                                className={`heart-icon ${isFavorited(job._id) ? "favorited" : ""}`}
                                onClick={() => dispatch(toggleFavorite(job))}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EmployeeJobsPage;
