import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import LoginForm from "../components/login/Login";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/auth/login", formData, {
                withCredentials: true, // Bura da yazmaq təhlükəsizdir, axios instance-da da var
            });

            dispatch(loginUser(response.data.user)); // Redux-da istifadəçi məlumatlarını saxla
            toast.success("Uğurla daxil oldunuz");

            if (response.data.user.role === "employee") {
                navigate("/employee-home");
            } else if (response.data.user.role === "employer") {
                navigate("/employer-home");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Email və ya şifrə yalnışdır");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
        />
    );
}

export default LoginPage;
