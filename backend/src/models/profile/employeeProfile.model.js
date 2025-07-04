import mongoose from "mongoose";

const employeeProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    fullname: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    experience: { type: String, default: "" },
    clients: { type: Number, default: 0 },
    skills: { type: [String], default: [] },
    description: { type: String, default: "" },  // <-- Əlavə olundu
    profilePic: { type: String, default: "" },
    cvs: { type: [String], default: [] },
    cvForms: {
        type: [
            {
                company: { type: String, default: "" },
                position: { type: String, default: "" },
                startDate: { type: String, default: "" },
                endDate: { type: String, default: "" },
                description: { type: String, default: "" }
            }
        ],
        default: []
    }
}, { timestamps: true });

const EmployeeProfile = mongoose.model("EmployeeProfile", employeeProfileSchema);
export default EmployeeProfile;
