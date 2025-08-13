import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/apiClient';
import { AuthContext } from '../../context/AuthContext';

vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../api/apiClient', () => ({
  default: { post: vi.fn() },
}));

describe('Login Component', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      token: null,
      login: mockLogin,
      logout: vi.fn(),
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: 'fake-token' }),
      })
    );

    
  });

  it('llama a login con el token cuando el formulario es enviado', async () => {
  apiClient.post.mockResolvedValueOnce({
    data: { accessToken: 'fake-token' }
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
    target: { value: 'Maria@gmail.com' },
  });
  fireEvent.change(screen.getByLabelText(/Contraseña/i), {
    target: { value: '12345689' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

  await vi.waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('fake-token');
  });
});

  it('muestra "Credenciales inválidas" cuando el backend responde 401', async () => {
    apiClient.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(
      await screen.findByText(/credenciales inválidas/i)
    ).toBeInTheDocument();
  });
});
