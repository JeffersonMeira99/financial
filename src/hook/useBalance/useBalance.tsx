import { Balance } from '../../types/balance/balance';
import { getBalance } from '../../services/balance/balance';
import { useQuery } from '@tanstack/react-query';

export const useBalance = () => {
    return useQuery<Balance[], Error>({
        queryKey: ['balance'],
        queryFn: () => getBalance(),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};
