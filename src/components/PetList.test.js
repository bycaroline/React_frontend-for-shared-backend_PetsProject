import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetList from './PetList'; // Importera din PetList-komponent
import apiService from '../services/apiService'; // Importera apiService

// Mocka apiService
jest.mock('../services/apiService');

const mockPets = [
    { id: 1, name: 'Fido', species: 'dog', breed: 'Labrador', userId: '1' },
    { id: 2, name: 'Whiskers', species: 'cat', breed: 'Siamese', userId: '2' },
];

const mockOwners = new Map([
    ['1', 'Alice'],
    ['2', 'Bob'],
]);

describe('PetList Component', () => {
    beforeEach(() => {
        apiService.get.mockImplementation((url) => {
            if (url === '/pet/all') {
                return Promise.resolve({ data: mockPets });
            }
            if (url.startsWith('/users/id/')) {
                const userId = url.split('/').pop();
                return Promise.resolve({ data: { username: mockOwners.get(userId) } });
            }
            return Promise.reject(new Error('Not found'));
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Rensa mocks efter varje test
    });

    test('renders PetList component', async () => {
        render(<PetList />);

        // Vänta tills husdjuren har laddats
        await waitFor(() => {
            expect(screen.getByText(/Husdjur/i)).toBeInTheDocument(); // Kontrollera att rubriken finns
            expect(screen.getByText(/Fido/i)).toBeInTheDocument(); // Kontrollera att Fido visas
            expect(screen.getByText(/Whiskers/i)).toBeInTheDocument(); // Kontrollera att Whiskers visas
        });
    });

    test('searches for pets', async () => {
        render(<PetList />);

        // Vänta tills husdjuren har laddats
        await waitFor(() => {
            expect(screen.getByText(/Husdjur/i)).toBeInTheDocument();
        });

        // Sök efter "Fido"
        fireEvent.change(screen.getByPlaceholderText(/Search by name, breed, species, or owner/i), {
            target: { value: 'Fido' },
        });

        // Kontrollera att endast Fido visas
        expect(screen.getByText(/Fido/i)).toBeInTheDocument();
        expect(screen.queryByText(/Whiskers/i)).toBeNull(); // Whiskers ska inte visas
    });

    test('expands pet details on click', async () => {
        render(<PetList />);

        // Vänta tills husdjuren har laddats
        await waitFor(() => {
            expect(screen.getByText(/Husdjur/i)).toBeInTheDocument();
        });

        // Klicka på Fido för att expandera
        fireEvent.click(screen.getByText(/Fido/i));

        // Kontrollera att mer information om Fido visas
        expect(screen.getByText(/Ras: Labrador/i)).toBeInTheDocument();
        expect(screen.getByText(/Ägare: Alice/i)).toBeInTheDocument();

        // Klicka på Fido igen för att kollapsa
        fireEvent.click(screen.getByText(/Fido/i));

        // Kontrollera att mer information om Fido inte längre visas
        expect(screen.queryByText(/Ras: Labrador/i)).toBeNull();
    });
});
