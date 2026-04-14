import fs from "fs/promises";
import path from "path";
import EmployeeProfile from "../../models/profile/employeeProfile.model.js";

/* =========================
   PROFİL YARAT
========================= */
export const createEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const exists = await EmployeeProfile.findOne({ userId });
        if (exists) {
            return res.status(400).json({ message: "Profil artıq mövcuddur" });
        }

        const body = req.body || {};

        const profile = await EmployeeProfile.create({
            userId,
            fullname: body.fullname || "",
            profession: body.profession || "",
            age: body.age || null,
            location: body.location || "",
            phone: body.phone || "",
            email: body.email || "",
            experience: body.experience || "",
            skills: Array.isArray(body.skills) ? body.skills : [],
            description: body.description || "",
            cvs: [],           // ✅ Başlanğıcda boş array
            profilePic: null
        });

        res.status(201).json({ profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   ÖZ PROFİLİNİ AL
========================= */
export const getMyEmployeeProfile = async (req, res) => {
    try {
        const profile = await EmployeeProfile.findOne({ userId: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: "Profil tapılmadı" });
        }

        res.json({ profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   PROFİL YENİLƏ
========================= */
export const updateEmployeeProfile = async (req, res) => {
    try {
        const body = req.body || {};

        const allowedFields = [
            "fullname",
            "profession",
            "age",
            "location",
            "phone",
            "email",
            "experience",
            "skills",
            "description"
        ];

        let updateData = {};
        allowedFields.forEach(field => {
            if (body[field] !== undefined) {
                updateData[field] = body[field];
            }
        });

        const updated = await EmployeeProfile.findOneAndUpdate(
            { userId: req.user._id },
            { $set: updateData },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Profil tapılmadı" });
        }

        res.json({ profile: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   PROFİL ŞƏKLİ YÜKLƏ
========================= */
export const uploadProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Şəkil yüklənmədi" });
        }

        const profile = await EmployeeProfile.findOne({ userId: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: "Profil tapılmadı" });
        }

        if (profile.profilePic) {
            await fs
                .unlink(path.resolve("uploads/profile-pics", profile.profilePic))
                .catch(() => { });
        }

        profile.profilePic = req.file.filename;
        await profile.save();

        res.json({ profilePic: profile.profilePic });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   CV YÜKLƏ
========================= */
export const uploadCV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "CV yüklənmədi" });
        }

        const profile = await EmployeeProfile.findOne({ userId: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: "Profil tapılmadı" });
        }

        // ✅ cvs.path düzgün formatda əlavə olunur
        profile.cvs.push({
            fullname: req.body.fullname || profile.fullname,
            profession: req.body.profession || profile.profession,
            filename: req.file.filename,
            path: `/uploads/cvs/${req.file.filename}`
        });

        await profile.save();

        res.status(201).json({
            message: "CV uğurla yükləndi",
            cvs: profile.cvs
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
