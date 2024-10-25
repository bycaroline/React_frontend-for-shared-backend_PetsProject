import axios from 'axios';

// Base URL for the API
const PASSWORD_API_BASE_URL = 'http://localhost:8080/api/users/password';

class UpdatePasswordService {

    // Method to update password
    updatePassword(passwordDto, token) {
        // Logga token för att kontrollera att den hämtas korrekt
        console.log("Token being used:", token);

        // Configuring headers with the token for authentication
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Passing the token in Authorization header
                'Content-Type': 'application/json' // Setting content type to JSON
            }
        };

        // Skicka PUT-begäran till API för att uppdatera lösenordet
        return axios.put(`${PASSWORD_API_BASE_URL}`, passwordDto, config);
    }
}

export default new UpdatePasswordService();
