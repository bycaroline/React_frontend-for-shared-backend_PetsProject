import axios from 'axios'

const USER_API_BASE_URL = 'http://localhost:8080/api/users'

class UpdateUser{
    updateUser(id, updateUserDto){
        return axios.put(`${USER_API_BASE_URL}/id/${id}`, updateUserDto)
    }
}

export default new UpdateUser()