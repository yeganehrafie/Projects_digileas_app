import React from "react";
import BreadCrumb from "../../components/dashboardLayout/breadCrumb/BreadCrumb";
import {
    MdOutlineFavoriteBorder,
    MdOutlineLibraryBooks,
    MdOutlineLocationOn
} from "react-icons/md";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    const dashbord_Box = [
        {
            id: 1,
            title: "لیست سفارشات",
            icons: <MdOutlineLibraryBooks />,
            link: "/user/order",
        },
        {
            id: 2,
            title: "لیست آدرس ها",
            icons: <MdOutlineLocationOn />,
            link: "/user/address",
        },
        {
            id: 3,
            title: "لیست علاقه مندی ها",
            link: "/user/favorites",
            icons: <MdOutlineFavoriteBorder />,
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
                <div className="dashbord-box grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                    {dashbord_Box.map((item) => (
                        <div
                            key={item.id}
                            className="p-6  group"
                        > <Link to={item.link}>
                                <div className="box-content flex flex-row justify-between items-center text-center space-y-2 rounded-md shadow-lg p-4 w-full 
                                 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-emerald-500 duration-500">
                                    <div className="card-icon flex justify-center items-center bg-emerald-400 h-10 text-gray-50 w-10 md:h-12 md:w-12 rounded-full border
                                        border-emerald-400 p-2 md:p-3  duration-500 group-hover:shadow-md  group-hover:shadow-emerald-100/90 cursor-pointer
                                        group-hover:border-gray-50 group-hover:bg-gray-50 group-hover:text-emerald-400 duration-500">
                                        {item.icons}
                                    </div>
                                    <div className="title">
                                        <h3 className="text-md text-emerald-600 mt-1 group-hover:text-gray-50">{item.title}</h3>
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