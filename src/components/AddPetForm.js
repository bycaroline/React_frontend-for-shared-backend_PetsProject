import React, { useState } from 'react';
import AddPetService from "../services/AddPetService";

const AddPetForm = () => {
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [message, setMessage] = useState('');

    const handleAddPet = async (event) => {
        event.preventDefault(); // Förhindrar att formuläret skickas direkt

        try {
            const token = localStorage.getItem('token');
            const payload = {
                "species": species,
                "breed": breed,
                "name": name,
                "birthDate": birthdate
            }
            await AddPetService.addPet(payload, token);
            setMessage('Husdjuret har lagts till!');
            setSpecies('');
            setBreed('');
            setName('');
            setBirthdate('');
        } catch (error) {
            console.error('Error adding pet:', error.response);
            setMessage('Något gick fel vid tillägg av husdjuret');
        }
    };

    return (
        <div>
            <h2>Lägg till husdjur</h2>
            <form>
                <select value={species} onChange={(e) => setSpecies(e.target.value)}>
                    <option value="">Välj art</option>
                    <option value="DOG">Hund</option>
                    <option value="CAT">Katt</option>
                    <option value="BIRD">Fågel</option>
                    <option value="RODENT">Gnagar</option>
                </select>
                <input
                    type="text"
                    placeholder="Skriv in ras"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Skriv in namn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Födelsedatum (åååå-mm-dd)"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
                <button type="button" onClick={handleAddPet}>Lägg till husdjur</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default AddPetForm;