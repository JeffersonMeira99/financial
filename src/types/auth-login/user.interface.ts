export type User = {
    _id: string;
    email: string;
    name: string;
    access_token?: string;
    refresh_token?: string;
    userId?: number;
};
