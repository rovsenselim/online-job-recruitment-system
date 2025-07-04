import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    let [formData, setFormData] = useState({
        fullname: "",
        companyName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        terms: false,
    });

    let [errors, setErrors] = useState({});

    let handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        let val = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: val }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    let validate = () => {
        let newErrors = {};

        if (!formData.role) {
            newErrors.role = "Please select a role.";
        }

        if (formData.role === "employee" && formData.fullname.trim().length < 3) {
            newErrors.fullname = "Full name must be at least 3 characters.";
        }

        if (formData.role === "employer" && formData.companyName.trim().length < 2) {
            newErrors.companyName = "Company name must be at least 2 characters.";
        }

        if (formData.username.trim().length < 3) {
            newErrors.username = "Username must be at least 3 characters.";
        }

        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            newErrors.email = "Email is not valid.";
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.terms) {
            newErrors.terms = "You must agree to the terms.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    let handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("❌ Please fix the form errors.", {
                position: "top-center",
                theme: "colored",
                autoClose: 3000,
            });
            return;
        }

        try {
            // Role uyğun olmayan sahələri göndərmədən çıxar
            let dataToSend = { ...formData };
            if (dataToSend.role === "employee") {
                delete dataToSend.companyName;
            } else if (dataToSend.role === "employer") {
                delete dataToSend.fullname;
            }

            let response = await axios.post(
                "http://localhost:5000/api/auth/register",
                dataToSend,
                { withCredentials: true }
            );

            toast.success("✔️ " + response.data.message, {
                position: "top-center",
                theme: "colored",
                autoClose: 2000,
            });

            // Uğurlu qeydiyyatdan sonra 2 saniyə sonra login səhifəsinə yönləndir
            setTimeout(() => {
                navigate("/login");
            }, 2000);

            // Formu sıfırla
            setFormData({
                fullname: "",
                companyName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
                terms: false,
            });
            setErrors({});
        } catch (err) {
            toast.error("❌ " + (err.response?.data?.message || "Registration failed"), {
                position: "top-center",
                theme: "colored",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="register-container">
            <div className="form-side">
                <div className="site-name">JobRecruit</div>
                <h2>Create an Account</h2>

                <form onSubmit={handleSubmit}>
                    <select
                        name="role"
                        className="role-dropdown"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="employee">Employee</option>
                        <option value="employer">Employer</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}

                    {/* Role-a görə input görünür */}
                    {formData.role === "employee" && (
                        <>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                            {errors.fullname && <p className="error">{errors.fullname}</p>}
                        </>
                    )}

                    {formData.role === "employer" && (
                        <>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            {errors.companyName && <p className="error">{errors.companyName}</p>}
                        </>
                    )}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                        />
                        <label htmlFor="terms">I agree to the terms and conditions</label>
                    </div>
                    {errors.terms && <p className="error">{errors.terms}</p>}

                    <button type="submit" className="register-btn">Register</button>

                    <p className="login-link">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>

            <div className="image-side">
                <img
                    src="https://cdn.prod.website-files.com/62d84b3d3ba446b2ec041a19/62d84b3d3ba44608b50448c4_e%20recruitment.png"
                    alt="Register Visual"
                />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Register;
