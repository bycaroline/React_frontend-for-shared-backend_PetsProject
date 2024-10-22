import React, { useState } from 'react'; // Importing React and useState hook
import DeletePetService from "../services/DeletePetService"; // Importing the delete pet service

const DeletePetButton = () => {
    const [petId, setPetId] = useState(''); // State to store the pet ID to be deleted
    const [message, setMessage] = useState(''); // State to store messages for user feedback

    const handleDeletePet = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            await DeletePetService.deletePet(petId, token); // Pass the token to the service
            setMessage('Husdjuret har tagits bort'); // Success message
            setPetId(''); // Clear the input field
        } catch (error) {
            setMessage('Något gick fel vid borttagandet av husdjuret'); // Error message
        }
    };

    return (
        <div>
            <h2>Delete Pet</h2>
            <input
                type="text"
                placeholder="Skriv in husdjurets id"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
            />
            <button onClick={handleDeletePet}>Ta bort husdjur</button>
            {message && <p>{message}</p>} {/* Display message if it exists */}
        </div>
    );
};

export default DeletePetButton; // Exporting the DeletePetButton component for use in other parts of the application

