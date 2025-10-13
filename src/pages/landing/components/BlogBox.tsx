import React, { useRef } from "react";
import { truncateText } from "../../utils";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import BtnBloges from "../../../components/common/buttons/BtnBlog";
import Loading from "../../../components/common/loading/Loading";
import type { Blog } from "../../../model/Blog";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";

interface BlogBoxProps {
    blogs: Blog[];
    loading?: boolean;
    useSwiper?: boolean;
}

const BlogBox: React.FC<BlogBoxProps> = ({
    blogs = [],
    loading = false,
    useSwiper = false
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const navigate = useNavigate();
    // فرمت تاریخ
    const formatDate = (date: { year: number; month: number; day: number }): string => {
        return `${date.year}/${date.month}/${date.day}`;
    };
    const handleViewDetails = (articlesId: string) => {
        navigate(`/articles/${articlesId}`);
    };
    // Blog Card Component
    const BlogCard = ({ blog }: { blog: Blog }) => (
        <div className="transition-shadow duration-300 group rounded-lg h-full w-[95%]">
            {blog.image?.url && (
                <div
                    onClick={() => handleViewDetails(blog.slug)}
                    className="w-full object-cover overflow-hidden rounded-lg ">
                    <img
                        src={blog.image.url}
                        alt={blog.title}
                        className="w-68 h-full object-cover rounded-lg 
                         group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                </div>
            )}

            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-2 text-sm font-semibold">
                    <span className="flex items-center">
                        <FaRegUserCircle className="text-emerald-500 text-xl mx-2" />
                        <span className="text-gray-700">{blog.author || "نام نویسنده"}</span>
                    </span>
                    <span className="flex items-center">
                        <MdDateRange className="text-emerald-500 text-xl mx-2" />
                        <span className="text-gray-700">{formatDate(blog.created_at)}</span>
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800  group-hover:text-emeral-500 duration-300">
                    {blog.title}
                </h3>

                <p className="text-gray-600  text-md font-medium line-clamp-3 text-justify">
                    {truncateText(blog.content, 25)}
                </p>
                <BtnBloges
                    onClick={() => handleViewDetails(blog.slug)}
                    name="بیشتر بخوانید" />
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="px-[5%] mt-10">
                <Loading />
            </div>
        );
    }
    return (
        <div className="blog">
            {/* Navigation Buttons برای Swiper */}
            {useSwiper && blogs.length > 0 && (
                <div className="flex justify-end items-center mb-6">

                    <div className="flex gap-2">
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
                </div>
            )}

            <div className="blogs pb-10 relative">
                {blogs.length > 0 ? (
                    useSwiper ? (
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
                            slidesPerView={3}
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
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 24,
                                },
                            }}
                            className="blogs-swiper"
                        >
                            {blogs.map((blog) => (
                                <SwiperSlide key={blog.id}>
                                    <BlogCard blog={blog} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // حالت گرید معمولی
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    )
                ) : (
                    <div className="col-span-full flex justify-center items-center h-40">
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogBox;