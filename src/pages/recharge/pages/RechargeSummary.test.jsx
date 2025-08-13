import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import RechargeSummary from './RechargeSummary';


vi.mock('../components/rechargeTicket/RechargeTicket', () => ({
  __esModule: true,
  default: ({ ticket }) => <div data-testid="ticket">{ticket.supplier}</div>,
}));

vi.mock('../../../components/noDataMessage/NoDataMessage', () => ({
  __esModule: true,
  default: ({ message }) => <div data-testid="no-data">{message}</div>,
}));


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});


let mockLocation = { state: null };

describe('RechargeSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra mensaje de no datos si no hay ticket', () => {
    mockLocation = { state: null };

    render(
      <MemoryRouter>
        <RechargeSummary />
      </MemoryRouter>
    );

    expect(screen.getByTestId('no-data')).toHaveTextContent('No se encontró información de la recarga');
  });

  it('muestra ticket y datos cuando hay información', () => {
    mockLocation = {
      state: {
        ticket: { supplierId: '1', value: 5000 },
        operators: [{ id: '1', name: 'Claro' }],
      },
    };

    render(
      <MemoryRouter>
        <RechargeSummary />
      </MemoryRouter>
    );

    expect(screen.getByText('Recarga Exitosa')).toBeInTheDocument();
    expect(screen.getByTestId('ticket')).toHaveTextContent('Claro');
  });

  it('navega al historial cuando se hace clic en "Regresar"', () => {
    mockLocation = {
      state: {
        ticket: { supplierId: '1', value: 5000 },
        operators: [{ id: '1', name: 'Claro' }],
      },
    };

    render(
      <MemoryRouter>
        <RechargeSummary />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('← Regresar'));
    expect(mockNavigate).toHaveBeenCalledWith('/recharge/history');
  });


});
