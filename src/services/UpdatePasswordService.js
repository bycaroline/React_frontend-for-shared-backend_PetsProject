import axios from 'axios'; // Importerar axios för att hantera HTTP-begäran

// Bas-URL för API:et som hanterar användaruppdateringar (lösenord)
const USER_API_BASE_URL = 'http://localhost:8080/api/users/password';

class UpdatePasswordService {
    // Metod för att uppdatera användarens lösenord
    async updatePassword(passwordDto, token) {
        try {
            // Skickar PUT-begäran till API för att uppdatera lösenordet
            const response = await axios.put(USER_API_BASE_URL, passwordDto, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Skicka token för autentisering
                    'Content-Type': 'application/json' // Sätta Content-Type som JSON
                }
            });
            return response.data; // Returnerar API-svaret
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Något gick fel vid uppdatering av lösenordet');
        }
    }
}

// Exporterar en instans av UpdatePasswordService för att användas i andra delar av applikationen
export default new UpdatePasswordService();
