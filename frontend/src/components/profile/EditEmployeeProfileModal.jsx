import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";
import { updateEmployeeProfile } from "../../services/profileAPI";
import { toast } from "react-toastify";

export default function EditEmployeeProfileModal({ open, onClose, profile, onSave }) {
    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        location: "",
        experience: "",
        skills: "",
        description: ""
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                fullname: profile.fullname || "",
                phone: profile.phone || "",
                location: profile.location || "",
                experience: profile.experience || "",
                skills: profile.skills?.join(", ") || "",
                description: profile.description || "",
            });
        }
    }, [profile]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const dataToSend = {
            ...formData,
            skills: formData.skills.split(",").map(s => s.trim())
        };

        try {
            await updateEmployeeProfile(profile.userId, dataToSend);
            toast.success("Profil uğurla yeniləndi");
            onSave();
            onClose();
        } catch (err) {
            console.error("Profil yenilənərkən xəta:", err);
            toast.error("Profil yenilənərkən xəta baş verdi");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Profil Redaktə</DialogTitle>
            <DialogContent>
                {["fullname", "phone", "location", "experience", "skills", "description"].map(name => (
                    <TextField
                        key={name}
                        margin="dense"
                        label={name === "fullname" ? "Ad Soyad"
                            : name === "experience" ? "Təcrübə"
                                : name === "description" ? "Əlavə"
                                    : name.charAt(0).toUpperCase() + name.slice(1)}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        fullWidth
                        multiline={name === "description"}
                        rows={name === "description" ? 3 : 1}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Ləğv et</Button>
                <Button onClick={handleSubmit} color="primary">Yadda saxla</Button>
            </DialogActions>
        </Dialog>
    );
}
