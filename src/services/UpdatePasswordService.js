import axios from 'axios'; // Importing axios for handling HTTP requests

// Base URL for the API that handles password updates
const PASSWORD_API_BASE_URL = 'http://localhost:8080/api/users/password'; // Change this to the actual base URL if different

class UpdatePasswordService {

    // Method to update the user's password
    updatePassword(passwordDto, token) {
        // Configuring headers with the token for authentication
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Passing the token in Authorization header
                'Content-Type': 'application/json' // Setting content type to JSON
            }
        };

        // Sending a PUT request to update the password
        return axios.put(PASSWORD_API_BASE_URL, passwordDto, config);
    }
}

export default new UpdatePasswordService(); // Exporting an instance of UpdatePasswordService for use in other components


