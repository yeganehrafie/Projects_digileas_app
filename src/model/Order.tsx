import type { Product } from "./Products";

export interface Order {
    id: string;
    product: Product;
    status: "paid" | "unpaid";
    createdAt: string;
    description?: string;
}