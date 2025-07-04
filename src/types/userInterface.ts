export interface tokenPayloadInterface {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
}

