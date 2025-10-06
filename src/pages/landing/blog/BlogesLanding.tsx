import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Blog } from "../../../model/Blog";
import BlogBox from "../components/BlogBox";

const BlogesLanding: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    // Axios API 
    const baseUrl = "https://api.digileas.com/general/articles";

    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            if (response.data.ok) {
                setBlogs(response.data.data.data);
                setLoading(false);
            }
        });
    }, []);



    return (
        <div className="px-[10%] mt-10">
            <BlogBox
                blogs={blogs}
                loading={loading}
                useSwiper={true}
            />
        </div>
    );
};

export default BlogesLanding;