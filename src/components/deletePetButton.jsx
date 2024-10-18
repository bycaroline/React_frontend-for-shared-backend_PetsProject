import React, { useState } from 'react';
import deletePetService from "../services/deletePetService";

const DeletePetButton = () => {
    const [petId, setPetId] = useState('');
    const [message, setMessage] = useState('');

    const handleDeletePet = async () => {
        try {
            await deletePetService.deletePet(petId);
            setMessage('Husdjuret har tagits bort');
            setPetId('');
        } catch (error) {
            setMessage('Något gick fel vid borttagandet av husdjuret');
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
            <button onClick={{handleDeletePet}}>Ta bort husdjur</button>
            {message && <p>{message}</p>} {/* Display message */}
        </div>
    );
};

export default DeletePetButton;
