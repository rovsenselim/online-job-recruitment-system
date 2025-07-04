import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getEmployeeProfile } from "../../services/profileAPI";
import EmployeeProfileInfo from "../../components/profile/EmployeeProfileInfo";
import EditProfileModal from "../../components/profile/EditEmployeeProfileModal";

function EmployeeProfilePage() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Giriş tələb olunur");
            navigate("/login");
            return;
        }

        let userId = user?.id || user?._id;
        console.log("🔍 user.id:", userId);

        // Müvəqqəti test route istifadə edə bilərsən
        getEmployeeProfile(userId)
            .then(res => {
                console.log("✅ Profil məlumatı:", res.data);
                if (res.data?.profile) {
                    setProfile(res.data.profile);
                } else {
                    toast.error("Profil məlumatı tapılmadı");
                }
            })
            .catch(err => {
                toast.error("Profil tapılmadı");
                console.error("getEmployeeProfile error:", err);
            });
    }, [isAuthenticated, navigate, user]);

    const handleUpdate = async (updatedData) => {
        try {
            const res = await updateEmployeeProfile(user.id, updatedData);
            setProfile(res.data.profile);
            toast.success("Profil uğurla yeniləndi");
            setOpenModal(false);
        } catch (err) {
            toast.error("Redaktə zamanı xəta baş verdi");
            console.error(err);
        }
    };

    if (!profile) return <p style={{ padding: "2rem", textAlign: "center" }}>Profil məlumatı yüklənir...</p>;

    return (
        <>
            <EmployeeProfileInfo profile={profile} onEdit={() => setOpenModal(true)} />
            <EditProfileModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleUpdate}
                initialData={profile}
                userId={user?.id}
            />
        </>
    );
}

export default EmployeeProfilePage;
