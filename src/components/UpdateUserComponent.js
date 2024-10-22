import React, { useState } from 'react'; // Importing React and useState hook
import UpdateUserService from '../services/UpdateUserService'; // Importing the service for updating users

const UpdateUserComponent = () => {
    const [userId, setUserId] = useState(''); // State to hold the user ID
    const [isAdmin, setIsAdmin] = useState(false); // State to determine if the user is an admin
    const [message, setMessage] = useState(''); // State to hold success or error messages

    const handleUpdateUser = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        // Prepare the DTO (Data Transfer Object) for updating user role
        const updateUserDto = {
            admin: isAdmin // Only include admin status
        };

        try {
            const response = await UpdateUserService.updateUser(userId, updateUserDto, token); // Pass the token to the service
            setMessage('Användaren har uppdaterats'); // Success message if user is updated
        } catch (error) {
            setMessage('Något gick fel'); // Error message if update fails
        }
    };

    return (
        <div>
            <h2>Uppdatera användare</h2>
            <input
                type="text"
                placeholder="Användar-ID"
                onChange={(e) => setUserId(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isAdmin} // Checkbox is checked if isAdmin is true
                    onChange={(e) => setIsAdmin(e.target.checked)} // Handle the change of the checkbox
                />
                Är admin
            </label>
            <button onClick={handleUpdateUser}>Uppdatera användare</button>
            {message && <p>{message}</p>} {/* Display message if it exists */}
        </div>
    );
};

export default UpdateUserComponent; // Exporting the UpdateUserComponent



