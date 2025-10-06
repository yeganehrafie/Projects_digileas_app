import React, { useState, useEffect } from "react";
import ProductsBox from "../../components/ProductsBox";
import BtnBack from "../../../../components/common/buttons/BtnBack";
import type { Product } from "../../../../model/Products";
import axios from "axios";
import { HiPercentBadge } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

/**
 * 
 * چک باکس رو درست کن
 * اسکرولش رو بزار
 *
 * 
 */

const ProductsDiscount: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Axios API 
    const baseUrl = "https://api.digileas.com/general/products?sort=special_offer";

    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            if (response.data.ok) {
                setProducts(response.data.data.data);
                setLoading(false);
            }
        });
    }, []);
    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const categorie = [
        { id: 1, name: "لپ تاپ و کامپیوتر" },
        { id: 2, name: "موبایل و تبلت" },
        { id: 3, name: "لوازم الکترونیک" },
        { id: 4, name: "خانه و آشچز خانه" },
    ]
    return (
        <>
            <div className="bg-white px-[5%]">
                {/* title */}
                <div className="title flex items-center mt-10 max-w-8xl mx-auto px-4 sm:px-6 py-14 md:py-20">
                    <HiPercentBadge className="text-emerald-500 text-3xl" />
                    <h2 className="text-3xl mx-2 text-gray-800 font-semibold">
                        محصولات تخفیف دار
                    </h2>
                </div>
                {/* back button */}
                <div className="flex w-full justify-end">
                    <BtnBack />
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-10">
                    <div className="box-categories w-full md:w-1/4 p-4 rounded-lg shadow-md overflow-y-auto">
                        <div className="categories-content">
                            <div className="title">
                                <h3 className="text-xl mx-2 text-gray-800 font-semibold">
                                    دسته بندی ها
                                </h3>
                            </div>
                            <hr className="border-emerald-700 mt-5" />
                            {/* <div className="categories flex flex-col text-start space-y-8 mt-5">
                                {categorie.map((cat) => (
                                    <div key={cat.id}>
                                        <input type="checkbox" className="" />
                                        <span className="text-md font-meduim text-gray-800 mx-2">{cat.name}</span>
                                    </div>
                                ))}

                            </div> */}
                            <div className="categories flex flex-col text-start space-y-8 mt-5">
                                {categorie.map((cat) => (
                                    <label key={cat.id} className="flex items-center cursor-pointer">
                                        {/* چک‌باکس پنهان با peer */}
                                        <input type="checkbox" className="sr-only peer" />

                                        {/* باکس مربعی سفارشی */}
                                        <div className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 
                                         rounded-sm bg-white mr-2 peer-checked:border-emerald-500 transition-colors duration-200">
                                            <IoMdCheckmark className="text-emerald-500 opacity-0 peer-checked:opacity-100 transition-opacity w-3 h-3" />
                                        </div>

                                        <span className="text-md font-medium text-gray-800">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="products w-full md:w-3/4">
                        <ProductsBox
                            products={products}
                            loading={loading}
                            onQuickView={handleQuickView}
                            selectedProduct={selectedProduct}
                            isModalOpen={isModalOpen}
                            onCloseModal={handleCloseModal}
                            useSwiper={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductsDiscount;