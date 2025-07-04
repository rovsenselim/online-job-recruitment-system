// src/services/profileService.js
import API from "./api";

// Employee profile API
export const getEmployeeProfile = (userId) =>
    API.get(`/profile/employee/${userId}`).then(res => res.data);

export const createEmployeeProfile = (data) =>
    API.post(`/profile/employee`, data).then(res => res.data);

export const updateEmployeeProfile = (userId, data) =>
    API.put(`/profile/employee/${userId}`, data).then(res => res.data);

// Employer profile API
export const getEmployerProfile = (userId) =>
    API.get(`/profile/employer/${userId}`).then(res => res.data);

export const createEmployerProfile = (data) =>
    API.post(`/profile/employer`, data).then(res => res.data);

export const updateEmployerProfile = (userId, data) =>
    API.put(`/profile/employer/${userId}`, data).then(res => res.data);
