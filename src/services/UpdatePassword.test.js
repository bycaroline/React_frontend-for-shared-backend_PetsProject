import axios from 'axios';
import UpdatePasswordService from './UpdatePasswordService'; // Kontrollera att sökvägen är korrekt

jest.mock('axios'); // Mockar axios för att undvika riktiga HTTP-anrop

describe('UpdatePasswordService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Återställ mockar före varje test
    });

    test('successfully updates the password', async () => {
        const passwordDto = { oldPassword: 'oldpass', newPassword: 'newpass' };
        const token = 'test-token';

        // Mocka axios.put för att returnera en framgångsrik respons
        axios.put.mockResolvedValueOnce({ data: 'Password updated successfully' });

        // Anropa updatePassword och förvänta att det körs utan fel
        const response = await UpdatePasswordService.updatePassword(passwordDto, token);

        expect(axios.put).toHaveBeenCalledWith(
            'http://localhost:8080/api/users/password',
            passwordDto,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        expect(response.data).toBe('Password updated successfully'); // Kontrollera att svaret är korrekt
    });

    test('throws an error if the update fails', async () => {
        const passwordDto = { oldPassword: 'oldpass', newPassword: 'newpass' };
        const token = 'test-token';
        const errorMessage = 'Failed to update password';

        // Mocka axios.put för att kasta ett fel
        axios.put.mockRejectedValueOnce(new Error(errorMessage));

        await expect(UpdatePasswordService.updatePassword(passwordDto, token)).rejects.toThrow(errorMessage); // Kontrollera att fel kastas
    });
});
