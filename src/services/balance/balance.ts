import { useAuthStore } from '../../store/auth/auth.store';
import { Balance } from '../../types/balance/balance';
import { configApi } from '../../utils/api';

export const getBalance = async (): Promise<Balance[]> => {
    const user = useAuthStore.getState().user?.access_token;
    const userId = useAuthStore.getState().user?.userId;

    const response = await configApi.get(`/transactions/${userId}/balance`, {
        headers: { Authorization: ` Bearer ${user}` },
    });
    return response.data;
};
