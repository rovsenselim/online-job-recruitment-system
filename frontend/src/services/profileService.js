import API from "./api";

/* ===================== EMPLOYEE ===================== */

// Öz employee profilini gətir
export const getMyEmployeeProfile = async (token) => {
    const res = await API.get("/profile/employee/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    const profile = res.data.profile;

    // Tam profilePic URL-i yarat
    const profileWithURL = {
        ...profile,
        profilePic: profile.profilePic
            ? `http://localhost:5000/uploads/profile-pics/${profile.profilePic}`
            : null,
    };

    return { data: { profile: profileWithURL } };
};

// Employee profil yarat
export const createEmployeeProfile = (data, token) => {
    return API.post("/profile/employee", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Employee profil yenilə
export const updateEmployeeProfile = (data, token) => {
    return API.put("/profile/employee/me", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Employee profil şəkli yüklə
export const uploadEmployeePhoto = async (formData, token) => {
    try {
        const res = await API.post("/profile/employee/me/profile-pic", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        // Backend sadəcə filename qaytarır
        const filename = res.data.profilePic;

        // Tam URL yarat
        const profilePicURL = filename
            ? `http://localhost:5000/uploads/profile-pics/${filename}`
            : null;

        return { data: { profilePic: profilePicURL } };
    } catch (err) {
        console.error("Şəkil yüklənmədi", err);
        throw err;
    }
};

// CV əlavə et
export const uploadCV = async (formData, token) => {
    const res = await API.post("/profile/employee/me/cvs", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    // Tam path yarat
    const cvsWithPath = res.data.cvs.map((cv) => ({
        ...cv,
        path: `http://localhost:5000/uploads/cvs/${cv.filename}`,
    }));

    return { data: { cvs: cvsWithPath } };
};

// CV sil
export const deleteCV = (filename, token) => {
    return API.delete(`/profile/employee/me/cvs/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// CV redaktə et
export const editCV = async (oldFilename, formData, token) => {
    const res = await API.put(`/profile/employee/me/cvs/${oldFilename}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    // Tam path yarat
    const cvsWithPath = res.data.cvs.map((cv) => ({
        ...cv,
        path: `http://localhost:5000/uploads/cvs/${cv.filename}`,
    }));

    return { data: { cvs: cvsWithPath } };
};

/* ===================== EMPLOYER ===================== */

export const getMyEmployerProfile = (token) => {
    return API.get("/profile/employer/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateEmployerProfile = (data, token) => {
    return API.put("/profile/employer/me", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const uploadEmployerLogo = (formData, token) => {
    return API.post("/profile/employer/me/logo", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};
