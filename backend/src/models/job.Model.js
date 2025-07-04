import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, default: "Remote" },
    jobType: { type: String, default: "Full-time" },
    company: { type: String, default: "Unknown" },
    category: { type: String, default: "General" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
