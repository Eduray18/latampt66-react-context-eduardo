import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, index, onDelete }) => {
    // URL de imagen genérica
    const imgUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    return (
        <li className="list-group-item d-flex align-items-center p-4">
            <img 
                src={imgUrl} 
                alt="user" 
                className="rounded-circle me-4 shadow-sm" 
                style={{ width: "90px", height: "90px", objectFit: "cover", border: "2px solid #eee" }} 
            />
            <div className="flex-grow-1">
                <h5 className="mb-1 fw-bold">{contact.name}</h5>
                <p className="mb-1 text-muted"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                <p className="mb-1 text-muted"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                <p className="mb-0 text-muted"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
            </div>
            <div className="d-flex align-items-center">
                <Link to={`/edit-contact/${index}`} className="btn btn-link text-dark p-2 me-2">
                    <i className="fas fa-pencil-alt fs-5"></i>
                </Link>
                <button className="btn btn-link text-danger p-2" onClick={onDelete}>
                    <i className="fas fa-trash-alt fs-5"></i>
                </button>
            </div>
        </li>
    );
};