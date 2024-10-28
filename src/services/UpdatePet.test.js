import axios from 'axios';
import UpdatePetService from './UpdatePetService'; // Kontrollera att sökvägen är korrekt

jest.mock('axios'); // Mockar axios för att undvika riktiga HTTP-anrop

describe('UpdatePetService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Återställ mockar före varje test
    });

    test('successfully updates pet information', async () => {
        const petId = 1;
        const petData = { name: 'Buddy', type: 'Dog', age: 5 };
        const token = 'test-token';

        // Mocka axios.put för att returnera en framgångsrik respons
        axios.put.mockResolvedValueOnce({ data: 'Pet updated successfully' });

        // Anropa updatePet och förvänta att det körs utan fel
        const response = await UpdatePetService.updatePet(petId, petData, token);

        expect(axios.put).toHaveBeenCalledWith(
            `http://localhost:8080/api/pet/${petId}`,
            petData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        expect(response.data).toBe('Pet updated successfully'); // Kontrollera att svaret är korrekt
    });

    test('throws an error if the update fails', async () => {
        const petId = 2;
        const petData = { name: 'Mittens', type: 'Cat', age: 3 };
        const token = 'test-token';
        const errorMessage = 'Failed to update pet';

        // Mocka axios.put för att kasta ett fel
        axios.put.mockRejectedValueOnce(new Error(errorMessage));

        await expect(UpdatePetService.updatePet(petId, petData, token)).rejects.toThrow(errorMessage); // Kontrollera att fel kastas
    });
});
