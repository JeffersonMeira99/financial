import React from 'react';
import { Box, Paper } from '@mui/material';
import BalanceDisplay from '../../components/BalanceDisplay/BalanceDisplay';
import TransactionList from '../../components/TransactionList/TransactionList';
import api from '../../utils/api';

const Home: React.FC = () => {
    const [balance, setBalance] = React.useState<number>(0);

    React.useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await api.get('/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <Box
            sx={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
            }}
        >
            <Paper sx={{ padding: '16px', marginBottom: '24px' }}>
                <BalanceDisplay balance={balance} />
            </Paper>
            <Paper sx={{ padding: '16px' }}>
                <TransactionList />
            </Paper>
        </Box>
    );
};

export default Home;
