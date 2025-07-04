// src/pages/profile/EmployerProfile.jsx
import React, { useEffect, useState } from "react";
import EmployerProfileInfo from "../../components/profile/EmployerProfileInfo";
import EditProfileModal from "../../components/profile/EditEmployerProfileModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getEmployerProfile, updateEmployerProfile } from "../../services/profileService";

function EmployerProfilePage() {
    const { user, isAuthenticated } = useSelector(state => state.user);
    const [profile, setProfile] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !user?.id) {
            toast.error("Giriş tələb olunur");
            return;
        }

        getEmployerProfile(user.id)
            .then(profileData => {
                if (profileData) {
                    setProfile(profileData);
                } else {
                    toast.error("Profil məlumatı tapılmadı");
                }
            })
            .catch(err => {
                toast.error("Profil tapılmadı");
                console.error("getEmployerProfile error:", err);
            });
    }, [isAuthenticated, user]);

    const handleUpdate = async (updatedData) => {
        try {
            const updatedProfile = await updateEmployerProfile(user.id, updatedData);
            setProfile(updatedProfile);
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
            <EmployerProfileInfo profile={profile} onEdit={() => setOpenModal(true)} />
            <EditProfileModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleUpdate}
                initialData={profile}
                role="employer"
            />
        </>
    );
}

export default EmployerProfilePage;
