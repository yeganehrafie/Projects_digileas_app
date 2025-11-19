export interface User {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    gender?: boolean;
    nationalCode?: string;
    idNumber?: string;
    postalCode?: string;
    cityId?: number;
    address?: string;
    image?: string;
    phoneNumber?: string;
    lable?: string;
    roleIds?: number[];
    role?: number;
    email?: string;
    id?: string;
}

export interface UserProductsBoxProps {
    user?: User[];
    isLoading?: boolean;
    onQuickView?: (product: User) => void;
    selectedProduct?: User | null;
    isModalOpen?: boolean;
    onCloseModal?: () => void;
    title?: string;
    useSwiper?: boolean;
    isFavoritePage?: boolean;
    onRemoveFromFavorites?: (productId: string) => void;
}