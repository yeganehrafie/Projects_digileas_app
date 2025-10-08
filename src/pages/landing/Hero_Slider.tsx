import React, { useRef, useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../pages/landing/Style/animateAos.css';
import BtnAddCart from "../../components/common/buttons/BtnAddCart";
import Img_hero1 from '../../images/hero-1.png';
import Img_hero3 from '../../images/hero-3.png';
import Img_hero4 from '../../images/hero-4.png';

const HeroSlider: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);


    const animationClasses = {
        'fade-up': 'animate-fade-in-up',
        'fade-right': 'animate-fade-in-right',
        'fade-left': 'animate-fade-in-left',
        'fade-down': 'animate-fade-in-down',
    };


    useEffect(() => {
        // ریست انیمیشن‌ها هنگام تغییر اسلاید
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => {
            el.classList.remove('animate-fade-in-up', 'animate-fade-in-right', 'animate-fade-in-left', 'animate-fade-in-down');
            // فورس ری‌فلو برای ریست انیمیشن
            void (el as HTMLElement).offsetWidth;
        });

        // اجرای مجدد انیمیشن‌ها
        setTimeout(() => {
            elements.forEach(el => {
                const animationType = el.getAttribute('data-animate');
                if (animationType && animationClasses[animationType as keyof typeof animationClasses]) {
                    el.classList.add(animationClasses[animationType as keyof typeof animationClasses]);
                }
            });
        }, 50);
    }, [activeSlide]);


    useEffect(() => {
        const handleSlideChange = () => {
            setActiveSlide(swiperRef.current?.activeIndex || 0);
        };

        const handleTransitionEnd = () => {
            AOS.refreshHard();
        };

        if (swiperRef.current) {
            swiperRef.current.on('slideChange', handleSlideChange);
            swiperRef.current.on('transitionEnd', handleTransitionEnd);
        }

        return () => {
            if (swiperRef.current) {
                swiperRef.current.off('slideChange', handleSlideChange);
                swiperRef.current.off('transitionEnd', handleTransitionEnd);
            }
        };
    }, []);


    const slides = [
        {
            id: 1,
            discount: "تا 20% درصد تخفیف",
            title1: "برای اولین خرید از",
            title2: "دیجی لیز",
            description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            image: Img_hero1,
            bgColor: "bg-gray-100",
            textColor: "text-emerald-500"
        },
        {
            id: 2,
            discount: "پیشنهاد شگفت انگیز",
            title1: "خرید آسان و مطمئن",
            title2: "با دیجی لیز",
            description: "تجربه خریدی لذت بخش با پشتیبانی 24 ساعته",
            image: Img_hero3,
            bgColor: "bg-gray-100",
            textColor: "text-emerald-500"
        },
        {
            id: 3,
            discount: "ارسال رایگان",
            title1: "برای خریدهای بالای",
            title2: "500 هزار تومان",
            description: "سریع ترین زمان ارسال با بهترین بسته بندی",
            image: Img_hero4,
            bgColor: "bg-gray-100",
            textColor: "text-emerald-500"
        }
    ];

    return (
        <div className="hero-slider-container relative">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={false}
                loop={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={`container max-w-full ${slide.bgColor} transition-all duration-1000`}>
                            <div className="hero_slider flex flex-col md:flex-row items-center justify-around space-y-5 md:space-y-0 p-20">
                                <div className="hero-right space-y-4 tracking-wider text-center md:text-right">
                                    <span
                                        data-animate="fade-up"
                                        className={`font-semibold ${slide.textColor} text-lg`}>
                                        {slide.discount}
                                    </span>
                                    <h1
                                        data-animate="fade-left"
                                        className="font-semibold text-gray-800 text-3xl md:text-4xl">
                                        {slide.title1}
                                    </h1>
                                    <h1
                                        data-animate="fade-left"
                                        className={`font-semibold ${slide.textColor} text-3xl md:text-4xl`}>
                                        {slide.title2}
                                    </h1>
                                    <p
                                        data-animate="fade-left"
                                        className="text-justify font-medium text-gray-800 text-xl max-w-md mx-auto md:mx-0">
                                        {slide.description}
                                    </p>
                                    <div data-animate="fade-up" >
                                        <BtnAddCart name="اکنون خرید کنید" />
                                    </div>
                                </div>
                                <div className="hero-left relative">
                                    <img
                                        data-animate="fade-right"
                                        className="max-w-full w-72 md:w-96 h-auto object-cover duration-500"
                                        src={slide.image}
                                        alt={slide.title2}
                                    />
                                </div>
                                <div className="absolute bottom-4 left-0 flex flex-row  px-[12%] ">
                                    <div className="flex flex-row items-center space-x-4 py-2">
                                        <div className="swiper-pagination-custom flex items-center mx-3">
                                            {slides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => swiperRef.current?.slideTo(index)}
                                                    className={`w-2.5 h-2.5 mx-1 rounded-full transition-colors duration-300 ${activeSlide === index ? 'bg-emerald-500' : 'bg-gray-300 hover:bg-emerald-400'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => swiperRef.current?.slideNext()}
                                            className=" p-4 rounded-full bg-[#fff] hover:bg-emerald-500 transition-colors duration-300 group mx-4"
                                        >
                                            <FaChevronRight className="text-gray-600 group-hover:text-white w-4 h-4 group-hover:scale-110 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => swiperRef.current?.slidePrev()}
                                            className=" p-4 rounded-full bg-[#fff] hover:bg-emerald-500 transition-colors duration-300 group "
                                        >
                                            <FaChevronLeft className="text-gray-600 group-hover:text-white w-4 h-4 group-hover:scale-110 transition-transform" />
                                        </button>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};



export default HeroSlider;
