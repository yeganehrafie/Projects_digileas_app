import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductsBox from "../../components/ProductsBox";
import BtnBack from "../../../../components/common/buttons/BtnBack";
import type { Product } from "../../../../model/Products";
import Loading from "../../../../components/common/loading/Loading";
import { ToastUtils } from "../../../../components/common/utils/ToastUtils";
import Header from "../../Header";
import Footer from "../../Footer";
import BreadCrumb from "../../../../components/common/breadCrumb/BreadCrumb";
import BtnScrollTop from "../../../../components/common/buttons/BtnScrollTop";
import Categories from "../../categories/Categories";
import axios from "axios";

const ProductsSelling: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const categories = [
        { id: 1, name: "لپ تاپ", slug: "لپ-تاپ" },
        { id: 2, name: "اچ پی", slug: "اچ-پی" },
        { id: 3, name: "ایسر", slug: "ایسر" },
        { id: 4, name: "ایسوس", slug: "ایسوس" },
        { id: 5, name: "لنوو", slug: "لنوو" },
        { id: 6, name: "گوشی موبایل", slug: "گوشی-موبایل" },
        { id: 7, name: "سامسونگ", slug: "سامسونگ" },
        { id: 8, name: "اپل", slug: "اپل" },
        { id: 9, name: "گوشی کار کرده", slug: "گوشی-کار-کرده" },
        { id: 10, name: "اکسسوری ها", slug: "اکسسوری-ها" },
        { id: 11, name: "ساعت هوشمند اپل", slug: "اپل-اکسسوری" },
        { id: 12, name: "هندزفری اپل", slug: "هندزفری-اپل" },
        { id: 13, name: "هندزفری سامسونگ", slug: "هندزفری-سامسونگ" },
        { id: 14, name: "ساعت هوشمند سامسونگ", slug: "سامسونگ-اکسسوری" },
        { id: 15, name: "آداپتور اپل", slug: "کلگی-اپل" },
        { id: 16, name: "کنسول بازی", slug: "کنسول-بازی" },
        { id: 17, name: "گجت های هوشمند", slug: "گجت-های-هوشمند" },
        { id: 18, name: "کولر", slug: "کولر" },
        { id: 19, name: "قاب گوشی", slug: "قاب-گوشی" },
    ];
    // Axios API 
    const baseUrl = "https://api.digileas.com/general/products?sort=best_selling";

    //   دریافت محصولات
    const fetchProducts = useCallback(async (page: number, append: boolean = false, categorySlug?: string) => {
        if (isFetching) return;

        setIsFetching(true);

        try {
            let url = baseUrl;

            // اگر دسته‌بندی انتخاب شده باشد
            if (categorySlug) {
                url = `https://api.digileas.com/general/products?category=${encodeURIComponent(categorySlug)}&sort=best_selling`;
            }

            const response = await axios.get(`${url}&page=${page}`);

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

    // وقتی selectedCategories تغییر کرد
    useEffect(() => {
        // ریست کردن stateها
        setProducts([]);
        setCurrentPage(1);
        setHasMore(true);

        if (selectedCategories.length === 0) {
            // اگر هیچ دسته‌بندی انتخاب نشده، همه محصولات را نشان بده
            fetchProducts(1, false);
        } else {
            // اگر دسته‌بندی انتخاب شده، محصولات آن دسته را fetch کن
            const selectedCategory = categories.find(cat => cat.id === selectedCategories[0]);
            if (selectedCategory) {
                fetchProducts(1, false, selectedCategory.slug);
            }
        }
    }, [selectedCategories]);

    //infinite scroll 
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !isFetching) {
                    const selectedCategory = selectedCategories.length > 0
                        ? categories.find(cat => cat.id === selectedCategories[0])
                        : null;

                    fetchProducts(currentPage, true, selectedCategory?.slug);
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
    }, [hasMore, isFetching, currentPage, selectedCategories, fetchProducts]);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleCategoryChange = (categoryIds: number[]) => {
        setSelectedCategories(categoryIds);
    };

    return (
        <>
            <div className="bg-white ">
                {/* Header */}
                <Header />
                {/* BreadCrumb */}
                <BreadCrumb
                    title="لیست محصولات پر فروش"
                    items={[
                        { label: "صفحه اصلی", type: "home" },
                        { label: "محصولات پر فروش" }
                    ]}
                    homePath="/"
                />

                <div className="px-[5%]">
                    {/* back button */}
                    <div className="flex w-full justify-end mt-10">
                        <BtnBack />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                        <div className="box-categories w-full min-h-full  md:w-1/4 p-4 rounded-lg shadow-md overflow-y-auto max-h-96">
                            <div className="categories-content">
                                <div className="title">
                                    <h3 className="text-xl mx-2 text-gray-800 font-semibold">
                                        دسته بندی ها
                                    </h3>
                                </div>
                                <hr className="border-emerald-700 mt-5" />
                                {/* categories */}
                                <Categories
                                    selectedCategories={selectedCategories}
                                    onCategoryChange={handleCategoryChange}
                                />
                            </div>
                        </div>
                        <div className="products w-full md:w-3/4">
                            <ProductsBox
                                products={products}
                                onQuickView={handleQuickView}
                                selectedProduct={selectedProduct}
                                isModalOpen={isModalOpen}
                                onCloseModal={handleCloseModal}
                                useSwiper={false}
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

                {/* Footer */}
                <Footer />
                <BtnScrollTop />
            </div>
        </>
    );
};

export default ProductsSelling;