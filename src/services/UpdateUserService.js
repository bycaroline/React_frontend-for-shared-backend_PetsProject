import React, { useState } from 'react';
import UpdateUserService from '../services/UpdateUserService'; // Importing the update service

const UpdateUserComponent = () => {
    const [userId, setUserId] = useState(''); // ID for the user being updated
    const [isAdmin, setIsAdmin] = useState(false); // Admin role toggle
    const [message, setMessage] = useState(''); // Feedback message

    const handleUpdateUser = async () => {
        // Prepare the request body to match the Swagger specification
        const updateUserDto = {
            username: "", // Leave username empty if not being updated
            password: "", // Leave password empty if not being updated
            admin: isAdmin // Update only the admin status
        };

        try {
            // Send the request to update the user
            const response = await UpdateUserService.updateUser(userId, updateUserDto);
            setMessage('Användarens roll har uppdaterats till admin.');
        } catch (error) {
            setMessage('Något gick fel vid uppdateringen av användaren.');
        }
    };

    return (
        <div>
            <h2>Uppdatera användarens roll</h2>
            <input
                type="text"
                placeholder="Användar-ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
                Är admin
            </label>
            <button onClick={handleUpdateUser}>Uppdatera användare</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUserComponent;

