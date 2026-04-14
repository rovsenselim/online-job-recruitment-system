// backend/src/models/profile/cv.model.js
import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EmployeeProfile",
            required: true,
        },
        filename: {
            type: String,
            required: true,
        },
        cvFullname: {
            type: String,
            required: true,
        },
        cvProfession: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            default: "Unknown",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

const CV = mongoose.model("CV", cvSchema);
export default CV;
