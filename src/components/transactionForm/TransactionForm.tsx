import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Box,
    Paper,
    Alert,
    SelectChangeEvent,
} from '@mui/material';
import api from '../../utils/api';

import { todayDate } from '../FormsFields/dateUtils';
import {
    TransactionFormState,
    TransactionType,
} from '../FormsFields/TransactionFormState';
import FormFields from '../FormsFields/FormFields';
import PasswordDialog from '../Dialog/Dialog';
import TransactionSummaryDialog from '../TransactionSummaryDialog/TransactionSummaryDialog ';

const TransactionForm = () => {
    const [balance, setBalance] = useState<number>(0);
    const [formData, setFormData] = useState<TransactionFormState>({
        cpfCnpj: '',
        account: '',
        bank: '',
        agency: '',
        key: '',
        amount: 0,
        date: todayDate,
        name: '',
    });
    const [transactionType, setTransactionType] =
        useState<TransactionType>('TED');
    const [transactionSummary, setTransactionSummary] = useState<string>('');
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openSummaryDialog, setOpenSummaryDialog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [dialogError, setDialogError] = useState<string>('');
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return setAuthenticated(false);

                await api.get('/auth/status', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const response = await api.get('/balance', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalance(response.data.balance);
                setAuthenticated(true);
            } catch (error) {
                console.error('Authentication check failed:', error);
                setAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTransactionTypeChange = (
        e: SelectChangeEvent<TransactionType>, // Update type here
    ) => {
        setTransactionType(e.target.value as TransactionType);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!authenticated)
            return setErrorMessage(
                'Você precisa estar autenticado para realizar uma transação.',
            );
        if (balance === 0)
            return setErrorMessage(
                'Saldo insuficiente para realizar a transação.',
            );
        if (formData.amount <= 0)
            return setErrorMessage(
                'Por favor, insira um valor para a transação.',
            );
        const today = new Date(todayDate);
        const transactionDate = new Date(formData.date);

        if (transactionDate < today)
            return setErrorMessage(
                'A data da transação não pode ser no passado.',
            );

        setErrorMessage('');
        setOpenDialog(true);
    };

    const handlePasswordSubmit = async (password: string) => {
        if (!password)
            return setDialogError(
                'Senha é necessária para confirmar a transação.',
            );

        try {
            const response = await api.post('/verify-password', { password });
            if (response.data.valid) {
                await api.post(
                    '/transactions',
                    {
                        ...formData,
                        amount: parseFloat(formData.amount.toString()),
                        type: transactionType,
                        description: 'Transferência',
                        date: formData.date,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    },
                );

                setTransactionSummary(`
                    Tipo: ${transactionType}
                    Valor: R$${formData.amount}
                    Data: ${formData.date}
                    ${
                        transactionType === 'TED'
                            ? `Banco: ${formData.bank}\nAgência: ${formData.agency}\nConta: ${formData.account}`
                            : `Chave PIX: ${formData.key}`
                    }
                `);
                setOpenDialog(false);
                setOpenSummaryDialog(true);
            } else {
                setDialogError('Senha incorreta!');
            }
        } catch (error) {
            setDialogError('Erro ao verificar a senha.');
        }
    };

    const handleDialogClose = () => {
        setDialogError(''); // Clear the error message
        setOpenDialog(false); // Close the dialog
        window.location.reload();
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                    Realizar Transação
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="transaction-type-label">
                            Tipo de Transação
                        </InputLabel>
                        <Select
                            labelId="transaction-type-label"
                            id="transaction-type"
                            label="Tipo de Transação"
                            value={transactionType}
                            onChange={handleTransactionTypeChange}
                        >
                            <MenuItem value="TED">TED</MenuItem>
                            <MenuItem value="PIX">PIX</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="h6" gutterBottom>
                        Saldo Atual: R${balance}
                    </Typography>

                    {errorMessage && (
                        <Alert
                            severity="error"
                            style={{ marginBottom: '1rem' }}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    <FormFields
                        transactionType={transactionType}
                        formData={formData}
                        handleChange={handleChange}
                    />

                    <Box textAlign="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Realizar Transferência
                        </Button>
                    </Box>
                </form>

                <PasswordDialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    onConfirm={handlePasswordSubmit}
                    errorMessage={dialogError}
                />

                <TransactionSummaryDialog
                    open={openSummaryDialog}
                    onClose={handleDialogClose}
                    transactionSummary={transactionSummary}
                />
            </Paper>
        </Container>
    );
};

export default TransactionForm;
