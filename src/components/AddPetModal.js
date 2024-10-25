import React, { useState } from 'react';
import AddPetService from "../services/AddPetService";

const AddPetModal = ({ isModalOpen, closeModal }) => {
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [message, setMessage] = useState('');

    const handleAddPet = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const payload = {
                species,
                breed,
                name,
                birthDate: birthdate
            };
            await AddPetService.addPet(payload, token);
            setMessage('Husdjuret har lagts till!');
            setSpecies('');
            setBreed('');
            setName('');
            setBirthdate('');
            closeModal(); // Stänger modalen vid lyckad tilläggning
        } catch (error) {
            console.error('Error adding pet:', error.response);
            setMessage('Något gick fel vid tillägg av husdjuret');
        }
    };

    return (
        <div>
            {/* Modal */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Lägg till husdjur</h2>
                        <form>
                            <select value={species} onChange={(e) => setSpecies(e.target.value)}>
                                <option value="">Välj art</option>
                                <option value="DOG">Hund</option>
                                <option value="CAT">Katt</option>
                                <option value="BIRD">Fågel</option>
                                <option value="RODENT">Gnagar</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Skriv in ras"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Skriv in namn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="date"
                                placeholder="Födelsedatum (åååå-mm-dd)"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                style={styles.input}
                            />
                            <button type="button" onClick={handleAddPet} style={styles.button}>
                                Lägg till husdjur
                            </button>
                            <button type="button" onClick={closeModal} style={styles.closeButton}>
                                Stäng
                            </button>
                            {message && <p>{message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#426e5f',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    closeButton: {
        padding: '10px 20px',
        backgroundColor: '#807373',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AddPetModal;
