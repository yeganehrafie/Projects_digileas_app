import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductsBox from "../../components/ProductsBox";
import BtnBack from "../../../../components/common/buttons/BtnBack";
import type { Product } from "../../../../model/Products";
import Loading from "../../../../components/common/loading/Loading";
import { ToastUtils } from "../../../../components/common/toast/ToastUtils";
import BreadCrumb from "../../../../components/landingLayout/breadCrumb/BreadCrumb";
import CategoriesLaptop from "../../categories/CategoriesLaptop";
import axios from "axios";

const ProductsLaptop: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [currentCategorySlug, setCurrentCategorySlug] = useState<string>("لپ-تاپ");

    // دریافت پارامترهای URL
    const { categorySlug } = useParams<{ categorySlug?: string }>();
    const location = useLocation();

    const categories = [
        { id: 1, name: "لپ تاپ", slug: "لپ-تاپ" },
        { id: 2, name: "اچ پی", slug: "اچ-پی" },
        { id: 3, name: "ایسر", slug: "ایسر" },
        { id: 4, name: "ایسوس", slug: "ایسوس" },
        { id: 5, name: "لنوو", slug: "لنوو" },

    ];

    //   پیدا کردن ID دسته‌بندی بر اساس slug // تیدل ایدی به اسلاگ
    const findCategoryIdBySlug = (slug: string): number | null => {
        const category = categories.find(cat => cat.slug === slug);
        return category ? category.id : null;
    };

    //   پیدا کردن slug دسته‌بندی بر اساس ID //تبدیل اسلاگ به ایدی
    const findCategorySlugById = (id: number): string | null => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.slug : null;
    };

    // دریافت محصولات
    const fetchProducts = useCallback(async (page: number, append: boolean = false, categorySlug: string = "لپ-تاپ") => {
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

    // وقتی categorySlug از URL تغییر کرد
    useEffect(() => {
        if (categorySlug) {
            // پیدا کردن ID دسته‌بندی از روی slug
            const categoryId = findCategoryIdBySlug(categorySlug);
            if (categoryId) {
                setSelectedCategories([categoryId]);
            }
            // تنظیم slug جاری برای API calls
            setCurrentCategorySlug(categorySlug);

            // ریست کردن stateها و fetch محصولات جدید
            setProducts([]);
            setCurrentPage(1);
            setHasMore(true);
        } else {
            setCurrentCategorySlug("لپ-تاپ");
            setSelectedCategories([]);
            setProducts([]);
            setCurrentPage(1);
            setHasMore(true);
            fetchProducts(1, false, "لپ-تاپ");
        }
    }, [categorySlug]);

    // وقتی selectedCategories از طریق کامپوننت دسته‌بندی تغییر کرد
    useEffect(() => {
        if (selectedCategories.length > 0) {
            const selectedCategoryId = selectedCategories[0];
            const categorySlug = findCategorySlugById(selectedCategoryId);

            if (categorySlug && categorySlug !== currentCategorySlug) {
                setCurrentCategorySlug(categorySlug);

                // ریست کردن stateها و fetch محصولات جدید
                setProducts([]);
                setCurrentPage(1);
                setHasMore(true);
                fetchProducts(1, false, categorySlug);
            }
        } else {
            if (currentCategorySlug !== "لپ-تاپ") {
                setCurrentCategorySlug("لپ-تاپ");
                setProducts([]);
                setCurrentPage(1);
                setHasMore(true);
                fetchProducts(1, false, "لپ-تاپ");
            }
        }
    }, [selectedCategories]);

    // Infinite scroll 
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !isFetching) {
                    fetchProducts(currentPage, true, currentCategorySlug);
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
    }, [hasMore, isFetching, currentPage, currentCategorySlug]);

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

    // محاسبه دسته‌بندی اولیه برای ارسال به کامپوننت CategoriesMobile
    const getInitialSelectedCategory = (): number | undefined => {
        if (categorySlug) {
            return findCategoryIdBySlug(categorySlug) || undefined;
        }

        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            return findCategoryIdBySlug(categoryParam) || undefined;
        }

        return undefined;
    };

    return (
        <>
            <div className="bg-white ">

                {/* BreadCrumb */}
                <BreadCrumb
                    title={'لیست محصولات لپ تاپ '}
                    items={[
                        { label: "صفحه اصلی", type: "home" },
                        { label: "محصولات لپ تاپ" }
                    ]}
                    homePath="/"
                />

                <div className="px-[5%]">
                    {/* back button */}
                    <div className="flex w-full justify-end mt-10">
                        <BtnBack />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                        <div className="box-categories w-full min-h-full  md:w-1/4 p-4 rounded-lg shadow-md
                          overflow-y-auto max-h-96 scrollbar-minimal">
                            <div className="categories-content">
                                <div className="title">
                                    <h3 className="text-xl mx-2 text-gray-800 font-semibold">
                                        دسته بندی ها
                                    </h3>
                                </div>
                                <hr className="border-emerald-700 mt-5" />
                                {/* categories */}
                                <CategoriesLaptop
                                    selectedCategories={selectedCategories}
                                    onCategoryChange={handleCategoryChange}
                                    initialSelectedCategory={getInitialSelectedCategory()}
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

            </div>
        </>
    );
};

export default ProductsLaptop;