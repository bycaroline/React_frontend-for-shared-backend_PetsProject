import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteUserModal from './DeleteUserModal';
import DeleteUserService from '../services/DeleteUserService';

// Mock the DeleteUserService and timer
jest.mock('../services/DeleteUserService');
jest.useFakeTimers();

describe('DeleteUserModal', () => {
    const mockHandleClose = jest.fn();
    const mockToken = 'mock-token';

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Setup localStorage mock
        Storage.prototype.getItem = jest.fn(() => mockToken);
    });

    test('renders modal when show is true', () => {
        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        expect(screen.getByText('Ta bort användare')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ange användar-ID')).toBeInTheDocument();
        expect(screen.getByText('Bekräfta borttagning')).toBeInTheDocument();
        expect(screen.getByText('Avbryt')).toBeInTheDocument();
    });

    test('does not render modal when show is false', () => {
        render(<DeleteUserModal show={false} handleClose={mockHandleClose} />);

        expect(screen.queryByText('Ta bort användare')).not.toBeInTheDocument();
    });

    test('updates userId when input changes', () => {
        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        const input = screen.getByPlaceholderText('Ange användar-ID');
        fireEvent.change(input, { target: { value: '123' } });

        expect(input.value).toBe('123');
    });

    test('handles successful user deletion', async () => {
        DeleteUserService.deleteUser.mockResolvedValueOnce({ status: 200 });

        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        const input = screen.getByPlaceholderText('Ange användar-ID');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Användare med ID 123 har tagits bort!')).toBeInTheDocument();
        });

        // Fast-forward timers
        jest.advanceTimersByTime(2000);

        expect(mockHandleClose).toHaveBeenCalled();
        expect(DeleteUserService.deleteUser).toHaveBeenCalledWith('123', mockToken);
    });

    test('handles user not found error', async () => {
        DeleteUserService.deleteUser.mockResolvedValueOnce({ status: 404 });

        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        const input = screen.getByPlaceholderText('Ange användar-ID');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Användaren hittades inte.')).toBeInTheDocument();
        });

        expect(mockHandleClose).not.toHaveBeenCalled();
    });

    test('handles deletion error', async () => {
        DeleteUserService.deleteUser.mockRejectedValueOnce(new Error('Failed to delete'));

        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        const input = screen.getByPlaceholderText('Ange användar-ID');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Ett fel uppstod vid försök att ta bort användaren.')).toBeInTheDocument();
        });

        expect(mockHandleClose).not.toHaveBeenCalled();
    });

    test('closes modal when cancel button is clicked', () => {
        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        const cancelButton = screen.getByText('Avbryt');
        fireEvent.click(cancelButton);

        expect(mockHandleClose).toHaveBeenCalled();
    });

    test('clears input after successful deletion', async () => {
        DeleteUserService.deleteUser.mockResolvedValueOnce({ status: 200 });

        render(<DeleteUserModal show={true} handleClose={mockHandleClose} />);

        const input = screen.getByPlaceholderText('Ange användar-ID');
        fireEvent.change(input, { target: { value: '123' } });

        const deleteButton = screen.getByText('Bekräfta borttagning');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });

    afterEach(() => {
        // Clean up timers
        jest.clearAllTimers();
    });
});