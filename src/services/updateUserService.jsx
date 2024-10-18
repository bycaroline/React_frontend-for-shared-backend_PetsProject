import axios from 'axios'; // Importing axios for making HTTP requests

// Base URL for user-related API endpoints
const USER_API_BASE_URL = 'http://localhost:8080/api/users';

class UpdateUser {
    // Method to update a user by their ID
    updateUser(id, updateUserDto) {
        // Sending a PUT request to the API with the user ID and the update data (updateUserDto)
        return axios.put(`${USER_API_BASE_URL}/id/${id}`, updateUserDto);
    }
}

// Exporting a new instance of UpdateUser for use in other parts of the application
export default new UpdateUser();
