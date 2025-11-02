import React, { useState, useEffect } from "react";
import type { Order } from "../../../model/Order";
import Loading from "../../../components/common/loading/Loading";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import BtnDelete from "../../../components/common/buttons/BtnDelete";
import { truncateText } from "../../utils";

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = () => {
            setIsLoading(true);
            try {
                const saved = localStorage.getItem("orders");
                if (saved) {
                    const parsed = JSON.parse(saved) as Order[];
                    setOrders(parsed);
                } else {
                    setOrders([]);
                }
            } catch (e) {
                console.error("Failed to load orders", e);
                setOrders([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadOrders();
    }, []);

    // حذف سفارش
    const handleDeleteOrder = (orderId: string) => {
        const updated = orders.filter(order => order.id !== orderId);
        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
        ToastUtils.success("سفارش با موفقیت حذف شد");
    };

    const getStatusText = (status: "paid" | "unpaid") => {
        return status === "paid" ? "پرداخت شده" : "پرداخت نشده";
    };

    const getStatusClass = (status: "paid" | "unpaid") => {
        return status === "paid"
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200 text-md"
            : "bg-[#FFDEDE] text-[#DD0303] border border-[#F75A5A] text-md";
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loading />
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <>
                <BreadCrumb
                    items={[
                        { link: "/user/dashboard", label: "داشبرد" },
                        { link: "", label: "پرداخت های من" },
                    ]}
                />
                <div className="products pb-10">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">اطلاعاتی برای نمایش وجود ندارد</h3>
                        <p className="text-gray-600 text-sm"> سفارشی در این بخش یافت نشد.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "", label: "سفارشات من" },
                ]}
            />
            <div className="orders mt-10">
                <div className="overflow-x-auto border border-gray-200 shadow-md rounded-sm">
                    {/* نسخه دسکتاپ  */}
                    <table className="w-full table-auto border-collapse text-md font-medium hidden md:table">
                        <thead className="bg-gray-50">
                            <tr className="text-right text-gray-800 ">
                                <th className="p-3">محصول</th>
                                <th className="p-3">قیمت</th>
                                <th className="p-3">توضیحات</th>
                                <th className="p-3">وضعیت</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b bg-white hover:bg-gray-50 duration-300 text-right text-md text-gray-700">
                                    <td className="p-3 font-medium">{order.product.name}</td>
                                    <td className="p-3">
                                        {order.product.price.offer > 0
                                            ? `${order.product.price.offer.toLocaleString()} تومان`
                                            : `${order.product.price.amount.toLocaleString()} تومان`}
                                    </td>
                                    <td className="p-3 text-justify">
                                        {truncateText(order.description || "توضیحاتی ثبت نشده است", 25)}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}
                                        >
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <BtnDelete
                                            onclick={() => handleDeleteOrder(order.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* نسخه موبایل  */}
                    <div className="md:hidden space-y-4 p-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="space-y-3 text-right">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800 text-lg">{order.product.name}</h4>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}
                                        >
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 rounded-md p-3">
                                        <p className="text-sm text-gray-700 leading-6">
                                            {order.description || "توضیحاتی ثبت نشده است."}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-gray-600">قیمت: </span>
                                            <span className="text-sm font-bold text-gray-800 mr-1">
                                                {order.product.price.offer > 0
                                                    ? `${order.product.price.offer.toLocaleString()} تومان`
                                                    : `${order.product.price.amount.toLocaleString()} تومان`}
                                            </span>
                                            {order.product.price.offer > 0 && (
                                                <span className="text-xs text-gray-500 line-through mr-2">
                                                    {order.product.price.amount.toLocaleString()} تومان
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <BtnDelete
                                            onclick={() => handleDeleteOrder(order.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;