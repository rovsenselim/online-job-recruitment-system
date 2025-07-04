import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Yeni əlavə: id-yə görə istifadəçi məlumatını almaq
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("email username role");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
