import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/dbConnection.js";

// 🔗 ROUTE-lar
import authRoutes from "./src/routes/authRoutes.js";
import employeeProfileRoutes from "./src/routes/profile/employeeProfile.route.js";
import employerProfileRoutes from "./src/routes/profile/employerProfile.route.js";
import jobRoutes from "./src/routes/job.Routes.js"; // ✅ Daxil edildi

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS ayarları (cookie üçün frontend bağlantısı)
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

// ✅ JSON və cookie parser
app.use(express.json());
app.use(cookieParser());

// ✅ Statik fayl yolları
app.use(
    "/uploads/profile-pics",
    express.static(path.join(__dirname, "uploads/profile-pics"))
);
app.use("/uploads/cvs", express.static(path.join(__dirname, "uploads/cvs")));

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/profile/employee", employeeProfileRoutes);
app.use("/api/profile/employer", employerProfileRoutes);
// Burada employerProfileRoutes iki dəfə istifadə olunmur (silə bilərsən)
app.use("/api/jobs", jobRoutes); // ✅ İş elanları route

// ✅ Sağlamlıq yoxlaması route-u
app.get("/", (req, res) => {
    res.send("✅ Server və API işləyir");
});

// ✅ MongoDB bağlantısı və serverin işə salınması
console.log("🔌 MongoDB bağlantısına cəhd edilir...");
connectDB()
    .then(() => {
        console.log("✅ MongoDB bağlantısı uğurla quruldu");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server ${PORT} portunda işə düşdü`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB bağlantısı uğursuz oldu:", err.message);
        process.exit(1);
    });
