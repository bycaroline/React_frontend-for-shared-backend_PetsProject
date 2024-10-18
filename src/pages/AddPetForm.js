import React from 'react';

const AddPetForm = ({ newPet, setNewPet, handleAddPet }) => (
    <form onSubmit={handleAddPet}>
        <input
            type="text"
            placeholder="Name"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
            required
        />
        <input
            type="text"
            placeholder="Species"
            value={newPet.species}
            onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
            required
        />
        <input
            type="text"
            placeholder="Breed"
            value={newPet.breed}
            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
            required
        />
        <input
            type="date"
            placeholder="Birthdate"
            value={newPet.birthdate}
            onChange={(e) => setNewPet({ ...newPet, birthdate: e.target.value })}
            required
        />
        <button type="submit">Add Pet</button>
    </form>
);

export default AddPetForm;
