import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Divider,
    Box,
} from '@mui/material';

interface TransactionSummaryDialogProps {
    open: boolean;
    onClose: () => void;
    transactionSummary: string;
    onCloseAndUpdate?: () => void; // Add this prop
}

const TransactionSummaryDialog: React.FC<TransactionSummaryDialogProps> = ({
    open,
    onClose,
    transactionSummary,
    onCloseAndUpdate,
}) => {
    const formatSummary = (summary: string) => {
        return summary.split('\n').map((line, index) => (
            <Typography key={index} variant="body1" paragraph>
                {line}
            </Typography>
        ));
    };

    const handleClose = () => {
        if (onCloseAndUpdate) {
            onCloseAndUpdate(); // Call the callback if provided
        }
        onClose(); // Always call the onClose handler
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Resumo da Transação</DialogTitle>
            <DialogContent>
                <Box>{formatSummary(transactionSummary)}</Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransactionSummaryDialog;
