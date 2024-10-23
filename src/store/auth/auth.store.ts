import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { AuthStatus, RegisterUser, User } from '../../types/auth-login';
import { AuthService } from '../../services/auth/auth';
import { Auth } from '../../types/auth-login/auth-login';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    loginUser: (credentials: Auth) => Promise<void>;
    logoutUser: () => void;
    registerUser: (data: RegisterUser) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = set => ({
    status: 'unauthorized',
    token: undefined,
    user: undefined,
    loginUser: async (credentials: Auth) => {
        try {
            const response = await AuthService.login(credentials);

            if (response) {
                const { token, ...user } = response;

                set({ status: 'authorized', token, user });
            }
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined });
            toast.error('Credenciais incorretas ou erro na autenticação');
        }
    },
    logoutUser: () => {
        set({ status: 'unauthorized', token: undefined, user: undefined });
    },
    registerUser: async (data: RegisterUser) => {
        try {
            await AuthService.registerUser(data);
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
});

export const useAuthStore = create<AuthState>()(
    devtools(persist(storeApi, { name: 'auth-storage' })),
);
