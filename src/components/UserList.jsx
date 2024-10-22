import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import '../CSS/List.css'; // Importera den gemensamma CSS-filen för alla listor

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Sökterm för filtrering
    const [filteredUsers, setFilteredUsers] = useState([]); // För filtrerade användare
    const [expandedIndex, setExpandedIndex] = useState(null); // Håller reda på expanderat objekt via index

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(users); // När användare hämtas, sätt initialt alla som filtrerade
    }, [users]);

    // Hämta användare från backend
    const fetchUsers = async () => {
        try {
            const response = await apiService.get('/users/all'); // Ändra detta till rätt endpoint för användare
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    // Filtrera användare baserat på sökfrågan
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = users.filter(user => {
            return user.username.toLowerCase().includes(term); // Matcha användarnamn med sökterm
        });

        setFilteredUsers(filtered); // Uppdatera filtrerade användare
    };

    // Hantera expandering och kollaps av listobjekt
    const handleToggle = (index) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index)); // Växla expanderat index
    };

    return (
        <div className="list-container"> {/* Använd den generiska "list-container"-klassen */}
            <h2>Användare</h2>
            <input 
                type="text" 
                placeholder="Search by username" 
                value={searchTerm}
                onChange={handleSearch} // Anropa handleSearch när användaren skriver
            />
            <ul>
                {filteredUsers.map((user, index) => (
                    <li 
                        key={index} 
                        className={`list-item ${expandedIndex === index ? 'expanded' : ''}`} // Använd generiska "list-item" och "expanded"
                        onClick={() => handleToggle(index)} // Använd index som identifierare för expandering
                    >
                        <div className="list-info"> {/* Använd den generiska "list-info"-klassen */}
                            <strong>{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}</strong>
                        </div>
                        {expandedIndex === index && ( // Visa mer information om det här objektet är expanderat
                            <div className="expanded-info"> {/* Använd den generiska "expanded-info"-klassen */}
                                <p>ID: {user.id}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
