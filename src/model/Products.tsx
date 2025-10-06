export interface ProductPrice {
    amount: string;
    offer: number;
    offer_percent: number;
    total: number;
}

export interface ProductImage {
    url: string;
    alt: string;
    is_primary?: boolean;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    product_type: string;
    is_exists: number;
    is_price_visible: string;
    price: ProductPrice;
    image: ProductImage;
    is_favorite: boolean;
    images: ProductImage[] | { [key: string]: ProductImage };
    created_at: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
        timestamp: number;
        date: string;
        time: string;
        ago: string;
        iso: string;
    };
}

export interface ProductsBoxProps {
    products: Product[];
    loading?: boolean;
    onQuickView?: (product: Product) => void;
    selectedProduct?: Product | null;
    isModalOpen?: boolean;
    onCloseModal?: () => void;
    title?: string;
    useSwiper?: boolean;
}