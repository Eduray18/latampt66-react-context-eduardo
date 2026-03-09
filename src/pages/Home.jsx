import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Modal } from "../components/Modal";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const checkAndFetchContacts = async () => {
            try {
                // Intentamos obtener los contactos
                const resp = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`);
                
                if (resp.status === 404) {
                    // Si no existe, creamos la agenda automáticamente
                    console.log("Agenda no encontrada, creando...");
                    const createResp = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}`, {
                        method: "POST"
                    });
                    if (createResp.ok) dispatch({ type: "set_contacts", payload: [] });
                } else if (resp.ok) {
                    const data = await resp.json();
                    dispatch({ type: "set_contacts", payload: data.contacts });
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            }
        };
        checkAndFetchContacts();
    }, [store.slug]);

    const askDelete = (id, index) => {
        setSelectedContact({ id, index });
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (selectedContact) {
            const resp = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${selectedContact.id}`, { 
                method: "DELETE" 
            });
            if (resp.ok) dispatch({ type: "delete_contact", payload: selectedContact.index });
        }
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-4">
                <Link to="/demo"><button className="btn btn-success">AGREGAR NUEVOS CONTACTOS</button></Link>
            </div>
            <ul className="list-group">
                {store.contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} index={index} onDelete={() => askDelete(contact.id, index)} />
                ))}
            </ul>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
        </div>
    );
};