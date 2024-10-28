import axios from 'axios';
import UpdateUserService from './UpdateUserService'; // Kontrollera att sökvägen är korrekt

jest.mock('axios'); // Mockar axios för att undvika riktiga HTTP-anrop

describe('UpdateUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Återställ mockar före varje test
    });

    test('successfully updates user information', async () => {
        const userId = 1;
        const updateUserDto = { name: 'John Doe', email: 'john.doe@example.com' };
        const token = 'test-token';

        // Mocka axios.put för att returnera en framgångsrik respons
        axios.put.mockResolvedValueOnce({ data: 'User updated successfully' });

        // Anropa updateUser och förvänta att det körs utan fel
        const response = await UpdateUserService.updateUser(userId, updateUserDto, token);

        expect(axios.put).toHaveBeenCalledWith(
            `http://localhost:8080/api/users/id/${userId}`,
            updateUserDto,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        expect(response.data).toBe('User updated successfully'); // Kontrollera att svaret är korrekt
    });

    test('throws an error if the update fails', async () => {
        const userId = 2;
        const updateUserDto = { name: 'Jane Doe', email: 'jane.doe@example.com' };
        const token = 'test-token';
        const errorMessage = 'Failed to update user';

        // Mocka axios.put för att kasta ett fel
        axios.put.mockRejectedValueOnce(new Error(errorMessage));

        await expect(UpdateUserService.updateUser(userId, updateUserDto, token)).rejects.toThrow(errorMessage); // Kontrollera att fel kastas
    });
});
