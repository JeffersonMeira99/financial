import '@testing-library/jest-dom'; // Importing for extended matchers
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login'; // Correct import for default export
import api from '../../utils/api';

jest.mock('../../utils/api');

const mockApiPost = api.post as jest.Mock;

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form and handles input changes', () => {
        render(<Login />);

        // Check initial state
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();

        // Simulate user input
        userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
        userEvent.type(screen.getByLabelText(/senha/i), 'password123');
    });

    test('displays error messages for invalid input', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>,
        );

        // Simulate form submission without filling inputs
        fireEvent.click(screen.getByText(/entrar/i));

        await waitFor(() => {
            expect(
                screen.getByText(/o email é obrigatório/i),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/a senha é obrigatória/i),
            ).toBeInTheDocument();
        });
    });

    test('calls API and navigates on successful login', async () => {
        mockApiPost.mockResolvedValueOnce({
            status: 200,
            data: { token: 'mockToken' },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>,
        );

        userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
        userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        fireEvent.click(screen.getByText(/entrar/i));

        await waitFor(() => {
            expect(mockApiPost).toHaveBeenCalledWith('/login', {
                email: 'test@example.com',
                password: 'password123',
            });
            expect(localStorage.getItem('token')).toBe('mockToken');
        });
    });

    test('displays login error message on failed API call', async () => {
        mockApiPost.mockRejectedValueOnce(new Error('Failed to login'));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>,
        );

        userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
        userEvent.type(screen.getByLabelText(/senha/i), 'password123');
        fireEvent.click(screen.getByText(/entrar/i));

        await waitFor(() => {
            expect(
                screen.getByText(
                    /falha ao fazer login. verifique suas credenciais/i,
                ),
            ).toBeInTheDocument();
        });
    });
});
