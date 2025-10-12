import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BreadCrumb from "../../components/common/breadCrumb/BreadCrumb";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

const Contact: React.FC = () => {

    return (
        <>
            <Header />
            <BreadCrumb
                title="ارتباط با ما"
                items={[
                    { label: "صفحه اصلی", type: "home" },
                    { label: "ارتباط با ما" }
                ]}
                homePath="/"
            />
            <div className="contact px-[10%] max-w-full flex flex-col md:flex-row items-center mt-20 gap-8">
                <div className="contact-us grid grid-cols-1 md:grid-cols-2  gap-6 ">
                    <div className="group ">
                        <div className="contact-box flex flex-col  items-center text-center space-y-2 rounded-md shadow-lg p-4 w-64 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                            <FaHeadphonesSimple className="text-white bg-emerald-500 font-bold rounded-full text-3xl w-24 h-24 p-8 group-hover:bg-white group-hover:text-emerald-500 duration-500" />
                            <span className="text-gray-800 font-bold group-hover:text-white duration-500">ارتباط با ما</span>
                            <span className="text-gray-600 font-meduim group-hover:text-white duration-500">026-98989898</span>
                            <span className="text-gray-600 font-meduim group-hover:text-white duration-500">09102605755</span>
                        </div>
                    </div>
                    <div className="group">
                        <div className="contact-box flex flex-col  items-center text-center space-y-2 rounded-md shadow-lg p-4 w-64 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                            <FaLocationDot className="text-white bg-emerald-500 font-bold rounded-full text-3xl w-24 h-24 p-8 group-hover:bg-white group-hover:text-emerald-500 duration-500" />
                            <span className="text-gray-800 font-bold group-hover:text-white duration-500">آدرس فروشگاه</span>
                            <span className="text-gray-600 font-meduim group-hover:text-white duration-500">خیابان میلفورد، نیویورک، ایالات متحده آمریک</span>
                        </div>
                    </div>
                    <div className="group">
                        <div className="contact-box flex flex-col  items-center text-center space-y-2 rounded-md shadow-lg p-4 w-64 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                            <MdEmail className="text-white bg-emerald-500 font-bold rounded-full text-3xl w-24 h-24 p-8 group-hover:bg-white group-hover:text-emerald-500 duration-500" />
                            <span className="text-gray-800 font-bold group-hover:text-white duration-500">به ما ایمیل بزنید</span>
                            <span className="text-gray-600 font-meduim group-hover:text-white duration-500">digiles@gmail.com</span>
                            <span className="text-gray-600 font-meduim group-hover:text-white duration-500">digiles@gmail.com</span>
                        </div>
                    </div>
                    <div className="group">
                        <div className="contact-box flex flex-col  items-center text-center space-y-2 rounded-md shadow-lg p-4 w-64 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                            <IoShareSocialSharp className="text-white bg-emerald-500 font-bold rounded-full text-3xl w-24 h-24 p-8 group-hover:bg-white group-hover:text-emerald-500 duration-500" />
                            <span className="text-gray-800 font-bold group-hover:text-white duration-500">شبکه اجتماعی</span>
                            <div className="flex gap-3 ">
                                <FaTelegramPlane className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3  hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-100/90 cursor-pointer group-hover:text-white group-hover:border-white duration-500" />
                                <RiWhatsappFill className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3  hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-100/90 cursor-pointer group-hover:text-white group-hover:border-white duration-500" />
                                <AiFillInstagram className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3  hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-100/90 cursor-pointer group-hover:text-white group-hover:border-white duration-500" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="form">
                    ghh
                </div>
            </div>
            <Footer />

        </>
    )
}
export default Contact;