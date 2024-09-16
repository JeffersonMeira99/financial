import React from 'react';
import { TextField } from '@mui/material';
import { TransactionFormState } from './TransactionFormState';
import { todayDate } from './dateUtils';

interface FormFieldsProps {
    transactionType: 'TED' | 'PIX';
    formData: TransactionFormState;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
    transactionType,
    formData,
    handleChange,
}) => (
    <>
        {transactionType === 'TED' && (
            <>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Banco"
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Agência"
                    name="agency"
                    value={formData.agency}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Conta"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                />
            </>
        )}

        {transactionType === 'PIX' && (
            <TextField
                fullWidth
                margin="normal"
                label="Chave PIX"
                name="key"
                value={formData.key}
                onChange={handleChange}
            />
        )}

        <TextField
            fullWidth
            margin="normal"
            label="CPF/CNPJ"
            name="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
            label="Nome Favorecido"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
            label="Valor"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
            label="Data da Transferência"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="date"
            value={formData.date}
            onChange={handleChange}
            inputProps={{ min: todayDate }}
        />
    </>
);

export default FormFields;
