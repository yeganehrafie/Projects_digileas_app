import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/common/logo/Logo";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { FaPhoneFlip } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

const Footer: React.FC = () => {
    return (
        <>
            {/* newsletter */}
            <div className="newsletter mt-10 flex flex-col items-center justify-center bg-[#F6F9FC] py-12">
                <div className="newsletter-content flex flex-col space-y-2 text-center mb-6 lg:mb-0 lg:mr-8">
                    <h3 className="text-3xl font-semibold">
                        <span className="text-gray-800">دریافت کوپن تخفیف</span>
                        <span className="text-emerald-500 mx-1">20%</span>
                    </h3>
                    <p className="text-gray-600 text-xl font-medium">
                        با عضویت در خبرنامه ما
                    </p>
                </div>
                <div className="subscribe-form mt-5">
                    <form className="relative">
                        <input
                            type="email"
                            placeholder="آدرس ایمیل شما"
                            className="w-[450px] lg:w-[640px] px-5 py-4 pr-24 rounded-full outline-none text-gray-800 bg-white
                                     placeholder-gray-500 placeholder:text-right shadow-md"
                        />
                        <button
                            className="absolute flex items-center left-2 top-1/2 transform -translate-y-1/2 
                                    text-white px-6 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 duration-300"
                        >
                            ارسال
                            <FiSend className="mr-2" />
                        </button>
                    </form>
                </div>
            </div>
            {/* footer */}
            <div className="footer bg-[#0E2148] px-4 md:px-[5%]">
                <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                    {/* logo && Social-media */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-100 text-justify text-md  w-full md:w-4/5">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                        </p>
                        <div className="Social-media flex flex-row items-center justify-start gap-3">
                            <FaTelegramPlane className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-100 border border-gray-100 p-2 md:p-3 hover:shadow-lg hover:shadow-emerald-500/80 duration-500 cursor-pointer" />
                            <RiWhatsappFill className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-100 border border-gray-100 p-2 md:p-3 hover:shadow-lg hover:shadow-emerald-500/80 duration-500 cursor-pointer" />
                            <AiFillInstagram className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-100 border border-gray-100 p-2 md:p-3 hover:shadow-lg hover:shadow-emerald-500/80 duration-500 cursor-pointer" />
                        </div>
                    </div>

                    {/* لینک های سریع*/}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl text-gray-100 font-semibold text-right">لینک های سریع</h3>
                        <div className="flex flex-col items-start space-y-2">
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">صفحه اصلی</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">درباره ما</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">وبلاگ</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">راهنمای سفارش</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">تخفیفات ویژه</span></Link>
                        </div>
                    </div>

                    {/* محصولات */}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl text-gray-100 font-semibold text-right">محصولات</h3>
                        <div className="flex flex-col items-start space-y-2">
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">کامپیوتر و لپ تاپ</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">موبایل و تبلت</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">لوازم الکترونیکی</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">خانه و آشپزخانه</span></Link>
                            <Link to=""><span className="text-gray-100 text-md  font-medium hover:underline hover:mr-1 hover:text-emerald-400 duration-500 cursor-pointer">موبایل و تبلت</span></Link>
                        </div>
                    </div>

                    {/* تماس با ما */}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl text-gray-100 font-semibold text-right">تماس با ما</h3>

                        {/* آدرس */}
                        <div className="location flex items-start space-x-2 space-x-reverse">
                            <HiLocationMarker className="text-lg md:text-xl text-emerald-400 mt-1 flex-shrink-0" />
                            <p className="text-justify text-gray-100 text-md ">کرج: لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                        </div>

                        {/* تلفن ها */}
                        <div className="phons space-y-3">
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FaPhoneFlip className="text-lg md:text-xl text-emerald-400 flex-shrink-0" />
                                <p className="text-gray-100 text-md ">026-6474794493904</p>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FaPhoneFlip className="text-lg md:text-xl text-emerald-400 flex-shrink-0" />
                                <p className="text-gray-100 text-md ">026-647493904</p>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FaPhoneFlip className="text-lg md:text-xl text-emerald-400 flex-shrink-0" />
                                <p className="text-gray-100 text-md ">026-647479449</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Footer;