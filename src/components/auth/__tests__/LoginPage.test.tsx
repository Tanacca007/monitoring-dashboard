import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../LoginPage';
import { AuthProvider } from '../../../contexts/AuthContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('LoginPage', () => {
  const renderLoginPage = () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  };

  it('renders login form', () => {
    renderLoginPage();

    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('shows error message on empty submission', async () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    renderLoginPage();

    await userEvent.type(screen.getByPlaceholderText(/Username/i), 'testuser');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), 'password123');

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Success case - no error message
    await waitFor(() => {
      expect(screen.queryByText(/Invalid credentials/i)).not.toBeInTheDocument();
    });
  });

  it('handles form input changes', async () => {
    renderLoginPage();

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });
}); 