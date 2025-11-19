import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMenu } from "./menuService";
import AppContext from "../../../context/AppContext ";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

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

const SideBarItem: React.FC = () => {
    const [menu, setMenu] = useState<MenuItem[] | null>(null);
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const { user } = useContext(AppContext);

    const location = useLocation();

    useEffect(() => {
        if (user) {
            const role = user?.roleIds?.[0];
            if (role !== undefined) {
                const m = getMenu(role);
                setMenu(m);
            }
        }
    }, [user]);

    const toggleMenu = (index: number) => {
        if (openMenu === index) {
            setOpenMenu(null);
        } else {
            setOpenMenu(index);
        }
    };

    const isItemActive = (item: MenuItem) => {
        if (item.children.length > 0) {
            return item.children.some(child => isChildActive(child));
        }
        return location.pathname === item.href;
    };

    const isChildActive = (child: { href: string }) => {
        return location.pathname === child.href;
    };


    return (
        menu && (
            <div className="space-y-3 text-gray-800 font-meduim overflow-x-hidden mt-4">
                {menu.map((item, index) => (
                    <div key={index}>
                        <Link
                            to={item.href}
                            className={`${isItemActive(item)
                                ? "bg-emerald-50 text-emerald-500 rounded-sm "
                                : "border-transparent "
                                } flex flex-row  gap-1 py-2 px-1  cursor-pointer
                                hover:mr-2  hover:duration-500`}
                            onClick={(e) => {
                                if (item.children.length > 0) {
                                    e.preventDefault();
                                    toggleMenu(index);
                                }
                            }}
                        >
                            <div className="w-fit text-xl  px-2 lg:px-0  text-center text-emerald-500 font-bold">
                                {item.icon}
                            </div>
                            <div className="flex-grow text-right  text-md ">{item.label}</div>

                            <div className="w-fit">
                                {item.children.length > 0 && (
                                    openMenu === index ? (
                                        <FaChevronUp className="text-gray-400 text-xs" />
                                    ) : (
                                        <FaChevronDown className="text-gray-400 text-xs" />
                                    )
                                )}
                            </div>
                        </Link>

                        {item.children.length > 0 && openMenu === index && (
                            <div className="text-right z-50 w-full h-fit mb-5 space-y-2 text-sm">
                                {/* sub menu */}
                                {item.children.map((child, childIndex) => (
                                    <Link
                                        to={child.href}
                                        key={`${index}-${childIndex}`}
                                    >
                                        <div
                                            className={`p-2 w-full mt-2 pr-[30px] 
                                                ${isChildActive(child) ? "bg-emerald-50 text-emerald-500 rounded-sm " : "border-transparent"} 
                                                hover:mr-2  hover:duration-500`}
                                        >
                                            {child.label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    );
};

export default SideBarItem;