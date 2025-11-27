import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../../model/Products";
import Loading from "../../../../components/common/loading/Loading";
import { ToastUtils } from "../../../../components/common/toast/ToastUtils";
import BtnAdd from "../../../../components/common/buttons/BtnAdd";
import axios from "axios"; import BreadCrumb from "../../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import ProductsBox from "../ProductsBox";
const Discount: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const baseUrl = "https://api.digileas.com/general/products?sort=special_offer";

    //   دریافت محصولات
    const fetchProducts = useCallback(async (page: number, append: boolean = false) => {
        if (isFetching) return;
        setIsFetching(true);

        try {
            const response = await axios.get(`${baseUrl}&page=${page}`);
            if (response.data.ok) {
                const newProducts = response.data.data.data;
                const pagination = response.data.data;
                setHasMore(page < pagination.last_page);

                if (append) {
                    // از صفحه دوم به بعد: همه محصولات را اضافه کن
                    setProducts(prev => [...prev, ...newProducts]);
                    setCurrentPage(page + 1);
                } else {
                    // فقط در اولین بار: اولین 4 محصول را نمایش بده
                    const initialFour = newProducts.slice(0, 4);
                    setProducts(initialFour);
                    setCurrentPage(2); // بعدی باید صفحه 2 باشد
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
                    // بدون دسته‌بندی — فقط صفحه بعدی را بگیر
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
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "محصولات تخفیف دار" },
                ]}
            />
            <div className="btnAdd mb-10">
                <BtnAdd name="افزودن محصول جدید" onclick={() => navigate('/admin/discount/add')} />
            </div>
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
        </>
    )
}
export default Discount;