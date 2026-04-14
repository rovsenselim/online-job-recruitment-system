// src/models/profile/employerProfile.model.js

import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    salary: { type: String, default: "" },
    description: { type: String, default: "" },
    location: { type: String, default: "Remote" },
    deadline: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const employerProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    companyName: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    jobPosts: [jobPostSchema],
});

export default mongoose.model("EmployerProfile", employerProfileSchema);
