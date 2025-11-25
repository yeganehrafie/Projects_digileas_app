import React from "react";
import SalesChart from "../../../components/common/chart/Charts";
import { FaUserAlt } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { AiOutlineComment } from "react-icons/ai";

interface overview {
    id?: number,
    description?: string,
    date?: string,
    icon?: React.ElementType,
}
const Overview: React.FC = () => {

    const overviewData: overview[] = [
        { id: 1, description: "کاربر جدید عضو شده", date: "5 دقیقه قبل", icon: FaUserAlt },
        { id: 2, description: "سفارش جدید ثبت شده", date: "25 دقیقه قبل", icon: HiShoppingBag },
        { id: 3, description: "نظر جدید دریافت شد", date: "36 دقیقه قبل", icon: AiOutlineComment },
    ]

    return (
        <>
            <div className="card-overview w-full max-h-full mt-20 px-4">
                <div className="overview-content flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-full">
                    <div className="overview-right w-full md:w-1/2 rounded-md shadow-lg bg-gray-50 p-4 flex flex-col items-start text-start justify-start">
                        <h4 className="text-gray-700 font-semibold mb-3">نمودار فروش</h4>
                        <SalesChart />
                    </div>
                    <div className="overview-left w-full md:w-1/2 rounded-md shadow-lg bg-gray-50 p-4 flex flex-col items-start text-start justify-start">
                        <div className="title mb-4">
                            <h4 className="text-gray-700 font-semibold">فعالیت‌های اخیر</h4>
                        </div>
                        {overviewData.map((ov) => {
                            const IconComponent = ov.icon;
                            return (
                                <div key={ov.id} className="flex items-center  space-x-3 mb-3 w-full space-y-4 bg-gray-100 rounded-md px-3 py-1">
                                    {IconComponent && <IconComponent className="text-gray-50 bg-emerald-400 h-8 w-8 p-2 rounded-full mt-0.5 flex-shrink-0 " />}
                                    <div>
                                        <p className="text-md font-medium text-gray-800 mx-4">{ov.description}</p>
                                        <span className="text-xs text-gray-500 mx-4">{ov.date}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Overview;