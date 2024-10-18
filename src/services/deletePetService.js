import axios from 'axios'

const PET_API_BASE_URL = 'http://localhost:8080/pets'

class deletePet{
    deletePet(id){
        return axios.delete(`${PET_API_BASE_URL}/${id}`)
    }
}

export default new deletePet()