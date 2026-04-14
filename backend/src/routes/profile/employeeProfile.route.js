import express from "express";
import {
    createEmployeeProfile,
    getMyEmployeeProfile,
    updateEmployeeProfile,
    uploadProfilePhoto,
    uploadCV
} from "../../controllers/profile/employeeProfile.controller.js";

import { protect } from "../../middleware/authMiddleware.js";
import { upload } from "../../../utils/multer.js";

const router = express.Router();

/* =========================
   PROFİL CRUD
========================= */
router.post("/", protect, createEmployeeProfile);
router.get("/me", protect, getMyEmployeeProfile);
router.put("/me", protect, updateEmployeeProfile);

/* =========================
   PROFİL ŞƏKLİ
========================= */
router.post(
    "/me/profile-pic",
    protect,
    upload.single("profilePic"),
    uploadProfilePhoto
);

/* =========================
   CV UPLOAD
========================= */
router.post(
    "/me/cv",
    protect,
    upload.single("cv"), // 🔹 form-data key: cv
    uploadCV
);

export default router;
