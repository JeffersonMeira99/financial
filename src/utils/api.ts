import axios from 'axios';
import { useAuthStore } from '../store/auth/auth.store';

export const configApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

configApi.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;

    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});
