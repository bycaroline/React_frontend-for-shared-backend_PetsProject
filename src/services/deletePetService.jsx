import axios from 'axios'

const PET_API_BASE_URL = 'http://localhost:8080/api/pet'

class DeletePet{
    deletePet(petId){
        return axios.delete(`${PET_API_BASE_URL}/${petId}`)
    }
}

export default new DeletePet()