import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import ProfileInfo from './ProfileInfo';
import PetList from './PetList';
import AddPetForm from './AddPetForm';
import UpdateUserForm from './UpdateUserForm';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({ name: '', species: '', breed: '', birthdate: '' });
    const [error, setError] = useState(null);
    const [updateUser, setUpdateUser] = useState({ username: '' }); // Ingen email längre
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
            setUpdateUser({ username: '' });
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
            {/* Anpassa ProfileInfo så att email inte längre visas */}
            <ProfileInfo userProfile={userProfile} />
            <PetList pets={pets} handleUpdatePet={handleUpdatePet} />
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
            <AddPetForm newPet={newPet} setNewPet={setNewPet} handleAddPet={handleAddPet} />
            <UpdateUserForm updateUser={updateUser} setUpdateUser={setUpdateUser} handleUpdateUser={handleUpdateUser} />
        </div>
    );
};

export default ProfilePage;
