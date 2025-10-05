import Header from "./Header";
import HeroSlider from "./Hero_Slider";
import CategoriesBox from "./components/CategoriesBox";
import ProductsDiscount from "./products/ProductsDiscount";
import ProductsNew from "./products/ProductsNew";
import ProductsSelling from "./products/ProductsSelling";
import BtnViewMore from "../../components/common/buttons/BtnViewMore";
import CustomerCommentBox from "./components/CustomerCommentBox";
import '../../pages/landing/Style/animateAos.css';
import Img_baner1 from '../../images/baner-1.webp';
import Img_baner2 from '../../images/baner-2.webp';
import Img_baner3 from '../../images/baner-3.webp';
import { TbCategory2 } from "react-icons/tb";
import { HiPercentBadge } from "react-icons/hi2";
import { MdNewReleases, MdOutlineWhatshot } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { PiTruckTrailerBold } from "react-icons/pi";
import { IoMdSync } from "react-icons/io";

const Main = () => {

    const Img_Baners = [
        { id: 1, img: Img_baner1 },
        { id: 2, img: Img_baner2 },
        { id: 3, img: Img_baner3 },
    ];

    const feature_area = [
        { id: 1, title: "تحویل رایگان", description: "سفارش‌های بیش از 500 تومان", icon: <PiTruckTrailerBold /> },
        { id: 2, title: "بازپرداخت", description: "بازگرداندن ظرف 12 روز", icon: <IoMdSync /> },
        { id: 3, title: "پرداخت مطمئن", description: "پرداخت 100% ایمن", icon: <IoWalletOutline /> },
        { id: 4, title: "پشتیبانی 24 ساعته", description: "با ما تماس بگیرید", icon: <FaHeadphonesSimple /> },
    ]

    return (
        <main>
            <div className=" min-h-screen bg-white">
                <Header />
                <HeroSlider />

                {/* CategoriesBox */}
                <section id="CategoriesBox">
                    <div className=" px-[10%] mt-10">
                        {/* title */}
                        <div className="title  flex justify-center items-center ">
                            <TbCategory2 className="text-emerald-500 text-3xl" />
                            <h2 className="text-3xl mx-2 text-gray-800 font-semibold">دسته بندی محصولات</h2>
                        </div>
                        {/* Categories */}
                        <CategoriesBox />
                    </div>
                </section>
                {/* ProductsDiscount */}
                <section id="ProductsDiscount">
                    <div className="flex items-center justify-between px-[10%] mt-20">
                        <div className="title flex items-center">
                            <HiPercentBadge className="text-emerald-500 text-3xl" />
                            <h2 className="text-3xl mx-2 text-gray-800 font-semibold">
                                محصولات تخفیف دار
                            </h2>
                        </div>
                        <div className="btn-more">
                            <BtnViewMore text="مشاهده بیشتر" />
                        </div>
                    </div>
                    <ProductsDiscount />
                </section>
                {/* ProductsNew */}
                <section id="ProductsNew">
                    <div className="flex items-center justify-between px-[10%] mt-10">
                        <div className="title flex items-center">
                            <MdNewReleases className="text-emerald-500 text-3xl" />
                            <h2 className="text-3xl mx-2 text-gray-800 font-semibold">
                                جدیدترین محصولات
                            </h2>
                        </div>
                        <div className="btn-more">
                            <BtnViewMore text="مشاهده بیشتر" />
                        </div>
                    </div>
                    <ProductsNew />
                </section>
                {/* baners */}
                <section id="baners">
                    <div className="baners grid grid-cols-1 lg:grid-cols-3 gap-6 px-[10%] mt-10 ">
                        {Img_Baners.map((baner) => (
                            <div
                                key={baner.id}
                                className="w-full  max-w-full overflow-hidden rounded-xl shadow-md"
                            >
                                <img
                                    src={baner.img}
                                    alt={`بنر ${baner.id}`}
                                    className="w-full h-auto object-cover
                                    cursor-pointer
                                    transition-transform duration-500 ease-in-out
                                    hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </section>
                {/* ProductsSelling */}
                <section id="ProductsNew">
                    <div className="flex items-center justify-between px-[10%] mt-20">
                        <div className="title flex items-center">
                            <MdOutlineWhatshot className="text-emerald-500 text-3xl" />
                            <h2 className="text-3xl mx-2 text-gray-800 font-semibold">
                                پرفروش ترین محصولات
                            </h2>
                        </div>
                        <div className="btn-more">
                            <BtnViewMore text="مشاهده بیشتر" />
                        </div>
                    </div>
                    <ProductsSelling />
                </section>
                {/* feature-area */}
                <section id="feature-area">
                    <div className="feature bg-[#F6F9FC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-[10%] mt-10">
                        {feature_area.map((fe) => (
                            <div
                                key={fe.id}
                                className="w-full max-w-full py-12"
                            >
                                <div className="box flex flex-row items-center justify-center">
                                    <span className="rounded-full w-20 h-20  bg-emerald-500 text-white text-2xl flex items-center justify-center font-bold">
                                        {fe.icon}
                                    </span>
                                    <div className="box-content space-y-2 mx-3">
                                        <h2 className="text-xl font-semibold text-gray-800">{fe.title}</h2>
                                        <p className="text-md text-gray-500">{fe.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* CustomerCommentBox */}
                <CustomerCommentBox />


                {/* Blogs */}

                {/* Footer */}
            </div>
        </main>

    );
}

export default Main;