import React from "react";
import { Link } from "react-router-dom";

interface BreadCrumbItem {
    label: string;
    link: string;
}

interface BreadCrumbProps {
    items: BreadCrumbItem[];
}
const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => {
    return (
        <nav className="p-3 mb-4 md:mb-2 relative z-[300] md:z-[300]">
            <ul className="flex flex-row  font-meduim  gap-1 md:gap-2">
                {items?.map((item, index) => (
                    <li key={index + "bbr"}>
                        {index < items.length - 1 ? (
                            <>
                                <Link className="text-emerald-500" to={item.link}>
                                    {item.label}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default BreadCrumb;
