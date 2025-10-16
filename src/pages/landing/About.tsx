import React from "react";
import BreadCrumb from "../../components/landingLayout/breadCrumb/BreadCrumb";
import ImgAbout from '../../images/aboutImage.Dc_q44NF.webp';

const About: React.FC = () => {
    return (
        <>

            <BreadCrumb
                title="درباره ما"
                items={[
                    { label: "صفحه اصلی", type: "home" },
                    { label: "درباره ما" }
                ]}
                homePath="/"
            />
            <div className="about mt-20 px-[10%] p-4 bg-white">
                <div className=" flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="about-content w-full md:w-2/2 ">
                        {/* متن‌ها */}
                        <div className="contents flex flex-col items-start order-2 md:order-2 text-right">
                            <div className="title mb-6">
                                <h3 className="text-gray-800 tracking-widest font-bold text-2xl">دیجی لیز</h3>
                            </div>
                            <div className="description space-y-4 mb-8">
                                <p className="text-md text-gray-700 flex text-justify leading-7">
                                    دیجی‌لیز، فروشگاهی آنلاین و تخصصی در حوزه‌ی کالاهای دیجیتال مانند موبایل، لپ‌تاپ، کنسول بازی، گجت‌ و لوازم جانبی است که با تمرکز بر کیفیت، قیمت منصفانه و خدمات مشتری‌مدار، مسیر خرید هوشمندانه را هموار کرده است.
                                </p>
                                <p className="text-md text-gray-700 flex text-justify leading-7">
                                    ما در دیجی‌لیز معتقدیم خرید نباید به خاطر محدودیت‌های مالی سخت باشد. بنابراین، همراه با تضمین اصالت کالا و ارائه‌ی گارانتی معتبر، بستر خرید اقساطی را فراهم کرده‌ایم تا هر مشتری بتواند کالای مورد نیازش را بدون فشار مالی و با شرایط آسان تهیه کند.
                                </p>
                            </div>
                            <div className="space-y-4 mb-8">
                                <h4 className="text-xl text-gray-800 font-semibold">تضمین کیفیت و خدمات</h4>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-1 text-xl">•</span>
                                        <span className="text-gray-700 flex text-justify text-md">تمامی محصولات با ضمانت اصالت و گارانتی معتبر ارائه می‌شوند</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-1 text-xl">•</span>
                                        <span className="text-gray-700 flex text-justify text-md">همراه با تخفیف‌های ویژه و شرایط رقابتی</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-1 text-xl">•</span>
                                        <span className="text-gray-700 flex text-justify text-md">پشتیبانی 24/7 و ارسال سریع و ایمن کالا</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-gray-800 tracking-widest font-bold text-2xl">رسالت ما</h3>
                                <p className="text-md text-gray-700 flex text-justify leading-7">
                                    در دیجی‌لیز، هدف ما این است که خرید کالاهای دیجیتال باکیفیت و مدرن برای همه امکان‌پذیر شود. با ترکیبی از تجربه‌ی مطمئن و شرایط پرداخت منعطف، قدم‌های بزرگی برای بهبود تجربه‌ی خرید شما برمی‌داریم.
                                </p>
                                <p className="text-md text-gray-700 flex text-justify leading-7">
                                    منتظر حضور شما در خانواده‌ی دیجی‌لیز هستیم. برای اطلاعات بیشتر یا مشاوره رایگان، با شماره تلفن‌های سایت تماس بگیرید.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* تصویر */}
                    <div className="image w-full w-[400px] md:w-1/2 order-1 md:order-1">
                        <img
                            src={ImgAbout}
                            alt="تصویر درباره ما"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

            </div>

        </>
    );
}

export default About;
