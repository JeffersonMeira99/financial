import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface BalanceDisplayProps {
    balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', padding: '10px' }}>
            <CardContent>
                <Typography variant="h5" component="div" color="primary">
                    Saldo Atual
                </Typography>
                <Typography variant="h4" component="p">
                    R$ {balance.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BalanceDisplay;
