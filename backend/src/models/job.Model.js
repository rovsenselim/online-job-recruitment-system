// src/models/job.Model.js

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: Number, required: true },
        location: { type: String, default: "Remote" },
        jobType: { type: String, default: "Full-time" },
        company: { type: String, required: true },
        category: { type: String, default: "" },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Kim əlavə edib
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
