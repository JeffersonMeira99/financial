export type TransactionType = 'TED' | 'PIX';

export interface TransactionFormState {
    cpfCnpj: string;
    account: string;
    bank: string;
    agency: string;
    key: string;
    amount: number;
    date: string;
    name: string;
}
