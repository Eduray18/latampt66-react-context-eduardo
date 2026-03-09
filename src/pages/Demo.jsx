import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { index } = useParams(); // Parámetro dinámico para edición

    const [contact, setContact] = useState({
        name: "", email: "", phone: "", address: ""
    });

    useEffect(() => {
        if (index !== undefined && store.contacts[index]) {
            setContact(store.contacts[index]);
        }
    }, [index, store.contacts]);

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEditing = index !== undefined;
        const url = isEditing 
            ? `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${store.contacts[index].id}`
            : `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`;
        
        try {
            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                const data = await response.json();
                if (isEditing) {
                    dispatch({ type: "edit_contact", payload: { index: parseInt(index), contact: data } });
                } else {
                    dispatch({ type: "add_contact", payload: data });
                }
                navigate("/");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{index !== undefined ? "Editar contacto" : "Agregar nuevo contacto"}</h1>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" value={contact.name} className="form-control" placeholder="Full Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={contact.email} className="form-control" placeholder="Enter email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name="phone" value={contact.phone} className="form-control" placeholder="Enter phone" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" value={contact.address} className="form-control" placeholder="Enter address" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">save</button>
                <Link to="/" className="mt-3 d-block text-center">regresar a tus contactos</Link>
            </form>
        </div>
    );
};