import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Giriş tələb olunur" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "İstifadəçi tapılmadı" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token etibarsızdır və ya vaxtı keçib" });
    }
};
