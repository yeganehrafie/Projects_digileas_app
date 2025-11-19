import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";

const Edite: React.FC = () => {
    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "ویرایش پروفایل" },
                ]}
            />
        </>
    )
}
export default Edite;