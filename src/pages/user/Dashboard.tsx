import React from "react";
import BreadCrumb from "../../components/dashboardLayout/breadCrumb/BreadCrumb";
import {
    MdOutlineFavoriteBorder,
    MdOutlineLibraryBooks,
    MdOutlineLocationOn
} from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    const dashbord_Box = [
        {
            id: 1,
            title: "لیست سفارشات",
            icons: <MdOutlineLibraryBooks />,
            link: "/user/order",
            getStyle: () => ({
                background: 'linear-gradient(to right, #28DF99 0%, #b3ebcfff 51%, #8befc9ff 100%)',
                backgroundSize: '200% auto',
                backgroundPosition: 'left center',
                transition: 'background-position 0.5s ease',
            }),
        },
        {
            id: 2,
            title: "لیست آدرس ها",
            icons: <MdOutlineLocationOn />,
            link: "",
            getStyle: () => ({
                background: 'linear-gradient(to right, #4E71FF 0%, #AFDDFF 51%, #60B5FF 100%)',
                backgroundSize: '200% auto',
                backgroundPosition: 'left center',
                transition: 'background-position 0.5s ease',
            }),
        },
        {
            id: 3,
            title: "لیست علاقه مندی ها",
            link: "/user/favorites",
            icons: <MdOutlineFavoriteBorder />,
            getStyle: () => ({
                background: 'linear-gradient(to right, #E50046 0%, #FFD8D8 51%, #F75270 100%)',
                backgroundSize: '200% auto',
                backgroundPosition: 'left center',
                transition: 'background-position 0.5s ease',
            }),
        },
        {
            id: 4,
            title: "لیست دیدگاه ها",
            link: "/user/comments",
            icons: <FaRegComments />,
            getStyle: () => ({
                background: 'linear-gradient(to right, #FF6500 0%, #ffeeb8ff 51%, #fbb462ff 100%)',
                backgroundSize: '200% auto',
                backgroundPosition: 'left center',
                transition: 'background-position 0.5s ease',
            }),
        },
    ];

    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "", label: "داشبرد کاربر" },
                ]}
            />
            <div className="Dashboard">
                <div className="dashbord-box grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {dashbord_Box.map((item) => (
                        <div
                            key={item.id}
                            style={item.getStyle()}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
                            className="p-6 text-center rounded-sm shadow-md cursor-pointer"
                        > <Link to={item.link}>
                                <div className="box-content flex flex-row items-center justify-between">
                                    <div className="icon text-gray-700 font-semibold text-xl p-5 rounded-full bg-white/30 backdrop-blur-sm">
                                        {item.icons}
                                    </div>
                                    <div className="title">
                                        <h3 className="text-md font-semibold text-gray-50">{item.title}</h3>
                                    </div>
                                </div>
                            </Link >

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;