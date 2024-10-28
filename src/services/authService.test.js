import axios from 'axios';
import { login, signup, isAuthenticated } from './authService'; // Kontrollera rätt sökväg

jest.mock('axios'); // Mockar axios-biblioteket

describe('authService', () => {
    beforeEach(() => {
        localStorage.clear(); // Rensa localStorage innan varje test
    });

    describe('login', () => {
        it('should save token to localStorage on successful login', async () => {
            const token = 'test-token';
            axios.post.mockResolvedValueOnce({ data: { token } });

            const result = await login('testuser', 'password');

            expect(result).toBe(true); // Testa att inloggningen lyckades
            expect(localStorage.getItem('token')).toBe(token); // Verifiera att token är lagrad i localStorage
        });

        it('should return false and not save token if login fails', async () => {
            axios.post.mockRejectedValueOnce(new Error('Login failed'));

            const result = await login('invaliduser', 'wrongpassword');

            expect(result).toBe(false); // Testa att inloggningen misslyckades
            expect(localStorage.getItem('token')).toBeNull(); // Verifiera att ingen token är sparad i localStorage
        });
    });

    describe('signup', () => {
        it('should return success message on successful signup', async () => {
            const message = 'User registered successfully';
            axios.post.mockResolvedValueOnce({ status: 201, data: { message } });

            const result = await signup('newuser', 'password', false);

            expect(result).toEqual({ success: true, message });
        });

        it('should return error message on failed signup', async () => {
            const errorMessage = 'Username already exists';
            axios.post.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await signup('existinguser', 'password', false);

            expect(result).toEqual({ success: false, message: errorMessage });
        });
    });

    describe('isAuthenticated', () => {
        it('should return true if token exists in localStorage', () => {
            localStorage.setItem('token', 'test-token');

            expect(isAuthenticated()).toBe(true);
        });

        it('should return false if no token is found in localStorage', () => {
            expect(isAuthenticated()).toBe(false);
        });
    });
});
