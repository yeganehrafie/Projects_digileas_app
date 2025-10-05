import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import Raiting from "../../../components/common/rating/Raiting";
import Img_comment from '../../../images/commentSvg.svg';
import ImgUser_1 from '../../../images/9.jpg';
import ImgUser_2 from '../../../images/10.jpg';
import ImgUser_3 from '../../../images/11.jpg';
import ImgUser_4 from '../../../images/12.jpg';
import ImgUser_5 from '../../../images/2.jpg';
import ImgUser_6 from '../../../images/6.jpg';
import ImgUser_7 from '../../../images/8.jpg';
import ImgUser_8 from '../../../images/7.jpg';

const CustomerCommentBox: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);


    const CustomerComment = [
        { id: 1, name: "یگانه رفیع", userName: "مشتری", img: ImgUser_7, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 2, name: "سارا بهرامی ", userName: "مشتری", img: ImgUser_4, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 3, name: "نرگس نادی", userName: "مشتری", img: ImgUser_3, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 4, name: "یونس رفیع", userName: "مشتری", img: ImgUser_6, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 5, name: "فاطمه مهدوی", userName: "مشتری", img: ImgUser_2, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 6, name: "ارش کیانی", userName: "مشتری", img: ImgUser_5, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 7, name: "ناصر فیض", userName: "مشتری", img: ImgUser_8, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
        { id: 8, name: "جواد جوادی", userName: "مشتری", img: ImgUser_1, description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" },
    ]

    // محاسبه تعداد اسلایدهای واقعی
    const getTotalSlides = () => {
        return Math.ceil(CustomerComment.length / 4);
    };

    const totalSlides = getTotalSlides();
    return (
        <div className="Customer bg-[#F6F9FC] mt-20 pt-10 pb-10">
            {/* title */}
            <div className="title flex flex-col justify-center items-center space-y-2 mb-10">
                <span className="text-emerald-500 text-md font-semibold">توصیه ها</span>
                <h2 className="text-3xl mx-2 text-gray-800 font-semibold text-center">
                    آنچه
                    مشتری ها
                    <span className="text-emerald-500 mx-1">می گویند</span>
                </h2>
            </div>

            {/* Customer box با Swiper */}
            <div className="px-[5%]">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.realIndex);
                    }}
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    speed={800}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="customer-swiper"
                >
                    {CustomerComment.map((user) => (
                        <SwiperSlide key={user.id}>
                            <div
                                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-gray-800 
                                relative h-full w-full max-w-full space-y-4 mx-auto"
                            >
                                <div className="header-box flex items-center justify-start">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover"
                                        src={user.img}
                                        alt={user.userName}
                                    />
                                    <div className="mx-2">
                                        <h2 className="text-gray-700 font-semibold text-xl">{user.name}</h2>
                                        <span className="text-emerald-500 text-md">{user.userName}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="box-content">
                                    <p className="text-justify text-md text-gray-500 leading-relaxed">
                                        {user.description}
                                    </p>
                                </div>
                                <div className="box-footer flex items-center justify-between">
                                    <Raiting rating={5} />
                                    <img
                                        className="w-20 opacity-30 object-cover"
                                        src={Img_comment}
                                        alt="نظرات"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Pagination  */}
                <div className="swiper-pagination-custom flex items-center justify-center mt-8">
                    {[...Array(totalSlides)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => swiperRef.current?.slideTo(index)}
                            className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${activeSlide === index ? 'bg-emerald-500' : 'bg-gray-300 focus:bg-emerald-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CustomerCommentBox;