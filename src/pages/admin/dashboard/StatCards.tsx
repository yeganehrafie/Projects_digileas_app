import React from "react";
import { FaUsers } from "react-icons/fa6";
import { MdOutlinePriceCheck } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";

interface Cards {
    id?: number,
    icon?: React.ElementType,
    price?: string,
    title?: string,
    total?: string,
    date?: string,
    percent?: string,
    num?: string,
}
const StatCards: React.FC = () => {

    const CardsData: Cards[] = [
        {
            id: 1,
            title: "کل کاربران",
            total: "12876",
            date: "از یک ماه قبل",
            icon: FaUsers,
        },
        {
            id: 2,
            title: "فروش امروز",
            price: "50000000 تومان",
            percent: "67% از دو روز پیش",
            icon: MdOutlinePriceCheck,

        },
        {
            id: 3,
            title: "سفارشات جدید",
            num: "45 عدد",
            date: "از دیروز",
            icon: HiShoppingBag,

        },
        {
            id: 4,
            title: "بازدید از سایت",
            num: "906 نفر ",
            date: "35% از پنج روز پیش",
            icon: IoEyeSharp,

        }
    ];

    return (
        <>
            <div className="statCards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-h-full">
                {CardsData.map((card) => {
                    const IconComponent = card.icon;
                    const mainValue = card.total || card.price || card.num || '';
                    const subtitle = card.date || card.percent || '';

                    return (
                        <div key={card.id} className="group">
                            <div className="card-box flex flex-row justify-between items-center text-center space-y-2 rounded-md shadow-lg p-4 w-full 
                                 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                                <div className="card-content text-right space-y-2">
                                    <div className="title">
                                        <h2 className="text-gray-700 text-md font-semibold group-hover:text-gray-50">{card.title}</h2>
                                    </div>
                                    {subtitle && (
                                        <p className="text-xs text-emerald-600 mt-1 group-hover:text-gray-50 ">{subtitle}</p>
                                    )}
                                    <div className="text-emerald-600 text-md group-hover:text-gray-50">
                                        {mainValue}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    {IconComponent && (
                                        <IconComponent className="card-icon bg-emerald-400 h-10 text-gray-50 w-10 md:h-12 md:w-12 rounded-full border
                                        border-emerald-400 p-2 md:p-3  duration-500 group-hover:shadow-md  group-hover:shadow-emerald-100/90 cursor-pointer
                                        group-hover:border-gray-50 group-hover:bg-gray-50 group-hover:text-emerald-400 duration-500" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default StatCards;



