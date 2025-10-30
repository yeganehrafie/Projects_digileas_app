import React from "react";
import BreadCrumb from "../../components/dashboardLayout/breadCrumb/BreadCrumb";

const Dashboard: React.FC = () => {

    return (
        <>
            {/* BreadCrumb */}
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "", label: "داشبرد کاربر" },
                ]}
            ></BreadCrumb>
            <div className="Dashboard">
                <div className="dashbord-box grid grid-cols-2 md:grid-cols-4">

                </div>
            </div>
        </>
    )
}


export default Dashboard;