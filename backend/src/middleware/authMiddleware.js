import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        let token = null;

        if (req.cookies?.token) token = req.cookies.token;
        else if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ message: "Token yoxdur, giriş tələb olunur" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            console.log("User not found for token");
            return res.status(401).json({ message: "İstifadəçi tapılmadı" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Token etibarsızdır" });
    }
};
