import mongoose from "mongoose";

// CV sub-schema
const cvSchema = new mongoose.Schema({
    fullname: { type: String, default: "" },
    profession: { type: String, default: "" },
    filename: { type: String, required: true },
    path: { type: String, required: true }
});

// Employee Profile Schema
const employeeProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullname: { type: String, default: "" },
    profession: { type: String, default: "" },
    age: { type: Number, default: null },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    experience: { type: String, default: "" },
    skills: {
        type: [String],
        default: [],
        set: v => Array.isArray(v) ? v : [v]
    },
    description: { type: String, default: "" },
    cvs: { type: [cvSchema], default: [] },
    profilePic: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model("EmployeeProfile", employeeProfileSchema);
