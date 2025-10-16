import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
const Edite: React.FC = () => {
    return (
        <>
            <div >
                {/* BreadCrumb */}
                <BreadCrumb
                    items={[
                        { link: "/user/dashboard", label: "داشبرد" },
                        { link: "", label: " ویرایش پروفایل" },
                    ]}
                ></BreadCrumb>
            </div>
        </>
    );
}

export default Edite;