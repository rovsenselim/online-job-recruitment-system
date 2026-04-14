import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../redux/features/favoritesSlice";
import { fetchEmployeeCVs } from "../../../redux/features/employerCvSlice";
import "./EmployerHomeContent.css";

const EmployerHomeContent = () => {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.favorites.favorites);
    const { cvs: profiles = [], loading, error } = useSelector(
        (state) => state.employerCv
    );

    const [filterProfession, setFilterProfession] = useState("All");
    const [filterLocation, setFilterLocation] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchEmployeeCVs());
    }, [dispatch]);

    const isFavorited = (profile) => {
        return favorites.some(
            (fav) =>
                (fav._id && profile._id && fav._id === profile._id) ||
                (fav.filename && profile.filename && fav.filename === profile.filename)
        );
    };

    const filteredProfiles = profiles.filter((profile) => {
        const professionVal = profile.employeeProfession || profile.profession || "Naməlum";
        const fullnameVal = profile.employeeFullname || profile.fullname || "Naməlum";
        const locationVal = profile.location || "Naməlum";

        const professionMatch = filterProfession === "All" || professionVal === filterProfession;
        const locationMatch = filterLocation === "All" || locationVal === filterLocation;

        const searchText = searchTerm.trim().toLowerCase();
        const searchMatch =
            fullnameVal.toLowerCase().includes(searchText) ||
            professionVal.toLowerCase().includes(searchText) ||
            (profile.cvFullname && profile.cvFullname.toLowerCase().includes(searchText)) ||
            (profile.cvProfession && profile.cvProfession.toLowerCase().includes(searchText));

        return professionMatch && locationMatch && (!searchText || searchMatch);
    });

    const professions = [
        "All",
        ...new Set(
            profiles
                .map((p) => p.employeeProfession || p.profession || "Naməlum")
                .filter(Boolean)
        ),
    ];
    const locations = [
        "All",
        ...new Set(profiles.map((p) => p.location || "Naməlum").filter(Boolean)),
    ];

    const CV_BASE_URL = "http://localhost:5000/uploads/cvs/";

    return (
        <>
            <section className="hero-section hero-employer">
                <div className="overlay">
                    <div className="hero-content fade-in">
                        <h1>Find the Best Candidates for Your Company</h1>
                        <p>Browse employee profiles and discover top talents.</p>

                        <input
                            type="text"
                            placeholder="Search by name, profession, CV..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <div className="homecontent-container">
                <aside className="filter-panel">
                    <h3>Filter Candidates</h3>

                    <div className="filter-group">
                        <label>Profession</label>
                        <select
                            value={filterProfession}
                            onChange={(e) => setFilterProfession(e.target.value)}
                        >
                            {professions.map((prof) => (
                                <option key={prof} value={prof}>
                                    {prof}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Location</label>
                        <select
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        >
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="reset-btn"
                        onClick={() => {
                            setFilterProfession("All");
                            setFilterLocation("All");
                            setSearchTerm("");
                        }}
                    >
                        Reset Filters
                    </button>
                </aside>

                <main className="cards-panel">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : filteredProfiles.length === 0 ? (
                        <p>No candidates match the filter criteria.</p>
                    ) : (
                        filteredProfiles.map((profile, idx) => {
                            const cvFileLink = profile.filename
                                ? CV_BASE_URL + profile.filename
                                : null;

                            return (
                                <div
                                    className="candidate-card"
                                    key={profile._id ?? profile.filename ?? idx}
                                >
                                    <FaHeart
                                        className={`heart-icon ${isFavorited(profile) ? "favorited" : ""
                                            }`}
                                        onClick={() => dispatch(toggleFavorite(profile))}
                                        title={
                                            isFavorited(profile)
                                                ? "Remove from Favorites"
                                                : "Add to Favorites"
                                        }
                                    />

                                    <div className="card-content">
                                        <h3>{profile.employeeFullname || profile.fullname || "Naməlum"}</h3>

                                        <p>
                                            <strong>Profession:</strong>{" "}
                                            {profile.employeeProfession || profile.profession || "Naməlum"}
                                        </p>

                                        <p>
                                            <strong>CV Name:</strong>{" "}
                                            {profile.cvFullname || "Yoxdur"}
                                        </p>

                                        <p>
                                            <strong>CV Profession:</strong>{" "}
                                            {profile.cvProfession || "Yoxdur"}
                                        </p>

                                        {cvFileLink ? (
                                            <p>
                                                <strong>CV File: </strong>
                                                <a
                                                    href={cvFileLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="cv-link"
                                                >
                                                    {profile.filename}
                                                </a>
                                            </p>
                                        ) : (
                                            <p>
                                                <strong>CV File:</strong> Yoxdur
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </main>
            </div>
        </>
    );
};

export default EmployerHomeContent;
