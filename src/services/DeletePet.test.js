import axios from 'axios';
import DeletePet from './DeletePetService'; // Kontrollera att sökvägen är korrekt

jest.mock('axios'); // Mockar axios för att undvika riktiga HTTP-anrop

describe('DeletePet Service', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Återställ alla mockar före varje test
    });

    test('successfully deletes a pet', async () => {
        const petId = 1;
        const token = 'test-token';

        // Mocka axios.delete för att returnera en framgångsrik respons
        axios.delete.mockResolvedValueOnce({ data: 'Pet deleted successfully' });

        // Anropa deletePet och förvänta att det körs utan fel
        const response = await DeletePet.deletePet(petId, token);

        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:8080/api/pet/${petId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        expect(response.data).toBe('Pet deleted successfully'); // Kontrollera att svaret är korrekt
    });

    test('throws an error if delete fails', async () => {
        const petId = 2;
        const token = 'test-token';
        const errorMessage = 'Failed to delete pet';

        // Mocka axios.delete för att kasta ett fel
        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        await expect(DeletePet.deletePet(petId, token)).rejects.toThrow(errorMessage); // Kontrollera att fel kastas
    });

    test('sends correct authorization header', async () => {
        const petId = 3;
        const token = 'test-token';

        // Mocka en framgångsrik respons för axios.delete
        axios.delete.mockResolvedValueOnce({ data: {} });

        await DeletePet.deletePet(petId, token);

        expect(axios.delete).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    });

    test('uses correct API endpoint', async () => {
        const petId = 4;
        const token = 'test-token';

        // Mocka en framgångsrik respons för axios.delete
        axios.delete.mockResolvedValueOnce({ data: {} });

        await DeletePet.deletePet(petId, token);

        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:8080/api/pet/${petId}`,
            expect.any(Object)
        );
    });
});
