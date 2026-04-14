import express from "express";
import Job from "../models/job.Model.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// YENİ ELAN YARAT (EMPLOYER)
// ==========================
router.post("/", protect, async (req, res) => {
    try {
        // DEBUG
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);

        if (!req.user || req.user.role !== "employer") {
            return res
                .status(403)
                .json({ message: "Yalnız işəgötürən iş elan əlavə edə bilər" });
        }

        const salaryNum = Number(req.body.salary);
        if (isNaN(salaryNum)) {
            return res.status(400).json({ message: "Salary must be a valid number" });
        }

        const jobData = {
            title: req.body.title,
            description: req.body.description,
            salary: salaryNum,
            location: req.body.location,
            jobType: req.body.jobType,
            company: req.body.company,
            category: req.body.category,
            postedBy: req.user._id, // 🔴 BURASI ƏSASDIR
        };

        const job = new Job(jobData);
        await job.save();

        return res.status(201).json({
            message: "Job created successfully",
            job,
        });
    } catch (err) {
        console.error("❌ Job creation error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ==========================
// BÜTÜN ELANLARI GƏTİR
// ==========================
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        return res.status(200).json({ jobs });
    } catch (err) {
        console.error("❌ Get jobs error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ==========================
// TƏK ELANI GƏTİR
// ==========================
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ job });
    } catch (err) {
        console.error("❌ Get job by ID error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ==========================
// ELANI YENİLƏ
// ==========================
router.put("/:id", protect, async (req, res) => {
    try {
        if (req.body.salary) {
            const salaryNum = Number(req.body.salary);
            if (isNaN(salaryNum)) {
                return res.status(400).json({ message: "Salary must be a valid number" });
            }
            req.body.salary = salaryNum;
        }

        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json({ message: "Job updated", job });
    } catch (err) {
        console.error("❌ Update job error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ==========================
// ELANI SİL
// ==========================
router.delete("/:id", protect, async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ message: "Job deleted" });
    } catch (err) {
        console.error("❌ Delete job error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;
