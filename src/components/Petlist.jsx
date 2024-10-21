import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import '../CSS/PetList.css'; // Importera CSS-filen

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [owners, setOwners] = useState(new Map()); // För att lagra användarinformation
    const [searchTerm, setSearchTerm] = useState(''); // För att lagra sökfrågan
    const [filteredPets, setFilteredPets] = useState([]); // För att lagra filtrerade husdjur

    useEffect(() => {
        fetchPets();
    }, []);

    useEffect(() => {
        setFilteredPets(pets); // När komponenten laddas, sätt initialt filtrerade husdjur till alla husdjur
    }, [pets]);

    const fetchPets = async () => {
        try {
            const response = await apiService.get('/pet/all');
            setPets(response.data);
            fetchOwners(response.data); // Hämta ägarinformation när husdjuren har hämtats
        } catch (error) {
            console.error('Error fetching pets', error);
        }
    };

    const fetchOwners = async (pets) => {
        const ownerPromises = pets.map(async (pet) => {
            if (pet.userId) {
                try {
                    const response = await apiService.get(`/api/users/id/${pet.userId}`); // Hämta användare baserat på userId
                    return { userId: pet.userId, username: response.data.username };
                } catch (error) {
                    console.error(`Error fetching user for pet ${pet.id}`, error);
                    return { userId: pet.userId, username: 'Unknown' }; // Om det inte går att hämta användaren
                }
            }
            return { userId: pet.userId, username: 'Unknown' }; // Ingen userId
        });

        const ownersArray = await Promise.all(ownerPromises); // Vänta tills alla användaruppgifter har hämtats
        const ownerMap = new Map(ownersArray.map(owner => [owner.userId, owner.username])); // Skapa en Map av ägaruppgifter
        setOwners(ownerMap); // Spara användarna i state
    };

    // Filtrera husdjuren baserat på sökfrågan
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = pets.filter(pet => {
            const nameMatch = pet.name.toLowerCase().includes(term);
            const breedMatch = pet.breed.toLowerCase().includes(term);
            const speciesMatch = pet.species.toLowerCase().includes(term);
            const ownerMatch = owners.get(pet.userId)?.toLowerCase().includes(term) || false; // Kontrollera om användare finns

            return nameMatch || breedMatch || speciesMatch || ownerMatch; // Returnera true om någon matchning finns
        });

        setFilteredPets(filtered); // Uppdatera filtrerade husdjur
    };

    return (
        <div className="pet-list-container">
            <h2>All Pets</h2>
            <input 
                type="text" 
                placeholder="Search by name, breed, species, or owner" 
                value={searchTerm}
                onChange={handleSearch} // Anropa handleSearch när användaren skriver
            />
            <ul>
                {filteredPets.map((pet, index) => (
                    <li key={pet.id || index}> {/* Use index as a fallback key */}
                        <div className="pet-info">
                            <strong>{pet.name}</strong> ({pet.breed}) - Species: {pet.species} - Owner: {owners.get(pet.userId) || 'Unknown'}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default PetList;
