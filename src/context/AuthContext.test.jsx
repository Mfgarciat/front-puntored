import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from './AuthContext';
import { useAuth } from "../hooks/useAuth"; 


function TestComponent() {
  const { token, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="token">{token || 'No token'}</p>
     
      <button onClick={() => login('1234567890')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  it('login actualiza correctamente el estado token', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

   
    expect(screen.getByTestId('token').textContent).toBe('No token');

    fireEvent.click(screen.getByText('Login'));


    expect(screen.getByTestId('token').textContent).toBe('1234567890');
  });

  it('logout limpia el estado token', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

   
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByTestId('token').textContent).toBe('1234567890');

   
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.getByTestId('token').textContent).toBe('No token');
  });

  it('useAuth retorna los valores correctos', () => {
    let capturedValues;

   
    function CaptureValues() {
      capturedValues = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <CaptureValues />
      </AuthProvider>
    );

    expect(capturedValues).toHaveProperty('token');
    expect(capturedValues).toHaveProperty('login');
    expect(capturedValues).toHaveProperty('logout');
  });
});
