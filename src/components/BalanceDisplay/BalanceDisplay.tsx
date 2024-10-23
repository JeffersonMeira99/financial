import React from 'react';
import {
    Alert,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useBalance } from '../../hook/useBalance/useBalance';

export default function BalanceDisplay() {
    const { data: balanceData, isLoading, isError } = useBalance();

    if (isLoading) {
        return (
            <Card sx={{ maxWidth: 400, margin: '20px auto', padding: '10px' }}>
                <CardContent>
                    <CircularProgress />
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card sx={{ maxWidth: 400, margin: '20px auto', padding: '10px' }}>
                <CardContent>
                    <Alert severity="error">Erro ao carregar o saldo.</Alert>
                </CardContent>
            </Card>
        );
    }

    const balance = balanceData || 0;

    return (
        <Card className="max-w-sm mx-auto my-5 p-4">
            <CardContent className="text-center">
                <Typography
                    variant="h5"
                    component="div"
                    className="text-primary"
                >
                    Saldo Atual
                </Typography>
                <Typography variant="h4" component="p" className="font-bold">
                    R$ {Number(balance).toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
}
