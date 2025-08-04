import type { User } from "./User";

export interface Kyc {
    id: number;
    userId: number;
    fullName: string;
    nik: string;
    placeOfBirth: string;
    dateOfBirth: string;
    address: string;
    ktpPhoto: string;
    selfiePhoto: string;
    status: string;
    rejectedReason: string;
    user: User;
};