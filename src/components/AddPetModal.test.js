import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddPetModal from './AddPetModal';
import AddPetService from '../services/AddPetService';

// Mock the AddPetService
jest.mock('../services/AddPetService');

describe('AddPetModal', () => {
    const mockCloseModal = jest.fn();
    const mockToken = 'test-token';

    beforeEach(() => {
        jest.clearAllMocks();
        Storage.prototype.getItem = jest.fn(() => mockToken);
    });

    test('renders modal when isModalOpen is true', () => {
        render(<AddPetModal isModalOpen={true} closeModal={mockCloseModal} />);

        // Use role to be more specific
        expect(screen.getByRole('heading', { name: 'Lägg till husdjur' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Skriv in ras')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Skriv in namn')).toBeInTheDocument();
    });

    test('does not render modal when isModalOpen is false', () => {
        render(<AddPetModal isModalOpen={false} closeModal={mockCloseModal} />);

        expect(screen.queryByText('Lägg till husdjur')).not.toBeInTheDocument();
    });

    test('updates form fields when user types', async () => {
        render(<AddPetModal isModalOpen={true} closeModal={mockCloseModal} />);

        const breedInput = screen.getByPlaceholderText('Skriv in ras');
        const nameInput = screen.getByPlaceholderText('Skriv in namn');
        const speciesSelect = screen.getByRole('combobox');
        const birthdateInput = screen.getByPlaceholderText('Födelsedatum (åååå-mm-dd)');

        await userEvent.type(breedInput, 'Labrador');
        await userEvent.type(nameInput, 'Rex');
        await userEvent.selectOptions(speciesSelect, 'DOG');
        await userEvent.type(birthdateInput, '2020-01-01');

        expect(breedInput).toHaveValue('Labrador');
        expect(nameInput).toHaveValue('Rex');
        expect(speciesSelect).toHaveValue('DOG');
        expect(birthdateInput).toHaveValue('2020-01-01');
    });

    test('successfully adds a pet', async () => {
        AddPetService.addPet.mockResolvedValueOnce({});

        render(<AddPetModal isModalOpen={true} closeModal={mockCloseModal} />);

        // Fill out the form
        await userEvent.selectOptions(screen.getByRole('combobox'), 'DOG');
        await userEvent.type(screen.getByPlaceholderText('Skriv in ras'), 'Labrador');
        await userEvent.type(screen.getByPlaceholderText('Skriv in namn'), 'Rex');
        await userEvent.type(screen.getByPlaceholderText('Födelsedatum (åååå-mm-dd)'), '2020-01-01');

        // Use role to be more specific
        fireEvent.click(screen.getByRole('button', { name: 'Lägg till husdjur' }));

        await waitFor(() => {
            expect(AddPetService.addPet).toHaveBeenCalledWith(
                {
                    species: 'DOG',
                    breed: 'Labrador',
                    name: 'Rex',
                    birthDate: '2020-01-01'
                },
                mockToken
            );
            expect(mockCloseModal).toHaveBeenCalled();
        });
    });

    test('handles error when adding pet fails', async () => {
        const mockError = { response: 'API Error' };
        AddPetService.addPet.mockRejectedValueOnce(mockError);

        render(<AddPetModal isModalOpen={true} closeModal={mockCloseModal} />);

        // Fill out the form
        await userEvent.selectOptions(screen.getByRole('combobox'), 'CAT');
        await userEvent.type(screen.getByPlaceholderText('Skriv in ras'), 'Persian');
        await userEvent.type(screen.getByPlaceholderText('Skriv in namn'), 'Whiskers');
        await userEvent.type(screen.getByPlaceholderText('Födelsedatum (åååå-mm-dd)'), '2021-06-15');

        // Use role to be more specific
        fireEvent.click(screen.getByRole('button', { name: 'Lägg till husdjur' }));

        await waitFor(() => {
            expect(screen.getByText('Något gick fel vid tillägg av husdjuret')).toBeInTheDocument();
            expect(mockCloseModal).not.toHaveBeenCalled();
        });
    });

    test('closes modal when close button is clicked', () => {
        render(<AddPetModal isModalOpen={true} closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByRole('button', { name: 'Stäng' }));

        expect(mockCloseModal).toHaveBeenCalled();
    });

    test('clears form after successful submission', async () => {
        AddPetService.addPet.mockResolvedValueOnce({});

        render(<AddPetModal isModalOpen={true} closeModal={mockCloseModal} />);

        // Fill out the form
        await userEvent.selectOptions(screen.getByRole('combobox'), 'DOG');
        await userEvent.type(screen.getByPlaceholderText('Skriv in ras'), 'Labrador');
        await userEvent.type(screen.getByPlaceholderText('Skriv in namn'), 'Rex');
        await userEvent.type(screen.getByPlaceholderText('Födelsedatum (åååå-mm-dd)'), '2020-01-01');

        // Use role to be more specific
        fireEvent.click(screen.getByRole('button', { name: 'Lägg till husdjur' }));

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Skriv in ras')).toHaveValue('');
            expect(screen.getByPlaceholderText('Skriv in namn')).toHaveValue('');
            expect(screen.getByRole('combobox')).toHaveValue('');
            expect(screen.getByPlaceholderText('Födelsedatum (åååå-mm-dd)')).toHaveValue('');
        });
    });
});