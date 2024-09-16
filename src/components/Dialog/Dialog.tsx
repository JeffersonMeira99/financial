import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';

interface PasswordDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
    errorMessage?: string; // Add an optional errorMessage prop
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
    open,
    onClose,
    onConfirm,
    errorMessage, // Receive the errorMessage prop
}) => {
    const [password, setPassword] = React.useState<string>('');

    const handleConfirm = () => {
        onConfirm(password);
        setPassword(''); // Clear password field after confirmation
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Digite a senha de transação</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <Typography color="error" style={{ marginTop: '1rem' }}>
                        {errorMessage}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordDialog;
