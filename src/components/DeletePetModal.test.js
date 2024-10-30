import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeletePetModal from './DeletePetModal';
import DeletePetService from '../services/DeletePetService';

// Mock the DeletePetService
jest.mock('../services/DeletePetService');

describe('DeletePetModal', () => {
    // Mock functions and setup
    const mockCloseModal = jest.fn();
    const mockToken = 'mock-token';

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Setup localStorage mock
        Storage.prototype.getItem = jest.fn(() => mockToken);
    });

    test('renders modal when isModalOpen is true', () => {
        render(<DeletePetModal isModalOpen={true} closeModal={mockCloseModal} />);

        expect(screen.getByText('Ta bort husdjur')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Skriv in husdjurets id')).toBeInTheDocument();
        expect(screen.getByText('Bekräfta borttagning')).toBeInTheDocument();
        expect(screen.getByText('Avbryt')).toBeInTheDocument();
    });

    test('does not render modal when isModalOpen is false', () => {
        render(<DeletePetModal isModalOpen={false} closeModal={mockCloseModal} />);

        expect(screen.queryByText('Ta bort husdjur')).not.toBeInTheDocument();
    });

    test('updates petId when input changes', () => {
        render(<DeletePetModal isModalOpen={true} closeModal={mockCloseModal} />);

        const input = screen.getByPlaceholderText('Skriv in husdjurets id');
        fireEvent.change(input, { target: { value: '123' } });

        expect(input.value).toBe('123');
    });

    test('calls DeletePetService and closes modal on successful deletion', async () => {
        DeletePetService.deletePet.mockResolvedValueOnce();

        render(<DeletePetModal isModalOpen={true} closeModal={mockCloseModal} />);

        const input = screen.getByPlaceholderText('Skriv in husdjurets id');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(DeletePetService.deletePet).toHaveBeenCalledWith('123', mockToken);
            expect(mockCloseModal).toHaveBeenCalled();
        });
    });

    test('displays error message when deletion fails', async () => {
        DeletePetService.deletePet.mockRejectedValueOnce(new Error('Failed to delete'));

        render(<DeletePetModal isModalOpen={true} closeModal={mockCloseModal} />);

        const input = screen.getByPlaceholderText('Skriv in husdjurets id');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Något gick fel vid borttagandet av husdjuret')).toBeInTheDocument();
            expect(mockCloseModal).not.toHaveBeenCalled();
        });
    });

    test('closes modal when cancel button is clicked', () => {
        render(<DeletePetModal isModalOpen={true} closeModal={mockCloseModal} />);

        const cancelButton = screen.getByText('Avbryt');
        fireEvent.click(cancelButton);

        expect(mockCloseModal).toHaveBeenCalled();
    });

    test('clears input and message after successful deletion', async () => {
        DeletePetService.deletePet.mockResolvedValueOnce();

        render(<DeletePetModal isModalOpen={true} closeModal={mockCloseModal} />);

        const input = screen.getByPlaceholderText('Skriv in husdjurets id');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });
});