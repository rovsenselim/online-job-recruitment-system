import express from "express";
import {
    getEmployerProfile,
    uploadEmployerCV,
    deleteEmployerCV,
} from "../../controllers/profile/employerProfile.controller.js";

import { protect } from "../../middleware/authMiddleware.js";
import { uploadCVFileOnly } from "../../middleware/uploadFile.js";

const router = express.Router();

router.get("/:userId", protect, getEmployerProfile);

router.post(
    "/upload-cv/:userId",
    protect,
    uploadCVFileOnly.single("cv"),
    uploadEmployerCV
);

router.delete("/delete-cv/:userId/:filename", protect, deleteEmployerCV);

export default router;
