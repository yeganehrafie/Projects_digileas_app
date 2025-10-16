import type { Product } from './Products';

export interface BasketItem {
    product: Product;
     quantity: number;
    orderDate: string;
}

