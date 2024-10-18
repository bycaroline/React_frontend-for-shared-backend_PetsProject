import React, { useState } from 'react';
import updateUserService from '../services/updateUserService';

const UpdateUserComponent = () => {
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdateUser = async () => {
        const updateUserDto = {
            isAdmin: isAdmin // This is the only field that can be updated
        };

        try {
            const response = await updateUserService.updateUser(userId, updateUserDto);
            setMessage('Användaren har nu rollen admin');
        } catch (error) {
            setMessage('Något gick fel');
        }
    };
    return (
        <div>
            <h2>Uppdatera användarens roll</h2>
            <input
                type="text"
                placeholder="Användar-ID" // This is the ID of the user that will be updated
                onChange={(e) => setUserId(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)} //Handle the change of the checkbox
                />
                Is Admin // Label for the checkbox
            </label>
            <button onClick={{handleUpdateUser}}>Uppdatera användare</button>
        </div>
    );
};

export default UpdateUserComponent;