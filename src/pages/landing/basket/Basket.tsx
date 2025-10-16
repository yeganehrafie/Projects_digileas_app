import React, { useState, useEffect } from "react";
import type { BasketItem } from "../../../model/Basket";
import Loading from "../../../components/common/loading/Loading";
import { TiDeleteOutline } from "react-icons/ti";
import BtnAddCart from "../../../components/common/buttons/BtnAddCart";
import Counter from "../../../components/common/counter/Counter";
import BreadCrumb from "../../../components/landingLayout/breadCrumb/BreadCrumb";

const Basket: React.FC = () => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const loadBasket = () => {
            const basketData = localStorage.getItem("basket");
            if (basketData) {
                setBasket(JSON.parse(basketData));
            }
            setLoading(false);
        };

        loadBasket();
    }, []);

    //remove product
    const handleRemoveItem = (productId: string) => {
        const updatedBasket = basket.filter(item => item.product.id !== productId);
        setBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };
    //QuantityChange
    const handleQuantityChange = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        const updatedBasket = basket.map(item =>
            item.product.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {/* BreadCrumb */}
            <BreadCrumb
                title="سبد خرید"
                items={[
                    { label: "صفحه اصلی", type: "home" },
                    { label: "سبد خرید" }
                ]}
                homePath="/"
            />
            <div className="bg-white">
                <div className="container mx-auto px-4 py-8  mt-10">
                    {basket?.length === 0 ? (
                        <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-sm text-center">
                            محصولی در سبد خرید شما موجود نیست
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* نسخه دسکتاپ - جدول */}
                            <div className="hidden md:block">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row font-bold p-4 text-center  border-b">
                                        <div className="flex flex-row w-full text-base text-gray-800">
                                            <span className="w-1/4">تصویر</span>
                                            <span className="w-1/4">نام محصول</span>
                                            <span className="w-1/6">قیمت</span>
                                            <span className="w-1/6">تعداد</span>
                                            <span className="w-1/6"></span>
                                        </div>
                                    </div>

                                    {basket.map((item: BasketItem) => {
                                        return (
                                            <div
                                                key={item.product.id}
                                                className="flex flex-row p-4 border-b gap-4 items-center text-gray-800 hover:bg-gray-50 duration-500"
                                            >
                                                <div className="flex flex-row w-full items-center text-center">
                                                    <span className="w-1/4 flex justify-center">
                                                        <img
                                                            src={item.product.image.url}
                                                            alt={item.product.image.alt || item.product.name}
                                                            className="w-40 text-justify p-2 border border-emerald-400 object-cover rounded-md"
                                                        />
                                                    </span>
                                                    <span className="w-1/4 font-medium text-justify">
                                                        {item.product.name}
                                                    </span>
                                                    <span className="w-1/6 font-medium">
                                                        <span className="text-lg ">
                                                            {item.product.price?.amount?.toLocaleString() || 0} تومان
                                                        </span>
                                                    </span>
                                                    <span className="w-1/6">
                                                        <Counter
                                                            count={item.quantity || 1}
                                                            onCountChange={(newCount) => handleQuantityChange(item.product.id, newCount)}
                                                        />
                                                    </span>
                                                    <span className="w-1/6">
                                                        <button
                                                            onClick={() => handleRemoveItem(item.product.id)}
                                                            className="bg-transparent outline-none"
                                                        >
                                                            <TiDeleteOutline className=" hover:text-[#DD0303] duration-500 text-2xl font-meduim" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* جمع کل محصولات  */}
                                    <div className=" px-[5%] flex items-center justify-between  mt-2 text-lg">
                                        <div className="totalPrice">
                                            <span className="mx-2  font-bold">جمع کل سبد خرید:</span>
                                            <span className="font-bold text-emerald-500 ">
                                                {basket.reduce((total, item) => {
                                                    return total + ((Number(item.product.price?.amount) || 0) * (Number(item.quantity) || 1));
                                                }, 0).toLocaleString()} تومان
                                            </span>
                                        </div>
                                        <div className="btn shop-basket">
                                            <BtnAddCart name="ادامه خرید" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* نسخه موبایل - کارت‌ها */}
                            <div className="md:hidden space-y-4">
                                {basket.map((item: BasketItem) => {
                                    return (
                                        <div key={item.product.id} className="border rounded-lg p-4 shadow-sm bg-white  text-gray-800 hover:bg-gray-50 duration-500">
                                            <div className="flex items-center  mb-3">
                                                <img
                                                    src={item.product.image.url}
                                                    alt={item.product.image.alt || item.product.name}
                                                    className="w-40 p-2 text-justify border  border-emerald-400 object-cover rounded-md"
                                                />
                                                <div className="flex-1 mx-4">
                                                    <h3 className="text-sm mb-1 text-justify">{item.product.name}</h3>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
                                                <div className="flex items-center justify-start">
                                                    <span className="font-bold mx-2">تعداد:</span>
                                                    <div className="flex items-center space-x-2 text-center">
                                                        <Counter
                                                            count={item.quantity || 1}
                                                            onCountChange={(newCount) => handleQuantityChange(item.product.id, newCount)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end">
                                                    <span className="font-bold mx-2">قیمت:</span>
                                                    <span className="font-meduim ">
                                                        {((Number(item.product.price?.amount) || 0) * (Number(item.quantity) || 1)).toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3 flex justify-end">
                                                <button
                                                    onClick={() => handleRemoveItem(item.product.id)}
                                                    className="bg-transparent outline-none"
                                                >
                                                    <TiDeleteOutline className=" hover:text-[#DD0303] duration-500 text-2xl font-meduim" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* جمع کل محصولات */}
                                <div className=" px-[5%] flex items-center justify-between  mt-2 text-lg">
                                    <div className="totalPrice">
                                        <span className="mx-2  font-bold">جمع کل سبد خرید:</span>
                                        <span className="font-bold text-emerald-500 ">
                                            {basket.reduce((total, item) => {
                                                return total + ((Number(item.product.price?.amount) || 0) * (Number(item.quantity) || 1));
                                            }, 0).toLocaleString()} تومان
                                        </span>
                                    </div>
                                    <div className="btn shop-basket">
                                        <BtnAddCart name="ادامه خرید" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div >
            </div >
        </>

    );
}

export default Basket;