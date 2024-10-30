import axios from 'axios';
import DeleteUserService from './DeleteUserService'; // Kontrollera att sökvägen är korrekt

jest.mock('axios'); // Mockar axios för att undvika riktiga HTTP-anrop

describe('DeleteUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Återställ mockar före varje test
        localStorage.clear(); // Rensa localStorage före varje test
    });

    test('successfully deletes a user', async () => {
        const userId = 1;
        const token = 'test-token';
        localStorage.setItem('token', token); // Sätt token i localStorage för testet

        // Mocka axios.delete för att returnera en framgångsrik respons
        axios.delete.mockResolvedValueOnce({ data: 'User deleted successfully' });

        // Anropa deleteUser och förvänta att det körs utan fel
        const response = await DeleteUserService.deleteUser(userId);

        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:8080/api/users/id/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        expect(response.data).toBe('User deleted successfully'); // Kontrollera att svaret är korrekt
    });

    test('throws an error if delete fails', async () => {
        const userId = 2;
        const token = 'test-token';
        localStorage.setItem('token', token); // Sätt token i localStorage för testet
        const errorMessage = 'Failed to delete user';

        // Mocka axios.delete för att kasta ett fel
        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        await expect(DeleteUserService.deleteUser(userId)).rejects.toThrow(errorMessage); // Kontrollera att fel kastas
    });

    test('handles case when there is no token', async () => {
        const userId = 3;

        // Mocka en framgångsrik respons för axios.delete
        axios.delete.mockResolvedValueOnce({ data: 'User deleted successfully' });

        // Anropa deleteUser utan att sätta token i localStorage
        const response = await DeleteUserService.deleteUser(userId);

        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:8080/api/users/id/${userId}`,
            expect.objectContaining({
                headers: {
                    Authorization: 'Bearer null', // Förväntar att headern ska vara "Bearer null" utan giltig token
                },
            })
        );
        expect(response.data).toBe('User deleted successfully'); // Kontrollera att svaret är korrekt
    });
});
