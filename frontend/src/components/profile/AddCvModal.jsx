// src/components/profile/AddCvModal.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

function AddCvModal({ open, onClose, onAdd }) {
    const [cvFile, setCvFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCvFile(file);
        }
    };

    const handleSubmit = () => {
        if (cvFile) {
            onAdd(cvFile);
            onClose();
            setCvFile(null);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Yeni CV Yüklə</DialogTitle>
            <DialogContent>
                <Button variant="outlined" component="label">
                    CV Faylı Seç (.pdf, .doc, .docx)
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                {cvFile && (
                    <Typography mt={2} variant="body2">
                        Seçilmiş Fayl: {cvFile.name}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Ləğv et</Button>
                <Button onClick={handleSubmit} color="primary">Yadda saxla</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCvModal;
