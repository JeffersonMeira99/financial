import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline /> <App />
        </ThemeProvider>
    </StrictMode>,
);