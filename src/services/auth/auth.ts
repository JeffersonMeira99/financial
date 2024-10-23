import { AxiosError } from 'axios';
import { LoginResponse, RegisterUser } from '../../types/auth-login';
import { configApi } from '../../utils/api';
import { Auth } from '../../types/auth-login/auth-login';

export class AuthService {
    static login = async (credentials: Auth): Promise<LoginResponse> => {
        try {
            const { data } = await configApi.post<LoginResponse>(
                '/auth/login',
                credentials,
            );

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data);
            }
            throw new Error('Não pode iniciar a sessão');
        }
    };

    static registerUser = async (
        dataUser: RegisterUser,
    ): Promise<RegisterUser> => {
        try {
            const { data } = await configApi.post<RegisterUser>(
                '/auth/register',
                dataUser,
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data);
            }
            throw new Error('Não pode registrar o usuario');
        }
    };
}
