import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import EmployeeProfile from "../models/profile/employeeProfile.model.js";
import EmployerProfile from "../models/profile/employerProfile.model.js";
import RegisterValidationSchema from "../middleware/validation/RegisterValidation.js";
import { generateToken } from "../../utils/generateToken.js";

// Register
export const registerUser = async (req, res) => {
    try {
        const {
            fullname,
            companyName,
            username,
            email,
            password,
            confirmPassword,
            role,
            terms,
        } = req.body;

        const { error } = RegisterValidationSchema.validate({
            fullname,
            companyName,
            username,
            email,
            password,
            confirmPassword,
            role,
            terms,
        });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const existUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            ...(role === "employee" && { fullname }),
            ...(role === "employer" && { companyName }),
        });

        await newUser.save();

        // İlk dəfə profil yaradılır
        if (role === "employee") {
            await EmployeeProfile.create({
                userId: newUser._id,
                email: newUser.email,
                fullname: fullname || "",
                phone: "",
                location: "",
                experience: "",
                clients: 0,
                skills: [],
                profilePic: "",
                cvs: [],
            });
        } else if (role === "employer") {
            await EmployerProfile.create({
                userId: newUser._id,
                email: newUser.email,
                companyName: companyName || "",
                website: "",
                industry: "",
                location: "",
                description: "",
                logo: "",
            });
        }

        const token = generateToken(newUser._id, res);

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id, res);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};
