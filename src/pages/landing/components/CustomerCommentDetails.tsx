import React from "react";
import Raiting from "../../../components/common/rating/Raiting";
import ImgUser1 from '../../../images/6.jpg';
import ImgUser2 from '../../../images/12.jpg';
import { MdOutlineUpdate } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";

const commentsData = [
    {
        id: 1,
        name: "یگانه رفیع",
        rating: 5,
        date: "20/4/1404",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای قرار گیرد.",
        imageUrl: ImgUser1,
        response: "پاسخ"
    },
    {
        id: 2,
        name: "سارا احمدی",
        rating: 4,
        date: "21/4/1404",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای قرار گیرد.",
        imageUrl: ImgUser2,
        response: "پاسخ"

    },
];

const CustomerCommentDetails: React.FC = () => {
    return (
        <div className="Customer">
            <div className="title">
                <h2 className="text-md font-bold text-gray-800 tracking-widest px-4">نظرات ({commentsData.length})</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-full mx-auto px-4 space-y-4 mt-5">
                {commentsData.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-row items-start gap-4 p-4 bg-white rounded-lg shadow-md  duration-300 "
                        >
                            <div className="flex flex-col items-end md:w-1/2 ">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-48 rounded-full object-cover border-2 border-gray-300 "
                                />
                            </div>
                            <div className="flex flex-col justify-center flex-grow ">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-gray-800 mt-1 ">
                                        {item.name}
                                    </span>

                                    <div className="rating">
                                        <Raiting rating={item.rating} />
                                    </div>
                                </div>
                                <div className="date flex items-center mt-4 text-emerald-500">
                                    <MdOutlineUpdate />
                                    {item.date}
                                </div>
                                <div className="text-gray-700  leading-relaxed text-justify mt-2">
                                    {item.description}
                                </div>
                                <div className="text-emerald-500 flex items-center justify-start leading-relaxed text-justify mt-2">

                                    <div className="date flex items-center">
                                        <TiArrowBackOutline />
                                        {item.response}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomerCommentDetails;
