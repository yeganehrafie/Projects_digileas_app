import React, { useState, useEffect, useRef, useCallback } from "react";
import BlogBox from "../components/BlogBox";
import BtnBack from "../../../components/common/buttons/BtnBack";
import type { Blog } from "../../../model/Blog";
import Loading from "../../../components/common/loading/Loading";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import BreadCrumb from "../../../components/landingLayout/breadCrumb/BreadCrumb";
import axios from "axios";

const Bloges: React.FC = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Axios API 
    const baseUrl = "https://api.digileas.com/general/articles";

    const fetchBlogs = useCallback(async (page: number, append: boolean = false) => {
        if (isFetching || !hasMore) return;

        setIsFetching(true);

        try {
            const response = await axios.get(`${baseUrl}?page=${page}`);

            if (response.data.ok) {
                const newBlogs = response.data.data.data;

                if (append) {
                    setBlogs(prev => [...prev, ...newBlogs]);
                } else {
                    setBlogs(newBlogs);
                }
                setHasMore(newBlogs.length > 0);
                if (newBlogs.length > 0) {
                    setCurrentPage(page + 1);
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            ToastUtils.error("وبلاگی یافت نشد")
            setHasMore(false);
        } finally {
            setIsFetching(false);
        }
    }, [isFetching, hasMore, baseUrl]);

    useEffect(() => {
        fetchBlogs(1, false);
    }, []);

    //infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !isFetching) {
                    fetchBlogs(currentPage, true);
                }
            },
            { threshold: 0.1 }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [hasMore, isFetching, currentPage, fetchBlogs]);






    return (
        <>
            <div className="bg-white ">

                {/* BreadCrumb */}
                <BreadCrumb
                    title="لیست خواندنی ها"
                    items={[
                        { label: "صفحه اصلی", type: "home" },
                        { label: "خواندنی ها" }
                    ]}
                    homePath="/"
                />

                <div className="px-[5%]">
                    {/* back button */}
                    <div className="flex w-full justify-end mt-10">
                        <BtnBack />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 mt-10">

                        <div className="products w-full">
                            <BlogBox
                                blogs={blogs}
                                useSwiper={false}
                            />

                            {/* Loader برای Infinite Scroll */}
                            <div
                                ref={loaderRef}
                                className="flex justify-center items-center py-6"
                            >
                                {isFetching && <Loading />}
                                {!hasMore && blogs.length > 0 && (
                                    <span></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Bloges;