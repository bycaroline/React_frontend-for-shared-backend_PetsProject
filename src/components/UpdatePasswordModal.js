import React, { useState } from 'react';
import UpdatePasswordService from '../services/UpdatePasswordService';

const UpdatePasswordModal = ({ isModalOpen, closeModal }) => {
    const [newPassword, setNewPassword] = useState(''); // State för nytt lösenord
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); // State för att bekräfta nytt lösenord
    const [message, setMessage] = useState(''); // Meddelande till användaren

    // Funktion som hanterar lösenordsuppdatering
    const handleUpdatePassword = async () => {
        const token = localStorage.getItem('token');
        if (newPassword !== confirmNewPassword) {
            setMessage('Lösenorden matchar inte.');
            return;
        }

        const passwordDto = {
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        };

        try {
            await UpdatePasswordService.updatePassword(passwordDto, token);
            setMessage('Lösenordet har uppdaterats!');
            setNewPassword('');
            setConfirmNewPassword('');
            closeModal(); // Stänger modalen efter lyckad uppdatering
        } catch (error) {
            setMessage(error.response?.data?.message || 'Något gick fel vid uppdateringen.');
        }
    };

    return (
        <div>
            {/* Modal */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Uppdatera Lösenord</h2>
                        <input
                            type="password"
                            placeholder="Nytt lösenord"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Bekräfta nytt lösenord"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            style={styles.input}
                        />
                        <button onClick={handleUpdatePassword} style={styles.button}>
                            Uppdatera Lösenord
                        </button>
                        <button onClick={closeModal} style={styles.closeButton}>
                            Stäng
                        </button>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles for the modal and buttons
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
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#426e5f',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    closeButton: {
        padding: '5px 10px',
        backgroundColor: '#807373',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default UpdatePasswordModal;
