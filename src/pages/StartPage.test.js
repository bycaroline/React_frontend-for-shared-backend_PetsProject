import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StartPage from './StartPage';

// Mock the imported components
jest.mock('../components/HeaderAuthenticated', () => () => (
    <div data-testid="mock-header">Header Component</div>
));

jest.mock('../components/Petlist', () => () => (
    <div data-testid="mock-pet-list">Pet List Component</div>
));

jest.mock('../components/UserList', () => () => (
    <div data-testid="mock-user-list">User List Component</div>
));

describe('StartPage', () => {
    test('renders HeaderAuthenticated component', () => {
        render(<StartPage />);
        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    });

    test('renders PetList component', () => {
        render(<StartPage />);
        expect(screen.getByTestId('mock-pet-list')).toBeInTheDocument();
    });

    test('renders UserList component', () => {
        render(<StartPage />);
        expect(screen.getByTestId('mock-user-list')).toBeInTheDocument();
    });

    test('renders all components in correct layout', () => {
        const { container } = render(<StartPage />);

        // Check if the container has the correct flex layout
        const mainContainer = container.firstChild;
        expect(mainContainer).toHaveStyle({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        });

        // Check if the list container exists and has correct styles
        const listContainer = screen.getByTestId('mock-pet-list').parentElement.parentElement;
        expect(listContainer).toHaveStyle({
            display: 'flex',
            justifyContent: 'center'
        });
    });

    test('components are rendered in correct order', () => {
        render(<StartPage />);

        const header = screen.getByTestId('mock-header');
        const petList = screen.getByTestId('mock-pet-list');
        const userList = screen.getByTestId('mock-user-list');

        // Check if components appear in the correct order in the document
        expect(header.compareDocumentPosition(petList)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(petList.compareDocumentPosition(userList)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    test('list container has two child components', () => {
        const { container } = render(<StartPage />);

        const listElements = container.querySelectorAll('[style*="flex: 1"]');
        expect(listElements).toHaveLength(2);
    });
});