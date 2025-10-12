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
interface MainAttribute {
    id: string;
    title: string;
    value: string;
}
interface Image {
    url: string;
    alt: string;
}
interface categorys {
    title: string;
    slug: string;
}
export interface ProductFeatureDetails {
    price: number;
    offer: number;
    final_price: number;
    is_available: boolean;
    description: string;
    notify_status: boolean;
    introduction_time: string; // زمان معرفی
    product_type: string;
    model: string;
    main_attributes: MainAttribute[];
    images: Image[];
    categories: categorys[];
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
    category_id: number;
    images: ProductImage[] | { [key: string]: ProductImage };
    feature_details: ProductFeatureDetails;
}

export interface ProductsBoxProps {
    products: Product[];
    isLoading?: boolean;
    onQuickView?: (product: Product) => void;
    selectedProduct?: Product | null;
    isModalOpen?: boolean;
    onCloseModal?: () => void;
    title?: string;
    useSwiper?: boolean;
}