import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import EmployerProfileInfo from "../../components/profile/EmployerProfileInfo";
import EditEmployerProfileModal from "../../components/profile/EditEmployerProfileModal";

import {
    getMyEmployerProfile,
    updateEmployerProfile,
} from "../../services/profileService";

function EmployerProfile() {
    const navigate = useNavigate();
    const { isAuthenticated, token, role } = useSelector((state) => state.user);

    const [profile, setProfile] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !token) {
            toast.error("Giriş tələb olunur");
            navigate("/login");
            return;
        }

        if (role !== "employer") {
            toast.error("Employer profili üçün icazə yoxdur");
            navigate("/");
            return;
        }

        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const res = await getMyEmployerProfile(token);
                console.log("Employer API response:", res);

                if (isMounted) {
                    setProfile(res.data.profile || res.data);
                }
            } catch (err) {
                console.error("Employer profile fetch error:", err);
                toast.error("Profil tapılmadı");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProfile();

        return () => { isMounted = false; };
    }, [isAuthenticated, role, token, navigate]);

    const handleUpdate = async (updatedData) => {
        try {
            const res = await updateEmployerProfile(profile._id, updatedData, token);
            setProfile(res.data.profile || res.data);
            toast.success("Profil uğurla yeniləndi");
            setOpenModal(false);
        } catch (err) {
            console.error("Employer profile update error:", err);
            toast.error("Redaktə zamanı xəta baş verdi");
        }
    };

    if (loading) {
        return (
            <p style={{ padding: "2rem", textAlign: "center" }}>
                Profil məlumatı yüklənir...
            </p>
        );
    }

    return (
        <>
            <EmployerProfileInfo
                profile={profile}
                onEdit={() => setOpenModal(true)}
            />

            <EditEmployerProfileModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                profile={profile}
                onSave={handleUpdate}
            />
        </>
    );
}

export default EmployerProfile;
