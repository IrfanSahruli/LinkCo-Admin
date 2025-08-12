import type { Product } from "./Product";
import type { User } from "./User";

export interface Order {
    id: number;
    orderId: string;
    userId: number;
    user: User;
    productId: number;
    product: Product;
    jumlah: number;
    total: number;
    status: string;
};

export interface Statistik {
    month: number;
    totalIncome: number;
};