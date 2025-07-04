import multer from "multer";
import path from "path";

// Profil şəkli üçün
const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images/profile-pics");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + "_profile" + ext);
    }
});

export const uploadProfilePic = multer({ storage: profilePicStorage });

// CV üçün
const cvStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images/cvs");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + "_cv" + ext);
    }
});

export const uploadCVFileOnly = multer({ storage: cvStorage });
