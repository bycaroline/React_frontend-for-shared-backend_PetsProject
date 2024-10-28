import axios from 'axios';
import AddPetService from './AddPetService';

// Mock axios module
jest.mock('axios');

describe('AddPet Service', () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('successfully adds a pet', async () => {
        // Setup
        const petData = {
            species: 'DOG',
            breed: 'Labrador',
            name: 'Rex',
            birthDate: '2020-01-01'
        };
        const token = 'test-token';
        const expectedResponse = { data: { id: 1, ...petData }};

        // Mock the axios post method
        axios.post.mockResolvedValueOnce(expectedResponse);

        // Execute
        const result = await AddPetService.addPet(petData, token);

        // Verify
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/api/pet',
            petData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        expect(result).toEqual(expectedResponse);
    });

    test('handles error when adding a pet', async () => {
        // Setup
        const petData = { name: 'Test Pet' };
        const token = 'test-token';
        const error = new Error('Failed to add pet');

        // Mock the axios post method to throw an error
        axios.post.mockRejectedValueOnce(error);

        // Execute and verify
        await expect(AddPetService.addPet(petData, token)).rejects.toThrow('Failed to add pet');
    });

    test('sends correct authorization header', async () => {
        // Setup
        const petData = { name: 'Test Pet' };
        const token = 'test-token';

        // Mock successful response
        axios.post.mockResolvedValueOnce({ data: {} });

        // Execute
        await AddPetService.addPet(petData, token);

        // Verify
        expect(axios.post).toHaveBeenCalledWith(
            expect.any(String),
            expect.any(Object),
            expect.objectContaining({
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        );
    });

    test('uses correct API endpoint', async () => {
        // Setup
        const petData = { name: 'Test Pet' };
        const token = 'test-token';

        // Mock successful response
        axios.post.mockResolvedValueOnce({ data: {} });

        // Execute
        await AddPetService.addPet(petData, token);

        // Verify
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/api/pet',
            expect.any(Object),
            expect.any(Object)
        );
    });

    test('handles API error response', async () => {
        // Setup
        const petData = { name: 'Test Pet' };
        const token = 'test-token';
        const apiError = {
            response: {
                status: 400,
                data: { message: 'Invalid pet data' }
            }
        };

        // Mock API error response
        axios.post.mockRejectedValueOnce(apiError);

        // Execute and verify
        await expect(AddPetService.addPet(petData, token))
            .rejects
            .toEqual(apiError);
    });
});