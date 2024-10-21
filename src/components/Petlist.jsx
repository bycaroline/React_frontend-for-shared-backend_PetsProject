import React, { useEffect, useState } from 'react';
import apiService from './apiService';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await apiService.get('/pet/all');
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching pets', error);
        }
    };

    const handleSort = (field) => {
        setSortBy(field);
        const sortedPets = [...pets].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setPets(sortedPets);
    };

    return (
        <div>
            <h2>All Pets</h2>
            <div>
                <button onClick={() => handleSort('breed')}>Sort by Breed</button>
                <button onClick={() => handleSort('name')}>Sort by Name</button>
                <button onClick={() => handleSort('user.username')}>Sort by Owner</button>
                <button onClick={() => handleSort('species')}>Sort by Species</button>
            </div>
            <ul>
                {pets.map((pet) => (
                    <li key={pet.id}>
                        <strong>{pet.name}</strong> ({pet.breed}) - Owner: {pet.user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PetList;
