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
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200 text-md "
            : "bg-[#FFDEDE] text-[#DD0303] border border-[#F75A5A] text-md cursor-pointer";
    };

    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "", label: "سفارشات من" },
                ]}
            />

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <Loading />
                </div>
            )}

            {!isLoading && (
                <div className="orders mt-10">
                    {(!orders || orders.length === 0) ? (
                        <div className="flex flex-col items-center justify-center  text-center mt-10">
                            <span className=" font-meduim p-3 rounded-md bg-amber-400 text-white text-md w-full border-double border-4 border-white">
                                اطلاعاتی برای نمایش وجود ندارد
                            </span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto border border-gray-200 shadow-md rounded-sm">
                            {/* نسخه دسکتاپ */}
                            <table className="w-full table-auto border-collapse text-md font-medium hidden md:table">
                                <thead className="bg-[#F4F6FF]">
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
                                                {order.product.price.offer.toLocaleString()} تومان
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

                            {/* نسخه موبایل */}
                            <div className="md:hidden space-y-4 p-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="space-y-3 text-right">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-800 text-md">{order.product.name}</h4>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}
                                                >
                                                    {getStatusText(order.status)}
                                                </span>
                                            </div>

                                            <div className="bg-gray-50 rounded-md p-3">
                                                <p className="text-md text-gray-700 leading-6">
                                                    {order.description || "توضیحاتی ثبت نشده است."}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                <div className="text-right">
                                                    <span className="text-md font-medium text-gray-600">قیمت: </span>
                                                    <span className="text-md font-medium text-gray-700 mr-1">
                                                        {order.product.price.offer.toLocaleString()} تومان
                                                    </span>

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
                    )}
                </div>
            )}
        </>
    );
};

export default Orders;

