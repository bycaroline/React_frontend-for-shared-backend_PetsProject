import axios from 'axios';

const PET_API_BASE_URL = 'http://localhost:8080/api/pet';

class UpdatePetService {
    //metod att uppdatera pet med petid
    updatePet(petId, petData, token) {
        return axios.put(`${PET_API_BASE_URL}/${petId}`, petData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new UpdatePetService();
