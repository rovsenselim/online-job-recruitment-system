import multer from "multer";
import fs from "fs";
import path from "path";

const dirs = ["uploads/profile-pics", "uploads/cvs"];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profilePic") {
            cb(null, "uploads/profile-pics");
        } else if (file.fieldname === "cv") {
            cb(null, "uploads/cvs");
        } else {
            cb(null, "uploads");
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// ✅ ŞƏKİL + CV icazəsi
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "profilePic") {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Yalnız şəkil yükləyə bilərsiniz"), false);
        }
    }

    if (file.fieldname === "cv") {
        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Yalnız PDF və ya DOC CV yükləyə bilərsiniz"), false);
        }
    }

    cb(null, true);
};

export const upload = multer({ storage, fileFilter });
