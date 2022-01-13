export enum Role {
    user = 'user',
    admin = 'admin',
};

export interface User {
    id: number;
    username: string;
    password?: string;
    role: Role;
}

