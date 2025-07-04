import React from "react";
import "./BlogCard.css";

const BlogCard = ({ image, title, date, excerpt }) => {
    return (
        <div className="blog-card">
            <img src={image} alt={title} />
            <div className="blog-card-content">
                <h2>{title}</h2>
                <p className="blog-card-date">{date}</p>
                <p className="blog-card-excerpt">{excerpt}</p>
                <a href="#" className="read-more">Read More</a>
            </div>
        </div>
    );
};

export default BlogCard;
