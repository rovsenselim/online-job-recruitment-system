import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getMyEmployeeProfile, updateEmployeeProfile } from "../../services/profileService";
import EmployeeProfileInfo from "../../components/profile/EmployeeProfileInfo";
import EditEmployeeProfileModal from "../../components/profile/EditEmployeeProfileModal";

function EmployeeProfile() {
    const navigate = useNavigate();
    const { isAuthenticated, token, role } = useSelector((state) => state.user);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !token) {
            navigate("/login");
            return;
        }

        if (role !== "employee") {
            toast.error("Bu səhifə yalnız employee üçündür");
            navigate("/");
            return;
        }

        const loadProfile = async () => {
            try {
                const { data } = await getMyEmployeeProfile(token);
                setProfile(data.profile);
            } catch (err) {
                if (err?.response?.status === 404) {
                    toast.info("Profil tapılmadı, yaradın");
                    navigate("/create-employee-profile");
                } else {
                    toast.error(err?.response?.data?.message || "Profil tapılmadı");
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [token, isAuthenticated, role, navigate]);

    const handleUpdate = async (updatedData) => {
        try {
            const { data } = await updateEmployeeProfile(updatedData, token);
            setProfile(data.profile);
            toast.success("Profil yeniləndi");
            setOpenModal(false);
        } catch (err) {
            toast.error("Yeniləmə zamanı xəta");
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>Yüklənir...</p>;

    return (
        <>
            <EmployeeProfileInfo
                profile={profile}
                setOpenModal={setOpenModal}
                token={token}
                setProfile={setProfile}
            />

            <EditEmployeeProfileModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                profile={profile}
                onSave={handleUpdate}
            />
        </>
    );
}

export default EmployeeProfile;
