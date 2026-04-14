// src/routes/profile/employerProfile.route.js

import express from "express";
import {
    createEmployerProfile,
    getEmployerProfile,
    updateEmployerProfile,
    uploadEmployerProfilePic,
    addJobPost,
    editJobPost,
    deleteJobPost,
    getAllEmployeeCVs,
    uploadCV, // <- CV yükləmə controller
} from "../../controllers/profile/employerProfile.controller.js";

import { uploadProfilePic, uploadCVFileOnly } from "../../middleware/uploadFile.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🔵 Employer Profile əməliyyatları
router.post("/", protect, createEmployerProfile);                // Yeni profil yarat
router.get("/:userId", protect, getEmployerProfile);             // Profil məlumatını gətir
router.put("/:userId", protect, updateEmployerProfile);          // Profil məlumatını yenilə

// Yeni route: bütün employee-lərin CV-lərini gətirir
router.get("/cvs/all", protect, getAllEmployeeCVs);

// 🖼 Profil şəkli yüklə
router.post(
    "/upload-photo/:userId",
    protect,
    uploadProfilePic.single("photo"),
    uploadEmployerProfilePic
);

// 📄 CV yükləmə route
router.post(
    "/upload-cv/:userId",
    protect,
    uploadCVFileOnly.single("cv"), // multer middleware faylı
    uploadCV                       // controller funksiyası
);

// 🟢 İş elanları
router.post("/add-job/:userId", protect, addJobPost);                          // Elan əlavə et
router.put("/edit-job/:userId/:postId", protect, editJobPost);                // Elanı redaktə et
router.delete("/delete-job/:userId/:postId", protect, deleteJobPost);         // Elanı sil

export default router;
