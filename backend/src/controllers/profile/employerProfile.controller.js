import fs from "fs";
import path from "path";
import EmployerProfile from "../../models/profile/employerProfile.model.js";

// Yeni işəgötürən profili yarat
export const createEmployerProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { companyName, phone, location, description } = req.body;

        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const existing = await EmployerProfile.findOne({ userId });
        if (existing) return res.status(400).json({ message: "Profil artıq mövcuddur" });

        const newProfile = new EmployerProfile({
            userId,
            companyName,
            phone,
            location,
            description,
            cvs: [], // boş array kimi əlavə edildi
            profilePic: "", // boş string olaraq əlavə edildi
        });

        await newProfile.save();
        res.status(201).json({ message: "Profil yaradıldı", profile: newProfile });
    } catch (err) {
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

// İşəgötürən profilini gətir
export const getEmployerProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const profile = await EmployerProfile.findOne({ userId });

        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        res.status(200).json({ profile });
    } catch (err) {
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

// Profili yenilə
export const updateEmployerProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const update = req.body;

        const updated = await EmployerProfile.findOneAndUpdate({ userId }, update, { new: true });
        if (!updated) return res.status(404).json({ message: "Profil tapılmadı" });

        res.status(200).json({ message: "Profil yeniləndi", profile: updated });
    } catch (err) {
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

        // Köhnə şəkil varsa, sil
        if (profile.profilePic) {
            const oldPath = path.join("uploads", "profile-pics", profile.profilePic);
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Köhnə şəkil silinmədi:", err.message);
            });
        }

        profile.profilePic = file.filename;
        await profile.save();

        res.status(200).json({ message: "Şəkil yükləndi", profilePic: file.filename });
    } catch (err) {
        res.status(500).json({ message: "Şəkil yüklənərkən xəta", error: err.message });
    }
};

// CV yüklə
export const uploadEmployerCV = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const file = req.file;

        if (!file) return res.status(400).json({ message: "CV faylı tapılmadı" });

        const profile = await EmployerProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        profile.cvs.push(file.filename);
        await profile.save();

        res.status(200).json({ message: "CV yükləndi", cvs: profile.cvs });
    } catch (err) {
        res.status(500).json({ message: "CV yüklənərkən xəta", error: err.message });
    }
};

// CV sil
export const deleteEmployerCV = async (req, res) => {
    try {
        const { userId, filename } = req.params;

        const profile = await EmployerProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        profile.cvs = profile.cvs.filter((cv) => cv !== filename);
        await profile.save();

        const filePath = path.join("uploads", "cvs", filename);
        fs.unlink(filePath, (err) => {
            if (err) console.error("Fayl silinmədi:", err.message);
        });

        res.status(200).json({ message: "CV silindi", cvs: profile.cvs });
    } catch (err) {
        res.status(500).json({ message: "CV silinərkən xəta", error: err.message });
    }
};
