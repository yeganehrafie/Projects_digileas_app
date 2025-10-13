import { createContext } from "react";
import type { User } from "../model/User";
import type { BasketItem } from "../model/Basket";

export interface BusinessRoleUser {
    business_id?: string;
}

export interface ContextType {
    user?: User;
    currentUser?: User;
    currentBusinessRoleUser?: BusinessRoleUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    idToken?: string;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setIdToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    isVerified: boolean;
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
    basket?: BasketItem[];
    setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}

const defaultContext: ContextType = {
    currentBusinessRoleUser: undefined,
    user: undefined,
    currentUser: undefined,
    setCurrentUser: () => { },
    idToken: undefined,
    setUser: () => { },
    setIdToken: () => { },
    isVerified: false,
    setIsVerified: () => { },
    basket: undefined,
    setBasket: () => { },
};

const AppContext = createContext<ContextType>(defaultContext);

export default AppContext;