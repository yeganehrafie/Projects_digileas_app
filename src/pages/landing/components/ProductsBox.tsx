import React, { useRef } from "react";
import Raiting from "../../../components/common/rating/Raiting";
import Modal from "../../../components/common/modal/modal";
import BtnCart from "../../../components/common/buttons/BtnCart";
import Tooltip from "../../../components/common/tooltipBox/Tooltip";
import Loading from "../../../components/common/loading/Loading";
import type { ProductsBoxProps, Product } from "../../../model/Products";
import { truncateText } from "../../utils";
import { FiHeart, FiEye, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';




const ProductsBox: React.FC<ProductsBoxProps> = ({
    products,
    loading = false,
    onQuickView,
    selectedProduct,
    isModalOpen = false,
    onCloseModal,
    title = "",
    useSwiper = false
}) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const formatPrice = (price: string | number): string => {
        const num = typeof price === 'string' ? parseInt(price) : price;
        return new Intl.NumberFormat('fa-IR').format(num);
    };

    const handleQuickView = (product: Product) => {
        if (onQuickView) {
            onQuickView(product);
        }
    };

    // ProductBox
    const ProductCard = ({ pro }: { pro: Product }) => (
        <div className="box bg-[#F6F9FC] rounded-md shadow-sm border border-gray-100 p-4 text-gray-800 group  transition-all duration-300 relative h-full">
            {/* Discount Label */}
            {pro.price.offer_percent > 0 && (
                <div className="MuiChip-label absolute top-3 left-0 mx-2 z-10">
                    <span className="bg-[#f05454] text-white rounded-full px-3 py-1 text-xs font-bold">
                        {pro.price.offer_percent}%
                    </span>
                </div>
            )}

            {/* Image Container */}
            <div className="box-content relative overflow-hidden rounded-lg mb-4">
                <img
                    src={pro.image.url}
                    alt={pro.image.alt || pro.name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Actions */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Tooltip text="نمایش سریع">
                        <button
                            onClick={() => handleQuickView(pro)}
                            className="bg-[#8493CA] text-white p-3 rounded-full shadow-md hover:bg-emerald-500 transition-colors duration-300"
                        >
                            <FiEye size={18} />
                        </button>
                    </Tooltip>

                    <Tooltip text="افزودن به علاقه مندی ها">
                        <button className="bg-[#8493CA] text-white p-3 rounded-full shadow-md hover:bg-emerald-500 transition-colors duration-300">
                            <FiHeart size={18} />
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                <div className="title">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 h-14">
                        {truncateText(pro.name, 10)}
                    </h2>
                </div>

                <div className="rating">
                    <Raiting rating={4} />
                </div>

                <div className="price flex items-center justify-start gap-2">
                    {pro.price.offer > 0 ? (
                        <>
                            <span className="text-[#f05454] text-lg font-bold">
                                {formatPrice(pro.price.offer)} تومان
                            </span>
                            <span className="text-gray-500 text-sm line-through">
                                {formatPrice(pro.price.amount)} تومان
                            </span>
                        </>
                    ) : (
                        <span className="text-gray-800 text-lg font-bold">
                            {formatPrice(pro.price.amount)} تومان
                        </span>
                    )}
                </div>

                <div className="flex justify-end">
                    <BtnCart />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="px-[10%] mt-10">
                <Loading />
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

            {/* Modal */}
            {selectedProduct && (
                <Modal
                    isOpen={isModalOpen || false}
                    onClose={onCloseModal || (() => { })}
                    title={selectedProduct.name}
                    description={selectedProduct.name}
                    categorie="الکترونیک"
                    attributes={selectedProduct.name}
                    price={selectedProduct.price.amount.toString()}
                    price_definition={selectedProduct.price.offer.toString()}
                    img={selectedProduct.image.url}
                />
            )}
        </>
    );
};

export default ProductsBox;