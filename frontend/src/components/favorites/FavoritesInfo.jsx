import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../redux/features/favoritesSlice";
import "./FavoritesInfo.css";

const FavoritesInfo = () => {
    const favorites = useSelector((state) => state.favorites.favorites);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">My Favorite Jobs</h1>

            <section className="favorites-grid">
                {favorites.length === 0 ? (
                    <p className="no-favorites">No favorite jobs yet.</p>
                ) : (
                    favorites.map((job) => (
                        <div className="fav-card" key={job._id}>
                            <button
                                className="remove-btn"
                                onClick={() => dispatch(removeFavorite(job._id))}
                                title="Remove from Favorites"
                            >
                                <FaTrash />
                            </button>
                            <div className="fav-info">
                                <h3>{job.title}</h3>
                                <p className="company">{job.company}</p>
                                <p>
                                    {job.location} • {job.jobType}
                                </p>
                                <p className="salary">💰 {job.salary} AZN</p>
                                <p className="posted">
                                    <FaClock /> {job.time || "Recently posted"}
                                </p>
                                <button
                                    className="details-btn"
                                    onClick={() => navigate(`/job/${job._id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default FavoritesInfo;
