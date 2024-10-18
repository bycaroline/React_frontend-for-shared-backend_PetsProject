import React, { useState } from 'react'; // Importing React and useState hook
import updateUserService from '../services/updateUserService'; // Importing the service for updating users

const UpdateUserComponent = () => {
    const [userId, setUserId] = useState(''); // State to hold the user ID
    const [isAdmin, setIsAdmin] = useState(false); // State to determine if the user is an admin
    const [message, setMessage] = useState(''); // State to hold success or error messages

    // Function to handle the user update
    const handleUpdateUser = async () => {
        // Prepare the DTO (Data Transfer Object) for updating user role
        const updateUserDto = {
            isAdmin: isAdmin // This is the only field that can be updated
        };

        try {
            // Call the service to update the user with the given ID and DTO
            const response = await updateUserService.updateUser(userId, updateUserDto);
            setMessage('Användaren har nu rollen admin'); // Success message if user is updated
        } catch (error) {
            setMessage('Något gick fel'); // Error message if update fails
        }
    };

    return (
        <div>
            <h2>Uppdatera användarens roll</h2> {/* Title for the update user role section */}
            <input
                type="text"
                placeholder="Användar-ID" // This is the ID of the user that will be updated
                onChange={(e) => setUserId(e.target.value)} // Update userId state on input change
            />
            <label>
                <input
                    type="checkbox"
                    checked={isAdmin} // Checkbox is checked if isAdmin is true
                    onChange={(e) => setIsAdmin(e.target.checked)} // Handle the change of the checkbox
                />
                Is Admin {/* Label for the checkbox to indicate admin role */}
            </label>
            <button onClick={handleUpdateUser}>Uppdatera användare</button> {/* Button to trigger user update */}
        </div>
    );
};

export default UpdateUserComponent; // Exporting the component for use in other parts of the application
