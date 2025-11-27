import React, { useState, useCallback, useEffect } from "react";
import BtnViewMoreDashboard from "../../../components/common/buttons/BtnViewMoreDashboard";
import type { Product } from "../../../model/Products";
import axios from "axios";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import { truncateText } from "../../utils";
interface persons {
    id: number,
    orders: string,
    client: string,
    price: string,
    status: string
}
const OrdersAndProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const baseUrl = "https://api.digileas.com/general/products?sort=special_offer";
    //   دریافت محصولات
    const fetchProducts = useCallback(async (page: number, append: boolean = false, categorySlug?: string) => {


        try {
            let url = baseUrl;

            if (categorySlug) {
                url = `https://api.digileas.com/general/products?category=${encodeURIComponent(categorySlug)}&sort=special_offer`;
            }

            const response = await axios.get(`${url}&page=${page}`);

            if (response.data.ok) {
                const newProducts = response.data.data.data;

                if (append) {
                    setProducts(prev => [...prev, ...newProducts]);
                } else {
                    setProducts(newProducts);
                }


            }
        } catch (error) {
            console.error("Error fetching products:", error);
            ToastUtils.error("خطا در دریافت محصولات");
        }
    }, []);
    useEffect(() => {
        fetchProducts(1);
    }, [])


    const PersonsData: persons[] = [
        { id: 1, client: "یگانه رفیع", price: "12000000", status: "پرداخت شده", orders: "#1dffm" },
        { id: 2, client: "رویا میر علمی", price: "11000000", status: "پرداخت شده", orders: "#1d23ffm" },
        { id: 3, client: "پارسا پیروزفر", price: "1000000", status: "پرداخت نشده", orders: "#1dffffm" },
        { id: 4, client: "آتنا مهدوی", price: "15000000", status: "ارسال شده", orders: "#1sddffm" },
    ]


    return (
        <>
            <div className="card-Orders w-full max-h-full mt-20 px-4">
                <div className="Orders-content flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-full">
                    <div className="Orders-right w-full md:w-1/2 rounded-md shadow-lg bg-gray-50 p-4 flex flex-col items-start text-start justify-start">
                        <div className="Orders w-full mb-4">
                            <div className="title flex justify-between items-center w-full">
                                <h4 className="text-gray-700 font-semibold">آخرین سفارشات</h4>
                                <BtnViewMoreDashboard text="مشاهده همه" link="/admin/orders" />
                            </div>
                            <div className="content w-full overflow-x-auto mt-5">
                                <table className="w-full text-sm text-right text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase border  border-b-emerald-500 border-r-0 border-l-0 border-t-0">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 font-semibold">شماره سفارش</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">مشتری</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">مبلغ</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">وضعیت</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PersonsData.map((person) => (
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="products-left w-full md:w-1/2 rounded-md shadow-lg bg-gray-50 p-4 flex flex-col items-start text-start justify-start">
                        <div className="products w-full mb-4">
                            <div className="title flex justify-between items-center w-full">
                                <h4 className="text-gray-700 font-semibold">محصولات پرفروش</h4>
                                <BtnViewMoreDashboard text="مشاهده همه" link="/admin/selling" />
                            </div>
                            <div className="content w-full overflow-x-auto mt-5">
                                <table className="w-full text-sm text-right text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase border border-b-emerald-500 border-r-0 border-l-0 border-t-0">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 font-semibold">تصویر</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">نام محصول</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">قیمت</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.slice(0, 4).map((product) => (
                                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <img src={product.image.url}
                                                        alt={product.name}
                                                        className="rounded-full w-12 h-12 border border-slate-400 object-cover"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 font-medium">
                                                    {truncateText(product.name, 5)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {product.price.amount} تومان
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {products.length === 0 && (
                                    <div className="text-gray-500 text-sm text-center py-4">در حال بارگذاری...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OrdersAndProducts;