export type LoginResponse = {
    _id: string;
    email: string;
    name: string;
    token: string;
};

export type RegisterUser = {
    name: string;
    description?: string;
    email: string;
    password: string;
};
