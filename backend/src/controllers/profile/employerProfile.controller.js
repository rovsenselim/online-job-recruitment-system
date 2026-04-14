import fs from "fs";
import path from "path";
import EmployerProfile from "../../models/profile/employerProfile.model.js";
import EmployeeProfile from "../../models/profile/employeeProfile.model.js";

/* ================================
   EMPLOYER PROFILE
================================ */

// Yeni işəgötürən profili yarat
export const createEmployerProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { companyName, phone, location, description, email } = req.body;

        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const existing = await EmployerProfile.findOne({ userId });
        if (existing) return res.status(400).json({ message: "Profil artıq mövcuddur" });

        const newProfile = new EmployerProfile({
            userId,
            companyName,
            phone,
            location,
            description,
            email: email || "",
            profilePic: "",
            jobPosts: []
        });

        await newProfile.save();
        res.status(201).json({ message: "Profil yaradıldı", profile: newProfile });
    } catch (err) {
        console.error("createEmployerProfile xətası:", err);
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

// Profil məlumatını gətir
export const getEmployerProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const profile = await EmployerProfile.findOne({ userId });

        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        res.status(200).json({ profile });
    } catch (err) {
        console.error("getEmployerProfile xətası:", err);
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

// Profil yenilə
export const updateEmployerProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const update = req.body;

        const updated = await EmployerProfile.findOneAndUpdate(
            { userId },
            update,
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Profil tapılmadı" });

        res.status(200).json({ message: "Profil yeniləndi", profile: updated });
    } catch (err) {
        console.error("updateEmployerProfile xətası:", err);
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

// Profil şəkli yüklə
export const uploadEmployerProfilePic = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const file = req.file;

        if (!file) return res.status(400).json({ message: "Şəkil faylı tapılmadı" });

        const profile = await EmployerProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        if (profile.profilePic) {
            const oldPath = path.join("uploads", "profile-pics", profile.profilePic);
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Köhnə şəkil silinmədi:", err.message);
            });
        }

        profile.profilePic = file.filename;
        await profile.save();

        res.status(200).json({
            message: "Şəkil yükləndi",
            profilePic: file.filename
        });
    } catch (err) {
        console.error("uploadEmployerProfilePic xətası:", err);
        res.status(500).json({ message: "Şəkil yüklənərkən xəta", error: err.message });
    }
};

/* ================================
   JOB POSTS
================================ */

// Elan əlavə et
export const addJobPost = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        if (!userId) return res.status(400).json({ message: "User ID tapılmadı" });

        const { title, description, location, deadline, salary } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Başlıq və təsvir daxil edilməyib" });
        }

        const profile = await EmployerProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        const newJob = {
            title,
            description,
            location: location || "Remote",
            deadline: deadline || "",
            salary: salary || ""
        };

        profile.jobPosts.push(newJob);
        await profile.save();

        const lastJob = profile.jobPosts[profile.jobPosts.length - 1];

        res.status(201).json({
            message: "Elan əlavə olundu",
            job: lastJob
        });
    } catch (err) {
        console.error("Elan əlavə edilərkən xəta:", err);
        res.status(500).json({ message: "Elan əlavə edilə bilmədi", error: err.message });
    }
};

// Elanı redaktə et
export const editJobPost = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const postId = req.params.postId;
        const updateData = req.body;

        if (!postId) return res.status(400).json({ message: "postId göndərilməyib" });

        const profile = await EmployerProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        const job = profile.jobPosts.id(postId);
        if (!job) return res.status(404).json({ message: "Elan tapılmadı" });

        Object.assign(job, updateData);
        await profile.save();

        res.status(200).json({ message: "Elan yeniləndi", job });
    } catch (err) {
        console.error("Elan yenilənərkən xəta:", err);
        res.status(500).json({ message: "Elan yenilənmədi", error: err.message });
    }
};

// Elanı sil
export const deleteJobPost = async (req, res) => {
    try {
        const { userId, postId } = req.params;

        const profile = await EmployerProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        const initialLength = profile.jobPosts.length;
        profile.jobPosts = profile.jobPosts.filter(
            job => job._id.toString() !== postId
        );

        if (profile.jobPosts.length === initialLength) {
            return res.status(404).json({ message: "Elan tapılmadı" });
        }

        await profile.save();
        res.status(200).json({ message: "Elan silindi" });
    } catch (err) {
        console.error("Elan silinərkən xəta:", err);
        res.status(500).json({ message: "Silinmə zamanı xəta", error: err.message });
    }
};

/* ================================
   EMPLOYEE CVs (EMPLOYER HOME)
================================ */

// Employee CV-lərini gətir
export const getAllEmployeeCVs = async (req, res) => {
    try {
        const employeeProfiles = await EmployeeProfile.find(
            {},
            "fullname profession cvs userId"
        );

        let allCVs = [];

        employeeProfiles.forEach(profile => {
            if (profile.cvs && profile.cvs.length > 0) {
                profile.cvs.forEach(cv => {
                    allCVs.push({
                        employeeFullname: profile.fullname || "",
                        employeeProfession: profile.profession || "",
                        cvFullname: cv.fullname || profile.fullname || "",
                        cvProfession: cv.profession || profile.profession || "",
                        filename: cv.filename,
                        employeeId: profile.userId
                    });
                });
            }
        });

        if (allCVs.length === 0) {
            return res.status(404).json({
                message: "No candidates match the filter criteria."
            });
        }

        res.status(200).json({ cvs: allCVs });
    } catch (err) {
        console.error("getAllEmployeeCVs xətası:", err);
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

/* ================================
   CV UPLOAD (Yeni əlavə)
================================ */

import CV from "../../models/profile/cv.model.js"; // CV modelin varsa

export const uploadCV = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!req.file) {
            return res.status(400).json({ message: "Fayl seçilməyib" });
        }

        const cvData = {
            user: userId,
            filename: req.file.filename,
            cvFullname: req.body.fullname,
            cvProfession: req.body.profession,
            location: req.body.location || "Unknown",
        };

        const newCV = await CV.create(cvData);

        res.status(201).json({
            message: "CV uğurla yükləndi",
            cv: newCV,
        });
    } catch (err) {
        console.error("CV upload error:", err);
        res.status(500).json({ message: "CV yüklənərkən xəta baş verdi" });
    }
};
