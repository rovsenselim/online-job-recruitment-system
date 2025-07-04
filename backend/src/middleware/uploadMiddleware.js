import multer from "multer";
import path from "path";
import fs from "fs";

// Yükləmə üçün path-i dinamik yarat (profil və cv üçün)
const makeStorage = (folderName) => multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `src/images/${folderName}`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const uploadProfilePic = multer({ storage: makeStorage("profile-pics") });
export const uploadCV = multer({ storage: makeStorage("cvs") });
