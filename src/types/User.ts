export interface Withdraw {
    id: number;
    userId: number;
    user: User;
    withdrawTo: string;
    noRekening: string;
    totalWithdraw: number;
    selfiePhoto: string
    status: string;
    rejectedReason: string;
};

export interface Affiliate {
    id: number;
    userId: number;
    referral: string;
    referralCode: string;
    referralBy: number;
};

export interface User {
    id?: number;
    name?: string;
    email?: string;
    noHandPhone?: number | string;
    password?: string;
    referralCode?: string;
    affiliate?: Affiliate;
    saldo?: number;
    isKYCApproved?: boolean;
    role?: string;
};