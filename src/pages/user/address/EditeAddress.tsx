import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import BtnSubmit from "../../../components/common/buttons/BtnSubmit";
import BtnCancel from "../../../components/common/buttons/BtnCancel";
import type { User } from "../../../model/User";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";

const EditeAddress: React.FC = () => {
    const [user, setUser] = useState<Partial<User>>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // دریافت اطلاعات
    useEffect(() => {
        console.log("Received ID for editing:", id);
        if (id) {
            const existingAddresses = JSON.parse(localStorage.getItem("address") || "[]");
            console.log("آدرس‌های موجود:", existingAddresses);
            const addressToEdit = existingAddresses.find((addr: User) => addr.id === String(id));

            if (addressToEdit) {
                setUser(addressToEdit);
            } else {
                ToastUtils.error("آدرس مورد نظر یافت نشد");
                navigate("/user/address");
            }
        } else {
            ToastUtils.error("ID not provided");
            navigate("/user/address");
        }
    }, [id, navigate]);


    const handelEdit = () => {

        // دریافت همه آدرس‌ها از localStorage
        const existingAddresses = JSON.parse(localStorage.getItem("address") || "[]");

        // پیدا کردن ایندکس آدرس برای ویرایش
        const addressIndex = existingAddresses.findIndex((address: User) => address.id === String(id));

        const updatedAddresses = [...existingAddresses];
        updatedAddresses[addressIndex] = {
            ...updatedAddresses[addressIndex],
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            address: user?.address,
        };

        localStorage.setItem("address", JSON.stringify(updatedAddresses));
        console.log("آدرس‌های به‌روز شده:", updatedAddresses);

        ToastUtils.success("ویرایش آدرس  با موفقیت انجام شد");
        navigate("/user/address");


    }
    return (
        <>
            {/* BreadCrumb */}
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "/user/address", label: "آدرس های من" },
                    { link: "", label: "ویرایش آدرس" },

                ]}
            />
            <div className="form mt-10 bg-white p-6 rounded-md shadow-sm mb-10">
                <form className="form-content space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                            <input
                                type="text"
                                name="firstName"
                                value={user?.firstName || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUser({ ...user, firstName: e.target.value });
                                }}
                                placeholder="نام *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="lastName"
                                value={user?.lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUser({ ...user, lastName: e.target.value });
                                }}
                                placeholder="نام خانوادگی *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="phoneNumber"
                                value={user?.phoneNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUser({ ...user, phoneNumber: e.target.value });
                                }}
                                placeholder=" شماره تماس  *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                value={user?.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUser({ ...user, email: e.target.value });
                                }}
                                placeholder="ایمیل  *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <textarea
                            name="address"
                            value={user?.address}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setUser({ ...user, address: e.target.value });
                            }}
                            placeholder="آدرس*"
                            rows={5}
                            className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200 resize-none"
                            required
                        />
                    </div>

                    <div className="button flex justify-end gap-3">
                        <BtnSubmit name="ثبت تغییرات" onClick={handelEdit} />
                        <BtnCancel name="انصراف" onClick={() => navigate('/user/address')} />
                    </div>
                </form>
            </div>
        </>
    );
}
export default EditeAddress;