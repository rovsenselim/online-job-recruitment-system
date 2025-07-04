import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: { type: String, default: "" },
    industry: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
    announcements: [
        {
            title: String,
            description: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    cvs: [String], // CV faylları burada saxlanır
    profilePic: { type: String, default: "" }
}, { timestamps: true });

const EmployerProfile = mongoose.model("EmployerProfile", employerProfileSchema);
export default EmployerProfile;
