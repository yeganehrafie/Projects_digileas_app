import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BtnScrollTop from "../../../components/common/buttons/BtnScrollTop";
import BreadCrumb from "../../../components/landingLayout/breadCrumb/BreadCrumb";
import type { Product } from "../../../model/Products";
import axios from "axios";
import Loading from "../../../components/common/loading/Loading";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import { formatPrice, addToBasket, addToFavorites } from "../../utils";
import Raiting from "../../../components/common/rating/Raiting";
import BtnAddCart from "../../../components/common/buttons/BtnAddCart";
import Tooltip from "../../../components/common/tooltipBox/Tooltip";
import CustomerCommentDetails from "./CustomerCommentDetails";
import FormComment from "./FormComment";
import { FiHeart } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";

const ProductsDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("description");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.digileas.com/general/product/${slug}`);

                if (response.data?.ok && response.data.data?.product) {
                    setProduct(response.data.data.product);
                } else {
                    throw new Error("محصول یافت نشد.");
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
                ToastUtils.error("خطا در دریافت اطلاعات محصول");
                setError("محصول مورد نظر یافت نشد.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <div className="text-gray-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">محصول یافت نشد</h3>
                <p className="text-gray-600 mb-4">{error || "لطفاً دوباره تلاش کنید."}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                    بازگشت
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white">
                <BreadCrumb
                    title="جزییات محصول"
                    items={[
                        { label: "صفحه اصلی", type: "home" },
                        { label: product.name }
                    ]}
                    homePath="/"
                />

                <div className="px-[5%] py-10">
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* تصویر محصول */}
                        <div className="md:w-1/2">
                            <img
                                src={product.image.url}
                                alt={product.image.alt || product.name}
                                className="w-[600px] h-auto rounded-lg shadow-md object-cover "
                            />
                            {/* اسلایدر تصاویر اضافی  */}
                        </div>


                        <div className="md:w-1/2 space-y-4">
                            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                            {/* Raiting */}
                            <Raiting rating={4} />
                            {/* price */}
                            <div className="price flex items-center ">
                                {product.feature_details.offer > 0 ? (
                                    <>
                                        <span className="text-[#f05454] text-lg font-bold mx-4">
                                            {formatPrice(product.feature_details.final_price)} تومان
                                        </span>
                                        <span className="text-gray-500 text-sm line-through ">
                                            {formatPrice(product.feature_details.price)} تومان
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-gray-800 text-lg font-bold ">
                                        {formatPrice(product.feature_details.price)} تومان
                                    </span>
                                )}
                            </div>
                            <div className="stock-status">
                                <span className="text-gray-800 mx-1 ">موجودی:</span>
                                {product.is_exists ? (
                                    <span className="text-gray-600 ">موجود در انبار</span>
                                ) : (
                                    <span className="text-gray-600  ">ناموجود</span>
                                )}
                            </div>

                            <div className="description">
                                <p className="text-gray-600 text-justify text-md">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                </p>
                            </div>

                            <hr className="border-emerald-200 mt-5" />

                            <div className="flex  items-center justify-between gap-5 mt-5">
                                <div className="flex items-center gap-5">
                                    <div className="button">
                                        <BtnAddCart
                                            onclick={() => addToBasket(product)}
                                            name="افزودن به سبد خرید" />
                                    </div>
                                    <div className="FiHeart">
                                        <Tooltip text="افزودن به علاقه مندی ها">
                                            <button
                                                onClick={() => addToFavorites(product)}
                                                className="bg-white text-emerald-500 p-4 border border-gray-300 rounded-full hover:text-[#FF3F33] ">
                                                <FiHeart size={18} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                                {/* Social-media  */}
                                <div className="Social-media flex flex-row items-center justify-start gap-3">
                                    <span className="text-gray-800">اشتراک گذاری:</span>
                                    <FaTelegramPlane className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3  hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-500/30 cursor-pointer" />
                                    <RiWhatsappFill className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3  hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-500/30  cursor-pointer" />
                                    <AiFillInstagram className="h-10 w-10 md:h-12 md:w-12 rounded-full text-gray-400 border border-gray-300 p-2 md:p-3  hover:text-emerald-500 duration-500 hover:shadow-md hover:shadow-emerald-500/30  cursor-pointer" />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* تب‌ها: توضیحات، ویژگی‌ها و دیدگاه‌ها */}
                    <div className="mt-10">
                        <div className="tabs flex items-center border-b border-emerald-200 gap-6 text-xl text-gray-800 font-medium">
                            <button
                                className={`tab-button ${activeTab === "description" ? "active border-b-2 border-emerald-500" : ""}`}
                                onClick={() => setActiveTab("description")}
                            >
                                توضیحات
                            </button>
                            <button
                                className={`tab-button ${activeTab === "features" ? "active border-b-2 border-emerald-500" : ""}`}
                                onClick={() => setActiveTab("features")}
                            >
                                ویژگی‌ها
                            </button>
                            <button
                                className={`tab-button ${activeTab === "reviews" ? "active border-b-2 border-emerald-500" : ""}`}
                                onClick={() => setActiveTab("reviews")}
                            >
                                دیدگاه‌ها
                            </button>
                        </div>

                        <div className="tab-content mt-4">
                            {activeTab === "description" && (
                                <div className="description-content">
                                    <p className="text-gray-600 text-justify text-md">
                                        {product.feature_details.description}
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                    </p>
                                </div>
                            )}
                            {activeTab === "features" && (
                                <div className="features-content">
                                    <span>{product.feature_details.product_type}</span>

                                    <p className="text-gray-600 text-justify text-md">
                                        انواع مختلفی از معابر لورم آپسیوم وجود دارد، اما اکثریت به نوعی دچار تغییر شده اند، با شوخی تزریقی، یا کلمات تصادفی که حتی کمی باورپذیر به نظر نرسید اگر می خواهید از یک پاساژ لورم استفاده کنید ایپسوم، باید مطمئن باشید که هیچ چیز شرم آور در این وسط پنهان نشده است متن تمام ژنراتورهای لورم اپسیوم در اینترنت تمایل به تکرار از پیش تعریف شده دارند قطعات در صورت لزوم، این را به اولین مولد واقعی در اینترنت تبدیل می کند.

                                        انواع مختلفی از معابر لورم آپسیوم وجود دارد، اما اکثریت به نوعی دچار تغییر شده اند، با شوخی تزریقی، یا کلمات تصادفی که حتی کمی باورپذیر به نظر نرسید اگر می خواهید از یک پاساژ لورم استفاده کنید ایپسوم، باید مطمئن باشید که هیچ چیز شرم آور در این وسط پنهان نشده است متن تمام ژنراتورهای لورم اپسیوم در اینترنت تمایل به تکرار از پیش تعریف شده دارند قطعات در صورت لزوم، این را به اولین مولد واقعی در اینترنت تبدیل می کند.
                                    </p>
                                    <p className="text-gray-600 text-justify text-md mt-5">
                                        انواع مختلفی از معابر لورم آپسیوم وجود دارد، اما اکثریت به نوعی دچار تغییر شده اند، با شوخی تزریقی، یا کلمات تصادفی که حتی کمی باورپذیر به نظر نرسید اگر می خواهید از یک پاساژ لورم استفاده کنید ایپسوم، باید مطمئن باشید که هیچ چیز شرم آور در این وسط پنهان نشده است متن تمام ژنراتورهای لورم اپسیوم در اینترنت تمایل به تکرار از پیش تعریف شده دارند قطعات در صورت لزوم، این را به اولین مولد واقعی در اینترنت تبدیل می کند.

                                        انواع مختلفی از معابر لورم آپسیوم وجود دارد، اما اکثریت به نوعی دچار تغییر شده اند، با شوخی تزریقی، یا کلمات تصادفی که حتی کمی باورپذیر به نظر نرسید اگر می خواهید از یک پاساژ لورم استفاده کنید ایپسوم، باید مطمئن باشید که هیچ چیز شرم آور در این وسط پنهان نشده است متن تمام ژنراتورهای لورم اپسیوم در اینترنت تمایل به تکرار از پیش تعریف شده دارند قطعات در صورت لزوم، این را به اولین مولد واقعی در اینترنت تبدیل می کند.
                                    </p>
                                </div>
                            )}
                            {activeTab === "reviews" && (
                                <>
                                    <CustomerCommentDetails />
                                    <FormComment />
                                </>

                            )}
                        </div>
                    </div>

                </div>

                <BtnScrollTop />

            </div>
        </>
    );
};

export default ProductsDetails;