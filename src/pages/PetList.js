import React from 'react';

const PetList = ({ pets, handleUpdatePet }) => (
    <div>
        <h2>Your Pets</h2>
        <ul>
            {pets.map((pet) => (
                <li key={pet.id}>
                    <h3>{pet.name}</h3>
                    <p>Species: {pet.species}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Birthdate: {pet.birthdate}</p>
                    <button onClick={() => handleUpdatePet(pet.id, { /* Uppdateringsdata */ })}>
                        Update Pet
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default PetList;
