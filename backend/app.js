import dotenv from "dotenv";
dotenv.config(); // Bütün importlardan əvvəl işləməlidir!

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Öz faylların
import { connectDB } from "./db/dbConnection.js";
import authRoutes from "./src/routes/authRoutes.js";
import employeeProfileRoutes from "./src/routes/profile/employeeProfile.route.js";
import employerProfileRoutes from "./src/routes/profile/employerProfile.route.js";
import jobRoutes from "./src/routes/job.Routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Qovluqların yaradılması (Xəta verməməsi üçün yoxlanışla)
const dirs = ["uploads/profile-pics", "uploads/cvs"];
dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

// Middleware-lər
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// Static fayllar
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Marşrutları (Routes)
app.use("/api/auth", authRoutes);
app.use("/api/profile/employee", employeeProfileRoutes);
app.use("/api/profile/employer", employerProfileRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("✅ Server və API işləyir");
});

// Verilənlər bazası bağlantısı və Serverin işə düşməsi
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT} portunda işləyir`));
    } catch (error) {
        console.error("❌ Server işə düşərkən xəta yarandı:", error.message);
    }
};

startServer();