import React, { useState } from 'react';
import DeleteUserService from '../services/DeleteUserService';

const DeleteUserModal = ({ show, handleClose }) => {
    const [userId, setUserId] = useState(''); // State för att lagra användar-ID
    const [message, setMessage] = useState(''); // State för att lagra meddelanden för användarfeedback

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            const response = await DeleteUserService.deleteUser(userId, token);
            if (response.status === 200) {
                setMessage(`Användare med ID ${userId} har tagits bort!`); // Framgångsmeddelande
                setUserId(''); // Rensa inputfältet

                // Stäng modalen efter 2 sekunder
                setTimeout(() => {
                    handleClose(); // Stäng modalen efter en kort stund
                }, 2000);
            } else {
                setMessage('Användaren hittades inte.'); // Felmeddelande
            }
        } catch (error) {
            setMessage('Ett fel uppstod vid försök att ta bort användaren.'); // Felmeddelande
        }
    };



    return (
        <div>
            {/* Modal */}
            {show && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Ta bort användare</h2>
                        <input
                            type="text"
                            placeholder="Ange användar-ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <button style={styles.deleteButton} onClick={handleDeleteUser}>
                            Bekräfta borttagning
                        </button>
                        <button style={styles.closeButton} onClick={handleClose}>
                            Avbryt
                        </button>
                        {message && <p>{message}</p>} {/* Visa meddelande om det finns */}
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

export default DeleteUserModal;

