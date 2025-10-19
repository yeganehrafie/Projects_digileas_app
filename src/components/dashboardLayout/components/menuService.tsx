import React from "react";

import {
    FaUserAlt,
} from "react-icons/fa";
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
        label: " کاربران",
        icon: <FaUserAlt />,
        children: [
            {
                label: "ثبت نمرات",
                href: "/admin/user/grade",
                main: "grade",
            },
            {
                label: "کارت آزمون",
                href: "/admin/user/kard",
                main: "kard",
            },
        ],
        href: "",
        main: "",
    },
    {
        label: "آزمون ها",
        icon: <FaUserAlt />,
        children: [],
        href: "/admin/exam/index",
        main: "exam",
    },
    {
        label: "مالی",
        icon: <FaUserAlt />,
        children: [],
        href: "/admin/manager/index",
        main: "manager",
    },
    {
        label: "درخواست ها",
        icon: <FaUserAlt />,
        children: [],
        href: "/admin/ticket/index",
        main: "ticket",
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
        label: "سفارشات ",
        icon: <MdOutlineLibraryBooks />,
        children: [],
        href: "",
        main: "order",
    },
    {
        label: "آدرس های من",
        icon: <MdOutlineLocationOn />,
        children: [],
        href: "",
        main: "Addres",
    },
    {
        label: "علاقه مندی های من",
        icon: <MdOutlineFavoriteBorder />,
        children: [],
        href: "",
        main: "favorits",
    },
];

export const getMenu = (role: number): MenuItem[] => {
    if (role === 0) return admin_menu;
    if (role === 1) return user_menu;
    return user_menu;
};