import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductsBox from "../../components/ProductsBox";
import BtnBack from "../../../../components/common/buttons/BtnBack";
import type { Product } from "../../../../model/Products";
import Loading from "../../../../components/common/loading/Loading";
import { ToastUtils } from "../../../../components/common/toast/ToastUtils";
import BreadCrumb from "../../../../components/landingLayout/breadCrumb/BreadCrumb";
import BtnScrollTop from "../../../../components/common/buttons/BtnScrollTop";
import axios from "axios";

const ProductsCooler: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);



    // دریافت محصولات
    const fetchProducts = useCallback(async (page: number, append: boolean = false, categorySlug: string = "کولر") => {
        if (isFetching) return;

        setIsFetching(true);

        try {
            const url = `https://api.digileas.com/general/products?category=${encodeURIComponent(categorySlug)}&page=${page}`;

            const response = await axios.get(url);

            if (response.data.ok) {
                const newProducts = response.data.data.data;

                if (append) {
                    setProducts(prev => [...prev, ...newProducts]);
                } else {
                    setProducts(newProducts);
                }

                // بررسی وجود صفحه بعد
                const pagination = response.data.data;
                setHasMore(page < pagination.last_page);

                if (newProducts.length > 0) {
                    setCurrentPage(page + 1);
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            ToastUtils.error("خطا در دریافت محصولات");
            setHasMore(false);
        } finally {
            setIsFetching(false);
        }
    }, [isFetching]);



    // Infinite scroll 
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !isFetching) {
                    fetchProducts(currentPage, true);
                }
            },
            { threshold: 0.1 }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [hasMore, isFetching, currentPage]);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };



    return (
        <>
            <div className="bg-white ">

                {/* BreadCrumb */}
                <BreadCrumb
                    title={'لیست محصولات کولر'}
                    items={[
                        { label: "صفحه اصلی", type: "home" },
                        { label: "محصولات کولر" }
                    ]}
                    homePath="/"
                />

                <div className="px-[5%]">
                    {/* back button */}
                    <div className="flex w-full justify-end mt-10">
                        <BtnBack />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                        <div className="products w-full">
                            <ProductsBox
                                products={products}
                                onQuickView={handleQuickView}
                                selectedProduct={selectedProduct}
                                isModalOpen={isModalOpen}
                                onCloseModal={handleCloseModal}
                                useSwiper={false}
                                isLoading={isFetching}
                            />

                            {/* Loader برای Infinite Scroll */}
                            <div
                                ref={loaderRef}
                                className="flex justify-center items-center py-6"
                            >
                                {isFetching && <Loading />}
                                {!hasMore && products.length > 0 && (
                                    <span></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <BtnScrollTop />
            </div>
        </>
    );
};

export default ProductsCooler;