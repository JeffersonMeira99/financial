import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');
        setLoginError('');
        setLoading(true);

        if (!email) {
            setEmailError('O email é obrigatório.');
            setLoading(false);
            return;
        } else if (!validateEmail(email)) {
            setEmailError('O email não é válido.');
            setLoading(false);
            return;
        }

        if (!password) {
            setPasswordError('A senha é obrigatória.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/login', { email, password });

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                setLoginError(
                    'Falha ao fazer login. Verifique suas credenciais.',
                );
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setLoginError('Falha ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="grey.100"
        >
            <Paper elevation={3} className="p-8 w-full max-w-sm">
                <Typography variant="h5" component="h2" gutterBottom>
                    Login
                </Typography>
                {loginError && <Alert severity="error">{loginError}</Alert>}
                <Box
                    component="form"
                    onSubmit={e => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
