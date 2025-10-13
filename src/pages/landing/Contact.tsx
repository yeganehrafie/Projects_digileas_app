import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BreadCrumb from "../../components/common/breadCrumb/BreadCrumb";
import BtnSend from "../../components/common/buttons/BtnSend";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

interface ContactCard {
    id: number;
    icon: React.ElementType;
    title: string;
    details: string[];
    isSocial?: boolean;
    socialIcons?: { icon: React.ElementType; key: string }[];
}

const Contact: React.FC = () => {
    const contactCards: ContactCard[] = [
        {
            id: 1,
            icon: FaHeadphonesSimple,
            title: "ارتباط با ما",
            details: ["026-98989898", "09102605755"]
        },
        {
            id: 2,
            icon: FaLocationDot,
            title: "آدرس فروشگاه",
            details: ["خیابان میلفورد، نیویورک، ایالات متحده آمریکا"]
        },
        {
            id: 3,
            icon: MdEmail,
            title: "به ما ایمیل بزنید",
            details: ["digiles@gmail.com", "digiles@gmail.com"]
        },
        {
            id: 4,
            icon: IoShareSocialSharp,
            title: "شبکه اجتماعی",
            details: [],
            isSocial: true,
            socialIcons: [
                { icon: FaTelegramPlane, key: "telegram" },
                { icon: RiWhatsappFill, key: "whatsapp" },
                { icon: AiFillInstagram, key: "instagram" }
            ]
        }
    ];

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
            <div className="contact px-[10%] max-w-full flex flex-col lg:flex-row gap-8 items-start mt-20">
                <div className="contact-us grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
                    {contactCards.map((card) => (
                        <div key={card.id} className="group">
                            <div className="contact-box flex flex-col items-center text-center space-y-2 rounded-md shadow-lg p-4 w-full max-w-64 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                                <card.icon className="text-white bg-emerald-500 font-bold rounded-full text-3xl w-24 h-24 p-8 group-hover:bg-white group-hover:text-emerald-500 duration-500" />
                                <span className="text-gray-800 font-bold group-hover:text-white duration-500">
                                    {card.title}
                                </span>

                                {card.isSocial ? (
                                    <div className="flex gap-3">
                                        {card.socialIcons?.map((social) => (
                                            <social.icon
                                                key={social.key}
                                                className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3 hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-100/90 cursor-pointer group-hover:text-white group-hover:border-white duration-500"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    card.details.map((detail, index) => (
                                        <span
                                            key={index}
                                            className="text-gray-600 font-meduim group-hover:text-white duration-500"
                                        >
                                            {detail}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* form */}
                <div className="form shadow-lg rounded-md p-4 bg-white flex-1 w-full">
                    <div className="contact-us flex flex-col space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="نام شما *"
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="text"
                                    placeholder="موضوع شما *"
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="ایمیل شما *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <textarea
                                name="contact"
                                placeholder="پیام شما *"
                                rows={5}
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200 resize-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="btnSend mt-4">
                        <BtnSend name="ارسال پیام" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact;