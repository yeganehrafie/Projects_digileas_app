import React from "react";
import BreadCrumb from "../../components/dashboardLayout/breadCrumb/BreadCrumb";

const Dashboard: React.FC = () => {


    return (
        <>
            <div>
                {/* BreadCrumb */}
                <BreadCrumb
                    items={[
                        { link: "/user/dashboard", label: "داشبرد" },
                        { link: "", label: "داشبرد کاربر" },
                    ]}
                ></BreadCrumb>
            </div>
        </>
    )
}


export default Dashboard;