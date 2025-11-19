import React from "react";
import BreadCrumb from "../../../../components/dashboardLayout/breadCrumb/BreadCrumb";

const Discount: React.FC = () => {
    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "محصولات تخفیف دار" },
                ]}
            />
        </>
    )
}
export default Discount;