import express from "express";
import Job from "../models/job.Model.js";

const router = express.Router();

// Bütün elanları almaq üçün GET route
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json({ jobs });
    } catch (err) {
        console.error("Job get error:", err);
        res.status(500).json({ message: "Elanlar alınarkən xəta baş verdi" });
    }
});

// Yeni elan yaratmaq üçün POST route
router.post("/", async (req, res) => {
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

        if (!title || !description || !salary) {
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
        });

        const savedJob = await newJob.save();

        res.status(201).json(savedJob);
    } catch (error) {
        console.error("Job create error:", error);
        res.status(500).json({ message: "Elan yerləşdirərkən xəta baş verdi" });
    }
});

export default router;
