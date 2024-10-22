import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import '../CSS/List.css'; // Importera den gemensamma CSS-filen för alla listor

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [owners, setOwners] = useState(new Map()); // För att lagra användarinformation
    const [searchTerm, setSearchTerm] = useState(''); // För att lagra sökfrågan
    const [filteredPets, setFilteredPets] = useState([]); // För att lagra filtrerade husdjur
    const [expandedIndex, setExpandedIndex] = useState(null); // Hålla koll på expanderat objekt via index

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
                    const response = await apiService.get(`/users/id/${pet.userId}`); // Hämta användare baserat på userId
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

    // Hantera klick för att expandera eller kollapsa ett husdjur baserat på index
    const handleToggle = (index) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index)); // Växla expanderat index
    };

    return (
        <div className="list-container"> {/* Använd den gemensamma "list-container"-klassen */}
            <h2>Husdjur</h2>
            <input 
                type="text" 
                placeholder="Search by name, breed, species, or owner" 
                value={searchTerm}
                onChange={handleSearch} // Anropa handleSearch när användaren skriver
            />
            <ul>
                {filteredPets.map((pet, index) => (
                    <li 
                        key={index} 
                        className={`list-item ${expandedIndex === index ? 'expanded' : ''}`} // Använd generiska "list-item" och "expanded"
                        onClick={() => handleToggle(index)} // Använd index som identifierare för expandering
                    >
                        <div className="list-info"> {/* Använd den generiska "list-info"-klassen */}
                            <strong>{pet.name}</strong> {pet.species.charAt(0).toUpperCase() + pet.species.slice(1).toLowerCase()}
                        </div>
                        {expandedIndex === index && ( // Visa mer information om det här objektet är expanderat
                            <div className="expanded-info"> {/* Använd den generiska "expanded-info"-klassen */}
                                <p>Ras: {pet.breed}</p>
                                <p>Ägare: {(owners.get(pet.userId) || 'Unknown').charAt(0).toUpperCase() + (owners.get(pet.userId) || 'Unknown').slice(1).toLowerCase()}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PetList;
