import React from "react";
import BreadCrumb from "../../../../components/dashboardLayout/breadCrumb/BreadCrumb";

const Selling: React.FC = () => {
    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "محصولات پر فروش" },
                ]}
            />
        </>
    )
}
export default Selling;