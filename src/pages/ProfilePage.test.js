import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from './ProfilePage';

// Mock all imported components
jest.mock('../components/HeaderAuthenticated', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../components/UpdatePetModal', () => ({ isModalOpen, closeModal }) =>
    isModalOpen ? <div data-testid="mock-update-pet-modal">Update Pet Modal</div> : null
);
jest.mock('../components/UpdateUserModal', () => ({ isModalOpen, closeModal }) =>
    isModalOpen ? <div data-testid="mock-update-user-modal">Update User Modal</div> : null
);
jest.mock('../components/DeletePetModal', () => ({ isModalOpen, closeModal }) =>
    isModalOpen ? <div data-testid="mock-delete-pet-modal">Delete Pet Modal</div> : null
);
jest.mock('../components/UpdatePasswordModal', () => ({ isModalOpen, closeModal }) =>
    isModalOpen ? <div data-testid="mock-update-password-modal">Update Password Modal</div> : null
);
jest.mock('../components/AddPetModal', () => ({ isModalOpen, closeModal }) =>
    isModalOpen ? <div data-testid="mock-add-pet-modal">Add Pet Modal</div> : null
);
jest.mock('../components/DeleteUserModal', () => ({ show, handleClose }) =>
    show ? <div data-testid="mock-delete-user-modal">Delete User Modal</div> : null
);
jest.mock('../assets/pets.jpeg', () => 'mock-image-path');

describe('ProfilePage', () => {
    test('renders main components and welcome message', () => {
        render(<ProfilePage />);

        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByText('Välkommen till din profil')).toBeInTheDocument();
        expect(screen.getByText('I menyn till vänster kan du hantera dina inställningar och husdjur.')).toBeInTheDocument();
    });

    test('renders all sidebar buttons', () => {
        render(<ProfilePage />);

        expect(screen.getByText('Uppdatera användare')).toBeInTheDocument();
        expect(screen.getByText('Uppdatera lösenord')).toBeInTheDocument();
        expect(screen.getByText('Lägg till husdjur')).toBeInTheDocument();
        expect(screen.getByText('Uppdatera husdjur')).toBeInTheDocument();
        expect(screen.getByText('Ta bort husdjur')).toBeInTheDocument();
        expect(screen.getByText('Ta bort användare')).toBeInTheDocument();
    });

    test('opens UpdateUserModal when clicking update user button', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-update-user-modal')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Uppdatera användare'));
        expect(screen.getByTestId('mock-update-user-modal')).toBeInTheDocument();
    });

    test('opens UpdatePasswordModal when clicking update password button', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-update-password-modal')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Uppdatera lösenord'));
        expect(screen.getByTestId('mock-update-password-modal')).toBeInTheDocument();
    });

    test('opens AddPetModal when clicking add pet button', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-add-pet-modal')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Lägg till husdjur'));
        expect(screen.getByTestId('mock-add-pet-modal')).toBeInTheDocument();
    });

    test('opens UpdatePetModal when clicking update pet button', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-update-pet-modal')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Uppdatera husdjur'));
        expect(screen.getByTestId('mock-update-pet-modal')).toBeInTheDocument();
    });

    test('opens DeletePetModal when clicking delete pet button', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-delete-pet-modal')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Ta bort husdjur'));
        expect(screen.getByTestId('mock-delete-pet-modal')).toBeInTheDocument();
    });

    test('opens DeleteUserModal when clicking delete user button', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-delete-user-modal')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Ta bort användare'));
        expect(screen.getByTestId('mock-delete-user-modal')).toBeInTheDocument();
    });

    test('renders pets image', () => {
        render(<ProfilePage />);

        const image = screen.getByAltText('Våra husdjur');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'mock-image-path');
    });

    test('all modals are initially closed', () => {
        render(<ProfilePage />);

        expect(screen.queryByTestId('mock-update-user-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-update-password-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-delete-pet-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-add-pet-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-update-pet-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-delete-user-modal')).not.toBeInTheDocument();
    });
});