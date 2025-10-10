import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductsBox from "../../components/ProductsBox";
import BtnBack from "../../../../components/common/buttons/BtnBack";
import type { Product } from "../../../../model/Products";
import Loading from "../../../../components/common/loading/Loading";
import { ToastUtils } from "../../../../components/common/utils/ToastUtils";
import Header from "../../Header";
import Footer from "../../Footer";
import BreadCrumb from "../../../../components/common/breadCrumb/BreadCrumb";
import BtnScrollTop from "../../../../components/common/buttons/BtnScrollTop";
import CategoriesAccessory from "../../categories/CategoriesAccessory";
import axios from "axios";

const ProductsAccessory: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [currentCategorySlug, setCurrentCategorySlug] = useState<string>("اکسسوری-ها");

    // دریافت پارامترهای URL
    const { categorySlug } = useParams<{ categorySlug?: string }>();
    const location = useLocation();

    const categories = [
        { id: 1, name: "اکسسوری ها", slug: "اکسسوری-ها" },
        { id: 2, name: "ساعت هوشمند اپل", slug: "اپل-اکسسوری" },
        { id: 3, name: "هندزفری اپل", slug: "هندزفری-اپل" },
        { id: 4, name: "هندزفری سامسونگ", slug: "هندزفری-سامسونگ" },
        { id: 5, name: "ساعت هوشمند سامسونگ", slug: "سامسونگ-اکسسوری" },
        { id: 6, name: "آداپتور اپل", slug: "کلگی-اپل" },

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
    const fetchProducts = useCallback(async (page: number, append: boolean = false, categorySlug: string = "اکسسوری-ها") => {
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
            fetchProducts(1, false, categorySlug);
        } else {
            setCurrentCategorySlug("اکسسوری-ها");
            setSelectedCategories([]);
            setProducts([]);
            setCurrentPage(1);
            setHasMore(true);
            fetchProducts(1, false, "اکسسوری-ها");
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
            }
        } else {
            if (currentCategorySlug !== "اکسسوری-ها") {
                setCurrentCategorySlug("اکسسوری-ها");
                setProducts([]);
                setCurrentPage(1);
                setHasMore(true);
                fetchProducts(1, false, "اکسسوری-ها");
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
                {/* Header */}
                <Header />
                {/* BreadCrumb */}
                <BreadCrumb
                    title={'لیست محصولات اکسسوری  '}
                    items={[
                        { label: "صفحه اصلی", type: "home" },
                        { label: "محصولات اکسسوری" }
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
                                <CategoriesAccessory
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

                {/* Footer */}
                <Footer />
                <BtnScrollTop />
            </div>
        </>
    );
};

export default ProductsAccessory;