import React from "react";
import "./Login.css";

const LoginForm = ({ formData, handleChange, handleSubmit, loading }) => {
    return (
        <div className="login-container">
            <div className="form-side">
                <div className="site-name">JobRecruit</div>
                <h2>Login to Your Account</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="log-btn" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>

            <div className="image-side">
                <img
                    src="https://cdn.prod.website-files.com/62d84b3d3ba446b2ec041a19/62d84b3d3ba44608b50448c4_e%20recruitment.png"
                    alt="Login"
                />
            </div>
        </div>
    );
};

export default LoginForm;
