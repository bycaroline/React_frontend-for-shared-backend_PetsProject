import React, { useState } from 'react';
import UpdatePetService from "../services/UpdatePetService";

const UpdatePetForm = () => {
    const [petId, setPetId] = useState('');
    const [petData, setPetData] = useState({
        species: '',
        breed: '',
        name: '',
        birthdate: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setPetData({
            ...petData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdatePet = async () => {
        const token = localStorage.getItem('token'); //ta token från localStorage

        try {
            await UpdatePetService.updatePet(petId, petData, token);
            setMessage('Husdjuret har uppdaterats!');
            setPetId('');
            setPetData({ species: '', breed: '', name: '', birthdate: '' });
        } catch (error) {
            setMessage('Något gick fel vid uppdateringen av husdjuret');
        }
    };

    return (
        <div>
            <h2>Uppdatera Husdjur</h2>
            <input
                type="text"
                placeholder="Skriv in husdjurets id"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
            />
            <input
                type="text"
                name="species"
                placeholder="Art"
                value={petData.species}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="breed"
                placeholder="Ras"
                value={petData.breed}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="name"
                placeholder="Namn"
                value={petData.name}
                onChange={handleInputChange}
            />
            <input
                type="date"
                name="birthdate"
                value={petData.birthdate}
                onChange={handleInputChange}
            />
            <button onClick={handleUpdatePet}>Uppdatera husdjur</button>
            {message && <p>{message}</p>} {/* visar om det finns nåt meddelande */}
        </div>
    );
};

export default UpdatePetForm;
