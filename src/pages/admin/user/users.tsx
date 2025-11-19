import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";

const Users: React.FC = () => {
    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "لیست کاربران" },
                ]}
            />
        </>
    )
}
export default Users;