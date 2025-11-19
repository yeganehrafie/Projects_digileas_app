import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";

const UpdatePassword: React.FC = () => {
    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "تغییر رمز عبور" },
                ]}
            />
        </>
    )
}
export default UpdatePassword;