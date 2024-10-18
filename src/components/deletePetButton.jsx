import React, { useState } from 'react'; // Importing React and useState hook for managing state
import deletePetService from "../services/deletePetService"; // Importing the delete pet service

const DeletePetButton = () => {
    // State to store the pet ID to be deleted
    const [petId, setPetId] = useState('');
    // State to store messages for user feedback
    const [message, setMessage] = useState('');

    // Function to handle the deletion of the pet
    const handleDeletePet = async () => {
        try {
            // Attempt to delete the pet using the provided pet ID
            await deletePetService.deletePet(petId);
            setMessage('Husdjuret har tagits bort'); // Success message
            setPetId(''); // Clear the input field
        } catch (error) {
            // If an error occurs during deletion, set an error message
            setMessage('Något gick fel vid borttagandet av husdjuret');
        }
    };

    return (
        <div>
            <h2>Delete Pet</h2>
            <input
                type="text"
                placeholder="Skriv in husdjurets id" // Placeholder for the pet ID input field
                value={petId} // Controlled input value
                onChange={(e) => setPetId(e.target.value)} // Update petId state on input change
            />
            <button onClick={handleDeletePet}>Ta bort husdjur</button> {/* Button to delete pet */}
            {message && <p>{message}</p>} {/* Display message if it exists */}
        </div>
    );
};

export default DeletePetButton; // Exporting the DeletePetButton component for use in other parts of the application

