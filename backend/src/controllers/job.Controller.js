import Job from "../models/job.Model.js";

// Yeni elan yarat
export const createJob = async (req, res) => {
    try {
        // Yalnız employer rolundakı istifadəçi iş elan yarada bilər
        if (req.user.role !== "employer") {
            return res.status(403).json({ message: "Yalnız işəgötürən iş elan əlavə edə bilər" });
        }

        const job = new Job({ ...req.body, postedBy: req.user.id });
        await job.save();
        return res.status(201).json({ message: "Job created", job });
    } catch (err) {
        console.error("❌ Job creation error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Bütün elanları gətir
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        return res.status(200).json({ jobs });
    } catch (err) {
        console.error("❌ Get jobs error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Tək elanı gətir
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({ job });
    } catch (err) {
        console.error("❌ Get job by ID error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Elanı yenilə
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({ message: "Job updated", job });
    } catch (err) {
        console.error("❌ Update job error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Elanı sil
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        return res.status(200).json({ message: "Job deleted" });
    } catch (err) {
        console.error("❌ Delete job error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
