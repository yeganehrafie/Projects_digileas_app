import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import StatCards from "./StatCards";
import Overview from "./Overview";
const Dashboard: React.FC = () => {


    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "داشبرد ادمین" },
                ]}
            />

            <div className="dashboard  max-w-full flex flex-col justify-center items-center">
                {/* StatCards section1 */}
                <StatCards />
                {/* Overview section2 */}
                <Overview />
            </div>
        </>
    );
}

export default Dashboard;