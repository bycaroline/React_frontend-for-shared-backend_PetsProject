import axios from 'axios'; // Importing axios for making HTTP requests

// Base URL for pet-related API endpoints
const PET_API_BASE_URL = 'http://localhost:8080/api/pet';

class DeletePet {
    // Method to delete a pet by its ID
    deletePet(petId) {
        // Sending a DELETE request to the API with the pet ID to remove the specified pet
        return axios.delete(`${PET_API_BASE_URL}/${petId}`);
    }
}

// Exporting a new instance of DeletePet for use in other parts of the application
export default new DeletePet();
