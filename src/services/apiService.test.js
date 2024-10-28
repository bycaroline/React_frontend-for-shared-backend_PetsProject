import apiService from './apiService'; // Använd rätt sökväg
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('apiService', () => {
    let mock;

    beforeEach(() => {
        // Skapa en ny instans av axios-mock-adapter för varje test
        mock = new MockAdapter(apiService);
    });

    afterEach(() => {
        // Rensa mocken och eventuella inställningar från tidigare tester
        mock.reset();
    });

    test('lägger till Authorization-headern med token från localStorage', async () => {
        // Setup
        const token = 'test-token';
        localStorage.setItem('token', token);

        // Ställ in mocken för att svara med en framgångsrik respons
        mock.onGet('/some-endpoint').reply(200, { data: 'success' });

        // Skicka en GET-förfrågan
        const response = await apiService.get('/some-endpoint');

        // Verifiera att Authorization-headern är korrekt inställd
        expect(response.config.headers.Authorization).toBe(`Bearer ${token}`);
        expect(response.data.data).toBe('success');  // Ändrat till `response.data.data`

        // Rensa localStorage
        localStorage.removeItem('token');
    });

    test('lägger inte till Authorization-headern om ingen token finns i localStorage', async () => {
        // Se till att localStorage är tom
        localStorage.removeItem('token');

        // Ställ in mocken för att svara med en framgångsrik respons
        mock.onGet('/some-endpoint').reply(200, { data: 'success' });

        // Skicka en GET-förfrågan
        const response = await apiService.get('/some-endpoint');

        // Verifiera att Authorization-headern inte är inställd
        expect(response.config.headers.Authorization).toBeUndefined();
        expect(response.data.data).toBe('success');  // Ändrat till `response.data.data`
    });

    // Test för 404 fel
    test('hanterar en begäran utan att kasta fel om localStorage är tomt', async () => {
        // Ta bort token från localStorage om den finns
        localStorage.removeItem('token');

        // Ställ in mocken för att svara med ett 404-fel
        mock.onGet('/non-existent-endpoint').reply(404, { message: 'Not Found' });

        try {
            await apiService.get('/non-existent-endpoint');
        } catch (error) {
            // Verifiera att felet kastas korrekt och innehåller rätt status
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe('Not Found');
        }
    });
});
