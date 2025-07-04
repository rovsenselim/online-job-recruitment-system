import multer from "multer";
import path from "path";
import fs from "fs";

// Fayl növü yoxlayan filter (.pdf, .doc, .docx)
const cvFileFilter = (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
        return cb(new Error("Yalnız .pdf, .doc və .docx fayllar qəbul olunur"));
    }
    cb(null, true);
};

// CV üçün storage
const cvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "uploads/cvs";
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// Profil şəkli üçün storage
const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "uploads/profile-pics";
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// Export
export const uploadCVFileOnly = multer({ storage: cvStorage, fileFilter: cvFileFilter });
export const uploadProfilePic = multer({ storage: profilePicStorage });
