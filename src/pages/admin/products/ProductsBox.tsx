import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductsBoxProps, Product } from "../../../model/Products";
import { truncateText, formatPrice } from "../../utils";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import Tooltip from "../../../components/common/tooltipBox/Tooltip";


const ProductsBox: React.FC<ProductsBoxProps> = ({
    products,
    title = "",
    useSwiper = false,
    isLoading = false,
    editBasePath = "/admin/products",
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();

    const handleViewDetails = (productId: string) => {
        navigate(`/products/${productId}`);
    };


    // ProductBox
    const ProductCard = ({ pro }: { pro: Product }) => (
        <div className="box bg-[#F6F9FC] rounded-md shadow-sm border border-gray-100 p-4 text-gray-800 group  transition-all duration-300 relative h-full">

            {/* Discount Label */}
            {pro.price?.offer_percent > 0 && (
                <div className="MuiChip-label absolute top-3 left-0 mx-2 z-10">
                    <span className="bg-[#f05454] text-white rounded-full px-3 py-1 text-xs font-bold">
                        {pro.price.offer_percent}%
                    </span>
                </div>
            )}

            {/* Image Container */}
            <div className="box-content relative overflow-hidden rounded-lg mb-4">
                <img
                    onClick={() => handleViewDetails(pro.slug)}
                    src={pro.image.url}
                    alt={pro.image.alt || pro.name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                />

            </div>

            {/* Product Info */}
            <div className="space-y-3">
                <div className="title">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 h-14">
                        {truncateText(pro.name, 10)}
                    </h2>
                </div>



                <div className="price flex items-center justify-start gap-2">
                    {pro.price?.offer > 0 ? (
                        <>
                            <span className="text-[#f05454] text-lg font-bold">
                                {formatPrice(pro.price?.offer)} تومان
                            </span>
                            <span className="text-gray-500 text-sm line-through">
                                {formatPrice(pro.price?.amount)} تومان
                            </span>
                        </>
                    ) : (
                        <span className="text-gray-800 text-lg font-bold">
                            {formatPrice(pro.price?.amount)} تومان
                        </span>
                    )}
                </div>
            </div>
            <div className="btnEdit absolute bottom-3 left-3 ">
                <Tooltip text="ویرایش اطلاعات">
                    <RiEdit2Line
                        onClick={() => navigate(`${editBasePath}/edit/${pro.slug}`)}
                        className="text-gray-50 bg-[#8493CA] shadow-md hover:bg-[#E83C91] duration-300 rounded-full h-10 w-10 p-2 cursor-pointer"
                    />
                </Tooltip>
            </div>
        </div>

    );

    if (isLoading) {
        return null;
    }
    // Check if products array is empty
    if (!products || products.length === 0) {
        return (
            <div className="products pb-10">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">اطلاعاتی برای نمایش وجود ندارد</h3>
                    <p className="text-gray-600 text-sm">هیچ محصولی در این بخش یافت نشد.</p>
                </div>
            </div>
        );
    }


    return (
        <>
            {/* Title and Navigation */}
            {(title || useSwiper) && (
                <div className="flex justify-between items-center mb-6">
                    {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}

                    {/* Navigation Buttons فقط برای Swiper */}
                    {useSwiper && (
                        <div className="flex gap-2 mr-auto">
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="p-3 rounded-full bg-[#8493CA] hover:bg-emerald-500 text-white transition-colors duration-300"
                            >
                                <FiChevronRight size={20} />
                            </button>
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className="p-3 rounded-full bg-[#8493CA] hover:bg-emerald-500 text-white transition-colors duration-300"
                            >
                                <FiChevronLeft size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="products pb-10 relative">
                {useSwiper ? (
                    // حالت Swiper
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation, Autoplay]}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={24}
                        slidesPerView={4}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        className="products-swiper"
                    >
                        {products.map((pro) => (
                            <SwiperSlide key={pro.id}>
                                <ProductCard pro={pro} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((pro) => (
                            <ProductCard key={pro.id} pro={pro} />
                        ))}
                    </div>
                )}
            </div>

        </>
    );
};

export default ProductsBox;