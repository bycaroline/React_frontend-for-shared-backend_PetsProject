import axios from 'axios'; // Importing axios for making HTTP requests

const PET_API_BASE_URL = 'http://localhost:8080/api/pet';

class DeletePet {
    // Method to delete a pet by its ID with token
    deletePet(petId, token) {
        return axios.delete(`${PET_API_BASE_URL}/${petId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Set the authorization header with the token
            }
        });
    }
}

// Exporting a new instance of DeletePet for use in other parts of the application
export default new DeletePet();

