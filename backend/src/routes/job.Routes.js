import express from "express";
import Job from "../models/job.Model.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Bütün elanları almaq üçün GET
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json({ jobs });
    } catch (err) {
        console.error("Job get error:", err);
        res.status(500).json({ message: "Elanlar alınarkən xəta baş verdi" });
    }
});

// Tək elanı almaq üçün GET /:id
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Elan tapılmadı" });
        }
        res.json(job);
    } catch (error) {
        console.error("Job get by ID error:", error);
        res.status(500).json({ message: "Server xəta" });
    }
});

// ✅ Yeni elan yaratmaq üçün POST (PROTECT ƏLAVƏ EDİLDİ)
router.post("/", protect, async (req, res) => {
    try {
        const {
            title,
            description,
            salary,
            location,
            jobType,
            company,
            category,
        } = req.body;

        if (!title || !description || !salary || !company) {
            return res.status(400).json({ message: "Zəruri məlumatlar daxil edilməyib" });
        }

        const newJob = new Job({
            title,
            description,
            salary,
            location,
            jobType,
            company,
            category,
            postedBy: req.user._id, // ✅ ƏSAS DÜZƏLİŞ
        });

        const savedJob = await newJob.save();

        res.status(201).json(savedJob);
    } catch (error) {
        console.error("Job create error:", error);
        res.status(500).json({ message: "Elan yerləşdirərkən xəta baş verdi" });
    }
});

// Elanı redaktə etmək üçün PUT
router.put("/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedData = req.body;

        const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
        if (!updatedJob) return res.status(404).json({ message: "Elan tapılmadı" });

        res.json(updatedJob);
    } catch (error) {
        console.error("Job update error:", error);
        res.status(500).json({ message: "Elan yenilənərkən xəta baş verdi" });
    }
});

// Elanı silmək üçün DELETE
router.delete("/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) return res.status(404).json({ message: "Elan tapılmadı" });

        res.json({ message: "Elan uğurla silindi" });
    } catch (error) {
        console.error("Job delete error:", error);
        res.status(500).json({ message: "Elan silinərkən xəta baş verdi" });
    }
});

export default router;
