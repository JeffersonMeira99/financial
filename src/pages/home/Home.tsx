import React from 'react';
import { Box, Paper } from '@mui/material';
import BalanceDisplay from '../../components/BalanceDisplay/BalanceDisplay';

const HomePage: React.FC = () => {
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
                <BalanceDisplay />
            </Paper>
        </Box>
    );
};

export default HomePage;
