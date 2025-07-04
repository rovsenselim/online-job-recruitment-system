import fs from "fs";
import path from "path";
import EmployeeProfile from "../../models/profile/employeeProfile.model.js";

// ✅ Yeni profil yarat
export const createEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { fullname, phone, location, experience, skills, description } = req.body;

        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const existing = await EmployeeProfile.findOne({ userId });
        if (existing) return res.status(400).json({ message: "Profil artıq mövcuddur" });

        const newProfile = new EmployeeProfile({
            userId,
            fullname,
            phone,
            location,
            experience,
            skills,
            description,
            cvs: [],
        });

        await newProfile.save();
        res.status(201).json({ message: "Profil yaradıldı", profile: newProfile });
    } catch (err) {
        console.error("❌ createEmployeeProfile error:", err.message);
        res.status(500).json({ message: "Server xətası", error: err.message });
    }
};

// ✅ Profil məlumatını al (ID ilə)
export const getEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        console.log("📥 getEmployeeProfile: userId =", userId);

        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const profile = await EmployeeProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        console.log("✅ Profil tapıldı:", profile);
        res.status(200).json({ profile });
    } catch (error) {
        console.error("❌ getEmployeeProfile error:", error.message);
        res.status(500).json({ message: "Server xətası", error: error.message });
    }
};

// ✅ Öz profilini al (GET /me)
export const getMyEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("📥 getMyEmployeeProfile: userId =", userId);

        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const profile = await EmployeeProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        console.log("✅ Öz profil tapıldı:", profile);
        res.status(200).json({ profile });
    } catch (error) {
        console.error("❌ getMyEmployeeProfile error:", error.message);
        res.status(500).json({ message: "Server xətası", error: error.message });
    }
};

// ✅ Profil yenilə
export const updateEmployeeProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const update = req.body;

        console.log("📥 updateEmployeeProfile: userId =", userId);
        console.log("🛠️ Yeni məlumatlar:", update);

        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const updatedProfile = await EmployeeProfile.findOneAndUpdate(
            { userId },
            update,
            { new: true }
        );

        if (!updatedProfile) return res.status(404).json({ message: "Profil tapılmadı" });

        console.log("✅ Profil yeniləndi:", updatedProfile);
        res.status(200).json({ message: "Profil yeniləndi", profile: updatedProfile });
    } catch (error) {
        console.error("❌ updateEmployeeProfile error:", error.message);
        res.status(500).json({ message: "Server xətası", error: error.message });
    }
};

// ✅ CV yüklə
export const uploadCV = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const file = req.file;

        if (!file) return res.status(400).json({ message: "CV faylı göndərilməyib" });
        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const profile = await EmployeeProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        profile.cvs.push(file.filename);
        await profile.save();

        console.log("✅ CV yükləndi:", file.filename);
        res.status(200).json({ message: "CV yükləndi", cvs: profile.cvs });
    } catch (error) {
        console.error("❌ uploadCV error:", error.message);
        res.status(500).json({ message: "CV yüklənərkən xəta", error: error.message });
    }
};

// ✅ CV sil
export const deleteCV = async (req, res) => {
    try {
        const { userId, filename } = req.params;

        if (!userId || !filename) {
            return res.status(400).json({ message: "İstifadəçi ID və ya fayl adı çatışmır" });
        }

        const profile = await EmployeeProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        profile.cvs = profile.cvs.filter(cv => cv !== filename);
        await profile.save();

        const filePath = path.join("uploads", "cvs", filename);
        fs.unlink(filePath, err => {
            if (err) console.error("Fayl silinmədi:", err.message);
        });

        console.log("✅ CV silindi:", filename);
        res.status(200).json({ message: "CV silindi", cvs: profile.cvs });
    } catch (error) {
        console.error("❌ deleteCV error:", error.message);
        res.status(500).json({ message: "CV silinərkən xəta", error: error.message });
    }
};

// ✅ CV redaktə et
export const editCV = async (req, res) => {
    try {
        const { userId, index } = req.params;
        const newFile = req.file;

        if (!newFile) return res.status(400).json({ message: "Yeni CV göndərilməyib" });

        const profile = await EmployeeProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        if (!profile.cvs[index]) return res.status(404).json({ message: "CV tapılmadı" });

        const oldFilePath = path.join("uploads", "cvs", profile.cvs[index]);
        fs.unlink(oldFilePath, err => {
            if (err) console.error("Köhnə CV silinmədi:", err.message);
        });

        profile.cvs[index] = newFile.filename;
        await profile.save();

        console.log("✅ CV yeniləndi:", newFile.filename);
        res.status(200).json({ message: "CV yeniləndi", cvs: profile.cvs });
    } catch (error) {
        console.error("❌ editCV error:", error.message);
        res.status(500).json({ message: "CV redaktə olunarkən xəta", error: error.message });
    }
};

// ✅ Profil şəkli yüklə
export const uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.user?.id || req.params.userId;
        const file = req.file;

        if (!file) return res.status(400).json({ message: "Şəkil faylı göndərilməyib" });
        if (!userId) return res.status(400).json({ message: "İstifadəçi ID tapılmadı" });

        const profile = await EmployeeProfile.findOne({ userId });
        if (!profile) return res.status(404).json({ message: "Profil tapılmadı" });

        if (profile.profilePic) {
            const oldPath = path.join("uploads", "profile-pics", profile.profilePic);
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Köhnə şəkil silinmədi:", err.message);
            });
        }

        profile.profilePic = file.filename;
        await profile.save();

        console.log("✅ Profil şəkli yükləndi:", file.filename);
        res.status(200).json({ message: "Profil şəkli yükləndi", profilePic: file.filename });
    } catch (err) {
        console.error("❌ uploadProfilePhoto error:", err.message);
        res.status(500).json({ message: "Profil şəkli yüklənərkən xəta", error: err.message });
    }
};
