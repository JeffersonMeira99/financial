import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Chip,
    Stack,
} from '@mui/material';
import api from '../../utils/api';

interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: string;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const TransactionList: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: '',
        end: '',
    });
    const [amountRange, setAmountRange] = useState<{
        min: number;
        max: number;
    }>({
        min: 0,
        max: 10000,
    });
    const [selectedChip, setSelectedChip] = useState<number | null>(null);

    const applyDateFilter = (days: number) => {
        if (selectedChip === days) {
            setDateRange({ start: '', end: '' });
            setSelectedChip(null);
        } else {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - days);
            setDateRange({
                start: startDate.toISOString().split('T')[0],
                end: endDate.toISOString().split('T')[0],
            });
            setSelectedChip(days);
        }
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            console.log('Fetching transactions with:', {
                type: typeFilter,
                startDate: dateRange.start,
                endDate: dateRange.end,
                minAmount: amountRange.min,
                maxAmount: amountRange.max,
            });

            try {
                const token = localStorage.getItem('token');

                const response = await api.get('/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        type: typeFilter,
                        startDate: dateRange.start,
                        endDate: dateRange.end,
                        minAmount: amountRange.min,
                        maxAmount: amountRange.max,
                    },
                });
                console.log(response, 'response');
                console.log(response.data, 'response data');

                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [typeFilter, dateRange, amountRange]);

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <Select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value as string)}
                    displayEmpty
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="TED">TED</MenuItem>
                    <MenuItem value="PIX">PIX</MenuItem>
                </Select>
                <TextField
                    type="date"
                    label="Data Inicio"
                    value={dateRange.start}
                    onChange={e => {
                        setDateRange(prev => ({
                            ...prev,
                            start: e.target.value,
                        }));
                    }}
                    InputLabelProps={{ shrink: true, required: true }}
                    sx={{
                        marginLeft: 1,
                    }}
                />
                <TextField
                    type="date"
                    label="Data Fim"
                    value={dateRange.end}
                    onChange={e => {
                        console.log('End Date changed to:', e.target.value);
                        setDateRange(prev => ({
                            ...prev,
                            end: e.target.value,
                        }));
                    }}
                    InputLabelProps={{ shrink: true, required: true }}
                    sx={{ marginLeft: 1 }}
                />

                <TextField
                    type="number"
                    label="Minimo Valor"
                    value={amountRange.min}
                    onChange={e =>
                        setAmountRange(prev => ({
                            ...prev,
                            min: parseFloat(e.target.value),
                        }))
                    }
                    sx={{ marginLeft: 1 }}
                />
                <TextField
                    type="number"
                    label="Maximo Valor"
                    value={amountRange.max}
                    onChange={e =>
                        setAmountRange(prev => ({
                            ...prev,
                            max: parseFloat(e.target.value),
                        }))
                    }
                    sx={{ marginLeft: 1 }}
                />
            </div>

            <Stack direction="row" spacing={1} style={{ marginBottom: '16px' }}>
                <Chip
                    label="7 Dias"
                    onClick={() => applyDateFilter(7)}
                    color={selectedChip === 7 ? 'primary' : 'default'}
                />
                <Chip
                    label="15 Dias"
                    onClick={() => applyDateFilter(15)}
                    color={selectedChip === 15 ? 'primary' : 'default'}
                />
                <Chip
                    label="30 Dias"
                    onClick={() => applyDateFilter(30)}
                    color={selectedChip === 30 ? 'primary' : 'default'}
                />
                <Chip
                    label="90 Dias"
                    onClick={() => applyDateFilter(90)}
                    color={selectedChip === 90 ? 'primary' : 'default'}
                />
            </Stack>

            <List>
                {transactions.map(transaction => (
                    <ListItem key={transaction.id} divider>
                        <ListItemText
                            primary={transaction.description}
                            secondary={`R$ ${transaction.description === 'Transferência' ? '-' : ''} ${transaction.amount.toFixed(2)} - ${formatDate(transaction.date)}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TransactionList;
