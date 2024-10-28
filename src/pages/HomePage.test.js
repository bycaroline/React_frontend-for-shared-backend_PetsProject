import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import Login from '../components/Login';
import Signup from '../components/Signup';
import '@testing-library/jest-dom';

// Mock the child components
jest.mock('../components/Login', () => () => <div data-testid="mock-login">Login Component</div>);
jest.mock('../components/Signup', () => () => <div data-testid="mock-signup">Signup Component</div>);
// Mock the image import
jest.mock('../assets/pets.jpeg', () => 'mock-image-path');

describe('HomePage', () => {
    beforeEach(() => {
        // Suppress console errors for HTML attributes
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore console.error after each test
        jest.restoreAllMocks();
    });

    test('renders main heading and description', () => {
        render(<HomePage />);

        expect(screen.getByText('Våra Husdjur')).toBeInTheDocument();
        expect(screen.getByText('Här hittar du alla våra kära husdjur. Registera dig och logga in för att lägga till ditt husdjur. Alla husdjur är välkomna!')).toBeInTheDocument();
    });

    test('renders login and register buttons', () => {
        render(<HomePage />);

        expect(screen.getByText('Logga in')).toBeInTheDocument();
        expect(screen.getByText('Registrera')).toBeInTheDocument();
    });

    test('shows Login component when clicking login button', () => {
        render(<HomePage />);

        const loginButton = screen.getByText('Logga in');
        fireEvent.click(loginButton);

        expect(screen.getByTestId('mock-login')).toBeInTheDocument();
    });

    test('shows Signup component when clicking register button', () => {
        render(<HomePage />);

        const registerButton = screen.getByText('Registrera');
        fireEvent.click(registerButton);

        expect(screen.getByTestId('mock-signup')).toBeInTheDocument();
    });

    test('switches between Login and Signup components', () => {
        render(<HomePage />);

        // Click login first
        fireEvent.click(screen.getByText('Logga in'));
        expect(screen.getByTestId('mock-login')).toBeInTheDocument();

        // Then click register
        fireEvent.click(screen.getByText('Registrera'));
        expect(screen.getByTestId('mock-signup')).toBeInTheDocument();
        expect(screen.queryByTestId('mock-login')).not.toBeInTheDocument();
    });

    test('renders navbar brand name', () => {
        render(<HomePage />);

        expect(screen.getByText('Våra husdjur')).toBeInTheDocument();
    });

    test('renders pets image', () => {
        render(<HomePage />);

        const image = document.querySelector('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'mock-image-path');
    });
});