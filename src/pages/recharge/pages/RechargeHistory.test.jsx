import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RechargeHistory from './RechargeHistory';
import { getTransactionHistory, getSuppliers } from '../../../api/rechargeService';

vi.mock('../../../api/rechargeService', () => ({
  getTransactionHistory: vi.fn(),
  getSuppliers: vi.fn(),
}));


vi.mock('../../../components/loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Cargando...</div>,
}));


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RechargeHistory', () => {
  it('muestra Loader mientras carga y luego el título', async () => {

    getTransactionHistory.mockResolvedValueOnce([
      {
        id: '1',
        date: '2025-08-10T10:00:00Z',
        supplierId: '8753',
        supplierName: 'Claro',
        phoneNumber: '3001234567',
        value: 5000,
      },
    ]);


    getSuppliers.mockResolvedValueOnce([
      { id: '8753', name: 'Claro' }
    ]);


    render(
      <MemoryRouter>
        <RechargeHistory />
      </MemoryRouter>
    );


    expect(screen.getByTestId('loader')).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByText(/Historial de Recargas/i)).toBeInTheDocument();
    });
  });


  it('navega a rechargenew al hacer click en "Nueva Recarga"', async () => {
    getTransactionHistory.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <RechargeHistory />
      </MemoryRouter>
    );


    const button = await screen.findByRole('button', { name: /nueva recarga/i });
    fireEvent.click(button);


    expect(mockNavigate).toHaveBeenCalledWith('/recharge/new');
  });

  it('muestra los datos de la transacción después de cargar', async () => {
    getTransactionHistory.mockResolvedValueOnce([
      {
        id: '1',
        date: '2025-08-10T10:00:00Z',
        supplierId: '8547',
        supplierName: 'Movistar',
        phoneNumber: '3001234567',
        value: 5000,
      },
    ]);

    getSuppliers.mockResolvedValueOnce([
      { id: '8547', name: 'Claro' }
    ]);

    render(
      <MemoryRouter>
        <RechargeHistory />
      </MemoryRouter>
    );

    expect(await screen.findByText('Claro')).toBeInTheDocument();
    expect(screen.getByText('3001234567')).toBeInTheDocument();
    expect(screen.getByText('$ 5.000')).toBeInTheDocument();
  });
});

