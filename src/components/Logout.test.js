import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logout from './Logout'; // Importera din Logout-komponent
import { useNavigate } from 'react-router-dom'; // Importera useNavigate

// Mocka useNavigate
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Logout Component', () => {
    const navigate = jest.fn(); // Mocka navigate

    beforeEach(() => {
        useNavigate.mockReturnValue(navigate); // Sätt return-värdet av useNavigate
        localStorage.setItem('token', 'testToken'); // Mocka en token i localStorage
    });

    afterEach(() => {
        jest.clearAllMocks(); // Rensa mocks efter varje test
        localStorage.removeItem('token'); // Rensa localStorage
    });

    test('renders Logout button', () => {
        render(<Logout />);
        expect(screen.getByText(/Logga ut/i)).toBeInTheDocument(); // Kontrollera att knappen för att logga ut finns
    });

    test('removes token and navigates to home on logout', () => {
        render(<Logout />);

        // Klicka på logga ut-knappen
        fireEvent.click(screen.getByText(/Logga ut/i));

        // Kontrollera att token tas bort från localStorage
        expect(localStorage.getItem('token')).toBeNull(); // Kontrollera att token har tagits bort

        // Kontrollera att navigate anropas
        expect(navigate).toHaveBeenCalledWith('/'); // Kontrollera att navigeringen anropas till '/'
    });
});
