import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({ name: '', species: '', breed: '', birthdate: '' });
    const [error, setError] = useState(null);
    const [updateUser, setUpdateUser] = useState({ username: '', email: '' });
    const navigate = useNavigate();

    const userId = 6; // Hämta aktuellt användar-ID

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userResponse = await axios.get(`/api/users/id/${userId}`);
                setUserProfile(userResponse.data);

                const petsResponse = await axios.get(`/api/pet/my-pets`);
                setPets(petsResponse.data);
            } catch (err) {
                setError("Kunde inte hämta användarprofil eller djur.");
                console.error(err);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/pet`, { ...newPet, userId });
            setPets([...pets, response.data]);
            setNewPet({ name: '', species: '', breed: '', birthdate: '' });
        } catch (err) {
            setError("Kunde inte lägga till djur.");
            console.error(err);
        }
    };

    const handleUpdatePet = async (petId, updatedData) => {
        try {
            await axios.put(`/api/pet/${petId}`, updatedData);
            setPets(pets.map(pet => (pet.id === petId ? { ...pet, ...updatedData } : pet)));
        } catch (err) {
            setError("Kunde inte uppdatera djur.");
            console.error(err);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`/api/users/id/${userId}`);
            alert("Användaren har tagits bort.");
            navigate('/login');
        } catch (err) {
            setError("Kunde inte ta bort användare.");
            console.error(err);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/users/id/${userId}`, updateUser);
            setUserProfile({ ...userProfile, ...updateUser });
            setUpdateUser({ username: '', email: '' });
        } catch (err) {
            setError("Kunde inte uppdatera användare.");
            console.error(err);
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{userProfile.username}'s Profile</h1>
            <h2>User Information</h2>
            <p>User ID: {userProfile.id}</p>
            <p>Email: {userProfile.email}</p>

            <h2>Your Pets</h2>
            <ul>
                {pets.map((pet) => (
                    <li key={pet.id}>
                        <h3>{pet.name}</h3>
                        <p>Species: {pet.species}</p>
                        <p>Breed: {pet.breed}</p>
                        <p>Birthdate: {pet.birthdate}</p>
                        <button onClick={() => handleUpdatePet(pet.id, { /* Här kan du ange data för uppdatering */ })}>
                            Update Pet
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Actions</h2>
            <button onClick={() => alert('Show User Pets clicked')}>
                Show User's Pets
            </button>
            <button onClick={() => alert('Add Pet clicked')}>
                Add Pet
            </button>
            <button onClick={() => alert('Update User clicked')}>
                Update User
            </button>
            <button onClick={handleDeleteUser}>
                Delete User
            </button>

            <h2>Add a New Pet</h2>
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

            <h2>Update User Information</h2>
            <form onSubmit={handleUpdateUser}>
                <input
                    type="text"
                    placeholder="New Username"
                    value={updateUser.username}
                    onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="New Email"
                    value={updateUser.email}
                    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                    required
                />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default ProfilePage;
