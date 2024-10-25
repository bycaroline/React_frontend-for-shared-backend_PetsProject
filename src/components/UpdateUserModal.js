import React, { useState } from 'react';
import UpdateUserService from '../services/UpdateUserService';

const UpdateUserModal = ({ isModalOpen, closeModal }) => {
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdateUser = async () => {
        const token = localStorage.getItem('token');

        if (!userId) {
            setMessage('Användar-ID måste fyllas i.');
            return;
        }

        const updateUserDto = {
            admin: isAdmin
        };

        try {
            await UpdateUserService.updateUser(userId, updateUserDto, token);
            setMessage('Användaren har uppdaterats');
            setUserId('');
            setIsAdmin(false);
            closeModal(); // Stänger modalen när uppdateringen lyckas
        } catch (error) {
            setMessage('Något gick fel');
        }
    };

    return (
        <div>
            {/* Modal fönster */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>Uppdatera användare</h2>
                        <input
                            type="text"
                            placeholder="Användar-ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            style={styles.input}
                        />
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            Är admin
                        </label>
                        <button onClick={handleUpdateUser} style={styles.button}>
                            Uppdatera användare
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
    checkboxLabel: {
        display: 'block',
        marginBottom: '10px',
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

export default UpdateUserModal;




