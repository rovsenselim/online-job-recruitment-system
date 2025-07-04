import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { updateEmployerProfile } from "../../services/profileAPI";
import { toast } from "react-toastify";

const EditEmployerProfileModal = ({ open, onClose, profile, onSave, userId }) => {
    let [formData, setFormData] = useState({
        companyName: "",
        phone: "",
        location: "",
        website: "",
        industry: "",
        description: "",
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                companyName: profile.companyName || "",
                phone: profile.phone || "",
                location: profile.location || "",
                website: profile.website || "",
                industry: profile.industry || "",
                description: profile.description || "",
            });
        }
    }, [profile]);

    let handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    let handleSubmit = async () => {
        try {
            await updateEmployerProfile(userId, formData);
            toast.success("Profil yeniləndi");
            onSave(); // refresh profile
            onClose(); // close modal
        } catch (err) {
            toast.error("Profil yenilənmədi");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Şirkət Profilini Redaktə Et</DialogTitle>
            <DialogContent>
                <TextField name="companyName" label="Şirkət Adı" value={formData.companyName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="phone" label="Telefon" value={formData.phone} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="location" label="Ünvan" value={formData.location} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="website" label="Vebsayt" value={formData.website} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="industry" label="Sektor" value={formData.industry} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="description" label="Haqqımızda" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Ləğv et</Button>
                <Button onClick={handleSubmit} color="primary">Yadda saxla</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEmployerProfileModal;
