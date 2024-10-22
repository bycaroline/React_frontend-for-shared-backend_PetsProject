export const createPet = async (endpoint, species, breed, name, birthdate, userId, token) => {
    try {
        const response = await api.post(endpoint, {
            species: species,
            breed: breed,
            name: name,
            birthdate: birthdate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error creating data', error);
        throw error;
    }
}