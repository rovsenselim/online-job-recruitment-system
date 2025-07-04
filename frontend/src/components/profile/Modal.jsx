import React from "react";
import "./Modal.css"; // Stil faylını import edirik

function Modal({ title, onClose, onSave, children }) {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="save-button" onClick={onSave}>Yadda saxla</button>
                    <button className="cancel-button" onClick={onClose}>İmtina et</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
