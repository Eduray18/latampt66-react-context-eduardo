import React from "react";

export const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Estás seguro?</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Si eliminas este contacto, no podrás recuperarlo.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Oh no!</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Si, bórralo!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};