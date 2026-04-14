// src/middleware/uploadFile.js
import multer from "multer";
import path from "path";
import fs from "fs";

// ====== Employer üçün fayl filter və storage ======

// CV faylları üçün filter (yalnız .pdf, .doc, .docx)
const employerCVFileFilter = (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
        return cb(new Error("Yalnız .pdf, .doc və .docx fayllar qəbul olunur"));
    }
    cb(null, true);
};

// CV faylları üçün storage
const employerCVStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/cvs";
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Profil şəkilləri üçün storage
const employerProfilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/profile-pics";
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Profil şəkilləri üçün filter (yalnız image/*)
const employerProfilePicFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Yalnız şəkil faylları qəbul olunur"), false);
    }
};

// ==== Export Multer middlewares ====

// Employer üçün CV yükləmə middleware
export const uploadCVFileOnly = multer({
    storage: employerCVStorage,
    fileFilter: employerCVFileFilter,
});

// Employer üçün profil şəkli yükləmə middleware
export const uploadProfilePic = multer({
    storage: employerProfilePicStorage,
    fileFilter: employerProfilePicFilter,
});
