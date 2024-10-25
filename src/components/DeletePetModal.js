import React, { useState } from 'react'; // Import React and useState hook
import DeletePetService from "../services/DeletePetService"; // Importing the delete pet service

const DeletePetModal = ({ isModalOpen, closeModal }) => {
    const [petId, setPetId] = useState(''); // State to store the pet ID to be deleted
    const [message, setMessage] = useState(''); // State to store messages for user feedback

    const handleDeletePet = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            await DeletePetService.deletePet(petId, token); // Call the delete service with pet ID and token
            setMessage('Husdjuret har tagits bort'); // Success message
            setPetId(''); // Clear the input field
            closeModal(); // Close modal on success
        } catch (error) {
            setMessage('Något gick fel vid borttagandet av husdjuret'); // Error message
        }
    };

    return (
        <div>
            {/* Modal */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Ta bort husdjur</h2>
                        <input
                            type="text"
                            placeholder="Skriv in husdjurets id"
                            value={petId}
                            onChange={(e) => setPetId(e.target.value)}
                        />
                        <button style={styles.deleteButton} onClick={handleDeletePet}>
                            Bekräfta borttagning
                        </button>
                        <button style={styles.closeButton} onClick={closeModal}>
                            Avbryt
                        </button>
                        {message && <p>{message}</p>} {/* Display message if it exists */}
                    </div>
                </div>
            )}
        </div>
    );
};

// CSS styles for the modal and buttons
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
        width: '300px',
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: '#426e5f',
        color: '#fff',
        padding: '10px 15px',
        margin: '10px',
        border: 'none',
        cursor: 'pointer',
    },
    closeButton: {
        backgroundColor: '#807373',
        color: '#fff',
        padding: '10px 15px',
        margin: '10px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default DeletePetModal;
