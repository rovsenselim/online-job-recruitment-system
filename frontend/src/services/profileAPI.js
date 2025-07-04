import API from "./api";

// ✅ Employer funksiyaları
export const getEmployerProfile = (id) => {
    return API.get(`/profile/employer/${id}`);
};

export const uploadEmployerLogo = (id, formData) => {
    return API.post(`/profile/employer/${id}/upload-logo`, formData);
};

export const updateEmployerProfile = (id, data) => {
    return API.put(`/profile/employer/${id}`, data);
};

// ✅ Employee funksiyaları
export const getEmployeeProfile = (id) => {
    return API.get(`/profile/employee/${id}`); // ⬅️ DÜZGÜN ROUTE
};

export const uploadEmployeePhoto = (id, formData) => {
    return API.post(`/profile/employee/upload-photo/${id}`, formData);
};

export const updateEmployeeProfile = (id, data) => {
    return API.put(`/profile/employee/${id}`, data);
};

// ✅ CV yükləmə funksiyası (EMPLOYEE üçün)
export const uploadCV = (id, formData) => {
    return API.post(`/profile/employee/upload-cv/${id}`, formData);
};
