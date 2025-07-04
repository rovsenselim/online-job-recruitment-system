import express from "express";
import {
    getEmployeeProfile,
    updateEmployeeProfile,
    createEmployeeProfile,
    uploadCV,
    deleteCV,
    editCV,
    uploadProfilePhoto,
    getMyEmployeeProfile
} from "../../controllers/profile/employeeProfile.controller.js";

import { uploadCVFileOnly, uploadProfilePic } from "../../middleware/uploadFile.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Profil məlumatı (tokenlə daxil olmuş istifadəçi üçün)
router.get("/me", protect, getMyEmployeeProfile);

// Debug məqsədli profil yoxlaması (token tələb etmir, frontenddən ID gəlir)
router.get("/test/:userId", getEmployeeProfile);  // ⚠️ yalnız müvəqqəti debugging üçün

// Əsas profil route-lar (token tələb olunur)
router.get("/:userId", protect, getEmployeeProfile);
router.post("/", protect, createEmployeeProfile);
router.put("/:userId", protect, updateEmployeeProfile);
router.post("/upload-cv/:userId", protect, uploadCVFileOnly.single("cv"), uploadCV);
router.delete("/delete-cv/:userId/:filename", protect, deleteCV);
router.put("/edit-cv/:userId/:index", protect, uploadCVFileOnly.single("cv"), editCV);
router.post("/upload-photo/:userId", protect, uploadProfilePic.single("photo"), uploadProfilePhoto);
router.post("/upload-photo/:userId", protect, uploadProfilePic.single("profilePic"), uploadProfilePhoto);


export default router;

