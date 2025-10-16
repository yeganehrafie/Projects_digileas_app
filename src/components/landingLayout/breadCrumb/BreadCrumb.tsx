import React from "react";
import { SlHome } from "react-icons/sl";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Img from "./../../../images/BreadCrumb-Img.jpg";

export interface BreadCrumbItem {
    label: string;
    path?: string;
    type?: 'home' | 'dashboard' | 'user-dashboard' | 'admin-dashboard' | 'auto';
}

interface BreadCrumbProps {
    title: string;
    items: BreadCrumbItem[];
    backgroundImage?: string;
    homePath?: string;
    dashboardPath?: string;
    userDashboardPath?: string;
    adminDashboardPath?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
    title,
    items,
    backgroundImage = Img,
    homePath = "/",
    dashboardPath = "/dashboard",
    userDashboardPath = "/user/dashboard",
    adminDashboardPath = "/admin/dashboard"
}) => {
    const location = useLocation();

    // تشخیص خودکار نوع صفحه
    const getAutoType = (): 'home' | 'user-dashboard' | 'admin-dashboard' | 'dashboard' => {
        if (location.pathname === '/') return 'home';
        if (location.pathname.startsWith('/admin')) return 'admin-dashboard';
        if (location.pathname.startsWith('/user')) return 'user-dashboard';
        return 'dashboard';
    };

    const renderBreadcrumbItem = (item: BreadCrumbItem, index: number) => {
        // اگر نوع auto باشد، بر اساس موقعیت فعلی تشخیص بده
        let itemType = item.type;
        if (itemType === 'auto') {
            itemType = getAutoType();
        }

        // item types
        let itemPath = item.path;
        let icon = <MdKeyboardDoubleArrowLeft className="mx-1 text-emerald-700 text-md lg:text-lg" />;

        switch (itemType) {
            case 'home':
                itemPath = homePath;
                icon = <SlHome className="ml-1 text-emerald-700 text-md lg:text-lg" />;
                break;
            case 'dashboard':
                itemPath = dashboardPath;
                break;
            case 'user-dashboard':
                itemPath = userDashboardPath;
                break;
            case 'admin-dashboard':
                itemPath = adminDashboardPath;
                break;
        }

        return (
            <div key={index} className="flex items-center">
                {icon}
                {itemPath ? (
                    <Link
                        to={itemPath}
                        className="text-emerald-700 text-md lg:text-lg hover:text-emerald-800 transition-colors duration-200"
                    >
                        {item.label}
                    </Link>
                ) : (
                    <span className="text-white text-md lg:text-lg">{item.label}</span>
                )}
            </div>
        );
    };

    return (
        <div className="relative w-full h-48 overflow-hidden">
            {/* Background Image */}
            <img
                src={backgroundImage}
                alt="backgroundBreadCrumb"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-start px-[5%]">
                <div className="text-right">
                    {/* Title */}
                    <div className="mb-4">
                        <h2 className="text-xl lg:text-3xl font-bold text-emerald-700">
                            {title}
                        </h2>
                    </div>

                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center justify-start flex-wrap gap-2 text-sm md:text-base">
                        {items.map((item, index) => renderBreadcrumbItem(item, index))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumb;