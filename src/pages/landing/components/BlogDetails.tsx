import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import BreadCrumb from "../../../components/common/breadCrumb/BreadCrumb";
import type { Blog } from "../../../model/Blog";
import { ToastUtils } from "../../../components/common/utils/ToastUtils";
import Loading from "../../../components/common/loading/Loading";
import CustomerCommentDetails from "./CustomerCommentDetails";
import FormComment from "./FormComment";
import { FaUserPen } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { TbCategory2 } from "react-icons/tb";

const BlogDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [bloge, setBloge] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBloge = async () => {
            try {
                setLoading(true);
                console.log("Fetching blog with slug:", slug);

                const response = await axios.get(
                    `https://api.digileas.com/general/articles/${encodeURIComponent(slug || "")}`
                );

                if (response.data?.ok && response.data.data) {
                    setBloge(response.data.data);
                } else {
                    throw new Error("وبلاگ یافت نشد.");
                }
            } catch (err) {
                console.error("Failed to fetch articles:", err);
                ToastUtils.error("خطا در دریافت اطلاعات وبلاگ");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBloge();
        } else {
            ToastUtils.error("شناسه مقاله مشخص نشده است");
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="bg-white ">
            <Header />
            <BreadCrumb
                title="جزییات خواندنی ها"
                items={[
                    { label: "صفحه اصلی", type: "home" },
                    { label: bloge?.title || "خواندنی ها" }
                ]}
                homePath="/"
            />

            {bloge && (
                <div className="bloge mt-20 max-w-7xl mx-auto p-4">
                    {/* تصویر مقاله */}
                    <div className="image mb-6">
                        <img
                            src={bloge.image?.url}
                            alt={bloge.title}
                            className="w-full h-96 object-cover rounded-lg shadow-md "
                        />
                    </div>
                    {/* اطلاعات متا */}
                    <div className="meta text-gray-600 text-md  mb-6 flex gap-8">
                        <div className="author flex items-center ">
                            <FaUserPen className="text-emerald-500 font-bold mx-1" />
                            <span>نویسنده: {bloge.author}</span>
                        </div>
                        <div className="view flex items-center ">
                            <GrView className="text-emerald-500 font-bold mx-1" />
                            <span>تعداد بازدید: {bloge.view}</span>
                        </div>
                        <div className="category flex items-center ">
                            <TbCategory2 className="text-emerald-500 font-bold mx-1" />
                            <span>دسته‌بندی: {bloge.category?.title}</span>
                        </div>
                    </div>
                    {/* عنوان مقاله */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {bloge.title}
                    </h1>

                    {/* محتوای مقاله */}
                    <div
                        className="content prose max-w-none text-md text-gray-800 text-justify leading-8 mb-10"
                        dangerouslySetInnerHTML={{ __html: bloge.content }}
                    />
                    {/* نظرات */}
                    <CustomerCommentDetails />
                    {/* فرم */}
                    <FormComment />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default BlogDetails;