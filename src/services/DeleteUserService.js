import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users'; // Din API-bas-URL

class DeleteUserService {
    async deleteUser(userId) {
        const token = localStorage.getItem('token'); // Hämta token från localStorage

        try {
            const response = await axios.delete(`${API_BASE_URL}/id/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Lägg till token i headers
                },
            });
            return response; // Returnera svaret för vidare hantering
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // Kasta felet för att hantera det i komponenten
        }
    }
}

export default new DeleteUserService();


