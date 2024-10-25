import axios from 'axios'; // importera axios

const PET_API_BASE_URL = 'http://localhost:8080/api/pet';

// Klass för att hantera husdjur
class AddPet {
    // Metod för att lägga till husdjur
    addPet(petData, token) { // Ta emot token som argument
        return axios.post(`${PET_API_BASE_URL}`, petData, {
            headers: {
                Authorization: `Bearer ${token}` // lägg till token i headers
            }
        });
    }
}

export default new AddPet();