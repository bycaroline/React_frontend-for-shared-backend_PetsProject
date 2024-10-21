import axios from "axios";

const PET_API_BASE_URL = "http://localhost:8080/api/";

// Funktion för att hämta husdjuren baserat på användarnamn och inkludera JWT
export const fetchPetsByUsername = async (username) => {
    try {
        const token = localStorage.getItem('token'); // Hämta JWT från localStorage (eller annan lagring)

        const response = await axios.get(`${API_URL}/users/${username}/pets`, {
            headers: {
                Authorization: `Bearer ${token}` // Skicka JWT i Authorization-huvudet
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pets:', error);
        throw error;
    }
};