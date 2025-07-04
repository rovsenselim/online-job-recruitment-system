import React from "react";
import blogs from "../components/blog/BlogData";
import "./BlogPage.css";

const BlogPage = () => {
    return (
        <div className="blog-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Latest Insights & Career Tips</h1>
                    <p>Explore our expert articles to boost your professional journey.</p>
                </div>
            </section>

            <section className="blog-cards">
                {blogs.map((blog, index) => (
                    <article key={index} className="blog-card">
                        <img src={blog.image} alt={blog.title} className="blog-image" />
                        <h3 className="blog-title">{blog.title}</h3>
                        <p className="blog-text">{blog.text}</p>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default BlogPage;
