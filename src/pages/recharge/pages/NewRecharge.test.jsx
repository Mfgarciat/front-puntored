import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NewRecharge from './NewRecharge';
import { getSuppliers, processRecharge } from '../../../api/rechargeService';


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


vi.mock('../../../api/rechargeService', () => ({
  getSuppliers: vi.fn(),
  processRecharge: vi.fn(),
}));

describe('NewRecharge', () => {
  it('renderiza el título después de cargar operadores', async () => {

    getSuppliers.mockResolvedValueOnce([{ id: '1', name: 'Claro' }]);

    render(
      <MemoryRouter>
        <NewRecharge />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Nueva Recarga Móvil/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar error si processRecharge falla', async () => {
    getSuppliers.mockResolvedValueOnce([{ id: '1', name: 'Claro' }]);
    processRecharge.mockRejectedValueOnce(new Error('Error en recarga'));

    render(
      <MemoryRouter>
        <NewRecharge />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Nueva Recarga Móvil/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/3001234567/i), {
      target: { value: '3001234567', name: 'phoneNumber' },
    });

    fireEvent.change(screen.getByPlaceholderText(/5000/i), {
      target: { value: '5000', name: 'value' },
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1', name: 'supplierId' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Realizar Recarga/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error en recarga/i)).toBeInTheDocument();
    });
  });

  it('muestra error si el número de teléfono es inválido', async () => {

    getSuppliers.mockResolvedValueOnce([{ id: '1', name: 'Claro' }]);

    render(
      <MemoryRouter>
        <NewRecharge />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Nueva Recarga Móvil/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/3001234567/i), {
      target: { value: '123', name: 'phoneNumber' },
    });

    expect(
      screen.getByText(/El número debe iniciar en "3" y tener 10 dígitos./i)
    ).toBeInTheDocument();
  });

  it('muestra error si el monto es menor a 1000', async () => {

    getSuppliers.mockResolvedValueOnce([{ id: '1', name: 'Claro' }]);

    render(
      <MemoryRouter>
        <NewRecharge />
      </MemoryRouter>
    );


    await waitFor(() => {
      expect(screen.getByText(/Nueva Recarga Móvil/i)).toBeInTheDocument();
    });


    fireEvent.change(screen.getByPlaceholderText(/5000/i), {
      target: { value: '500', name: 'value' },
    });


    expect(
      screen.getByText(/El monto debe estar entre 1,000 y 100,000./i)
    ).toBeInTheDocument();
  });

  it('envía el formulario con datos válidos y navega al resumen', async () => {

    getSuppliers.mockResolvedValueOnce([{ id: '1', name: 'Claro' }]);
    processRecharge.mockResolvedValueOnce({ ticketId: 'TICKET-123' });

    render(
      <MemoryRouter>
        <NewRecharge />
      </MemoryRouter>
    );


    await waitFor(() => {
      expect(screen.getByText(/Nueva Recarga Móvil/i)).toBeInTheDocument();
    });


    fireEvent.change(screen.getByPlaceholderText(/3001234567/i), {
      target: { value: '3001234567', name: 'phoneNumber' },
    });


    fireEvent.change(screen.getByPlaceholderText(/5000/i), {
      target: { value: '5000', name: 'value' },
    });


    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1', name: 'supplierId' },
    });


    fireEvent.submit(screen.getByRole('button', { name: /Realizar Recarga/i }));


    await waitFor(() => {
      expect(processRecharge).toHaveBeenCalledWith({
        phoneNumber: '3001234567',
        value: '5000',
        supplierId: '1',
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      '/recharge/summary',
      expect.any(Object)
    );
  });

});
