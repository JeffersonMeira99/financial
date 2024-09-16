export const SET_BALANCE = 'SET_BALANCE';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export const setBalance = (balance: number) => ({
    type: SET_BALANCE,
    payload: balance,
});

export const setTransactions = (transactions: any[]) => ({
    type: SET_TRANSACTIONS,
    payload: transactions,
});
