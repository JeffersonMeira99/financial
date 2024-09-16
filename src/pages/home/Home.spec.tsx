import Home from './Home';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

test('renders Home component with balance and transaction list', async () => {
    render(<Home />);

    await waitFor(() => {
        expect(screen.getByText('Saldo Atual: R$1000'));
    });

    expect(screen.getByText('List of Transactions'));
});
