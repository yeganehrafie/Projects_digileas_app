import React from "react";

import { LuUsersRound } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";

import {
    MdOutlineFavoriteBorder,
    MdOutlineDashboardCustomize,
    MdOutlineLibraryBooks,
    MdOutlineLocationOn
} from "react-icons/md";

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    children: {
        label: string;
        href: string;
        main: string;
    }[];
    href: string;
    main: string;
}

const admin_menu: MenuItem[] = [
    {
        label: "داشبورد",
        icon: <MdOutlineDashboardCustomize />,
        children: [],
        href: "/admin/dashboard",
        main: "index",
    },

    {
        label: "محصولات",
        icon: <MdOutlineLibraryBooks />,
        children: [
            {
                label: "محصولات تخفیف‌دار",
                href: "/admin/discount",
                main: "discount",
            },
            {
                label: "محصولات پرفروش",
                href: "/admin/selling",
                main: "selling",
            },
        ],
        href: "",
        main: "products",
    },
    {
        label: "کاربران",
        icon: <LuUsersRound />,
        children: [],
        href: "/admin/users",
        main: "users",
    },
    {
        label: "سفارشات",
        icon: <HiOutlineShoppingCart />,
        children: [],
        href: "/admin/orders",
        main: "orders",
    },
];



const user_menu: MenuItem[] = [
    {
        label: "داشبورد",
        icon: <MdOutlineDashboardCustomize />,
        children: [],
        href: "/user/dashboard",
        main: "index",
    },

    {
        label: "پرداخت های من",
        icon: <MdOutlineLibraryBooks />,
        children: [],
        href: "/user/order",
        main: "order",
    },
    {
        label: "آدرس های من",
        icon: <MdOutlineLocationOn />,
        children: [],
        href: "/user/address",
        main: "Addres",
    },
    {
        label: "علاقه مندی های من",
        icon: <MdOutlineFavoriteBorder />,
        children: [],
        href: "/user/favorites",
        main: "favorits",
    },
];

export const getMenu = (role: number): MenuItem[] => {
    if (role === 0) return admin_menu;
    if (role === 1) return user_menu;
    return user_menu;
};