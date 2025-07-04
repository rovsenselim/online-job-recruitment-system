// src/components/profile/AddJobModal.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";

function AddJobModal({ open, onClose, onAdd }) {
    let [formData, setFormData] = useState({
        title: "",
        salary: "",
        companyName: "",
        description: "",
        image: null
    });

    let handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    let handleImageChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    let handleSubmit = () => {
        let jobData = {
            ...formData,
            imagePreview: formData.image ? URL.createObjectURL(formData.image) : null
        };

        onAdd(jobData);
        onClose();

        // Form reset
        setFormData({
            title: "",
            salary: "",
            companyName: "",
            description: "",
            image: null
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Yeni Elan Yerləşdir</DialogTitle>
            <DialogContent>
                <TextField
                    name="title"
                    label="İşin adı"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="salary"
                    label="Maaş (AZN)"
                    value={formData.salary}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="companyName"
                    label="Şirkət adı"
                    value={formData.companyName}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="description"
                    label="Əlavə məlumat"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="dense"
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{ mt: 2 }}
                >
                    Şəkil əlavə et
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>
                {formData.image && (
                    <p style={{ fontSize: "0.9em", marginTop: "5px" }}>
                        Seçilmiş şəkil: {formData.image.name}
                    </p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Ləğv et</Button>
                <Button onClick={handleSubmit} color="primary">Yadda saxla</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddJobModal;
