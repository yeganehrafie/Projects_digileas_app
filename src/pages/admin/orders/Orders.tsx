import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import { exportToExcel } from "../../../components/common/xlsx/GeneratorExcell";
import BtnAdd from "../../../components/common/buttons/BtnAdd";

/**
 * در کنار دریافت داده های اصلی از مدل های orders , user
 * و دریافت لیست از سرور
 * یه لودر و لودینگ برای داده های جدول قرار  بده 
 * و بر اساس فیلتر در هر صفحه مثلا 8 تا  ایتم نمایش داده بشه
 */
interface persons {
    id: number,
    orders: string,
    client: string,
    price: string,
    status: string
}
const Orders: React.FC = () => {


    const PersonsData: persons[] = [
        { id: 1, client: "یگانه رفیع", price: "12000000", status: "پرداخت شده", orders: "#1dffm" },
        { id: 2, client: "رویا میر علمی", price: "11000000", status: "پرداخت شده", orders: "#1d23ffm" },
        { id: 3, client: "پارسا پیروزفر", price: "1000000", status: "پرداخت نشده", orders: "#1dffffm" },
        { id: 4, client: "آتنا مهدوی", price: "15000000", status: "ارسال شده", orders: "#1sddffm" },
    ]
    const handleExport = () => {
        exportToExcel(PersonsData, "لیست-سفارشات");
    };
    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "/admin/orders", label: "لیست سفارشات" },
                ]}
            />
            <div className="card-Orders w-full max-h-full mt-20 px-4">
                <div className="excel mb-10">
                    <BtnAdd name="خروجی فایل اکسل" onclick={handleExport} />
                </div>
                <div className="Orders-content flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-full">
                    <div className="Orders w-full rounded-md shadow-lg bg-gray-50 p-4 flex flex-col items-start text-start justify-start">
                        <div className="Orders w-full mb-4">
                            <div className="content w-full mt-5">
                                {/* حالت دسکتاپ: جدول */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-sm text-right text-gray-700">
                                        <thead className="text-xs text-gray-700 uppercase border border-b-emerald-500 border-r-0 border-l-0 border-t-0">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 font-semibold">شماره سفارش</th>
                                                <th scope="col" className="px-4 py-3 font-semibold">مشتری</th>
                                                <th scope="col" className="px-4 py-3 font-semibold">مبلغ</th>
                                                <th scope="col" className="px-4 py-3 font-semibold">وضعیت</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PersonsData.length > 0 ? (
                                                PersonsData.map((person) => (
                                                    <tr key={person.id} className="border-b hover:bg-gray-50">
                                                        <td className="px-4 py-3 font-medium">{person.orders}</td>
                                                        <td className="px-4 py-3 font-medium">{person.client}</td>
                                                        <td className="px-4 py-3">{person.price} تومان</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${person.status === "پرداخت شده"
                                                                ? "bg-emerald-100 text-emerald-800"
                                                                : person.status === "ارسال شده"
                                                                    ? "bg-[#C2E2FA] text-[#0046FF]"
                                                                    : "bg-[#FFD8D8] text-[#DC0E0E]"
                                                                }`}>
                                                                {person.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                        هیچ سفارشی یافت نشد.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* حالت موبایل: کارت‌ها */}
                                <div className="md:hidden w-full space-y-4">
                                    {PersonsData.length > 0 ? (
                                        PersonsData.map((person) => (
                                            <div key={person.id} className="bg-white rounded-lg shadow p-4 border">
                                                <div className="space-y-2 text-right">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-2">
                                                            <span className="text-sm text-gray-800 font-semibold">شماره سفارش:</span>
                                                            <p className="font-medium text-gray-500 text-sm">{person.orders}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <span className="text-sm text-gray-800 font-semibold">مشتری:</span>
                                                            <p className="font-medium text-gray-500 text-sm">{person.client}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-2">
                                                            <span className="text-sm text-gray-800 font-semibold">مبلغ:</span>
                                                            <p className="font-medium text-gray-500 text-sm">{person.price} تومان</p>
                                                        </div>
                                                        <div className="space-y-2 flex flex-col">
                                                            <span className="text-sm text-gray-800 font-semibold">وضعیت:</span>
                                                            <p className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${person.status === "پرداخت شده"
                                                                ? "bg-emerald-100 text-emerald-800"
                                                                : person.status === "ارسال شده"
                                                                    ? "bg-[#C2E2FA] text-[#0046FF]"
                                                                    : "bg-[#FFD8D8] text-[#DC0E0E]"
                                                                }`}>
                                                                {person.status}
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            هیچ سفارشی یافت نشد.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Orders;