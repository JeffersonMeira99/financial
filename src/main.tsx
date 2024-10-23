import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/react-query/queryClient.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
