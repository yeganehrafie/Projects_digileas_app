import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import BtnSubmit from "../../../components/common/buttons/BtnSubmit";
import BtnCancel from "../../../components/common/buttons/BtnCancel";
import type { User } from "../../../model/User";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
const AddAddress: React.FC = () => {
    const [user, setUser] = useState<Partial<User>>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: ""
    });
    const navigate = useNavigate();
    const handelValidation = (userItems: Partial<User>) => {
        if (!userItems.firstName || userItems.firstName.trim() === '') {
            ToastUtils.error("لطفا نام را وارد نمایید");
            return false;
        }
        if (!userItems.lastName || userItems.lastName.trim() === '') {
            ToastUtils.error("لطفا نام خانوادگی را وارد نمایید");
            return false;
        }
        if (!userItems.phoneNumber || userItems.phoneNumber.trim() === '') {
            ToastUtils.error("لطفا شماره تماس را وارد نمایید");
            return false;
        }
        if (!userItems.email || userItems.email.trim() === '') {
            ToastUtils.error("لطفا ایمیل را وارد نمایید");
            return false;
        }
        if (!userItems.address || userItems.address.trim() === '') {
            ToastUtils.error("لطفا آدرس خود را وارد نمایید");
            return false;
        }
        return true;
    }
    const handelAdd = () => {
        if (!handelValidation(user)) {
            return;
        }
        const newAddress = {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,
        }
        //get new address
        const existingAddresses = JSON.parse(localStorage.getItem("address") || "[]");

        // Add new address
        const updatedAddresses = [...existingAddresses, newAddress];
        // Save to localStorage
        localStorage.setItem("address", JSON.stringify(updatedAddresses));

        ToastUtils.success("ثبت آدرس جدید با موفقیت انجام شد");
        navigate("/user/address");

    }
    return (
        <>
            {/* BreadCrumb */}
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "/user/address", label: "آدرس های من" },
                    { link: "", label: "افزودن آدرس" },
                ]}
            />
            <div className="form mt-10 bg-white p-6 rounded-md shadow-sm mb-10">
                <form className="form-content space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                            <input
                                type="text"
                                name="firstName"
                                value={user?.firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (user) setUser({ ...user, firstName: e.target.value });

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
                                    if (user) setUser({ ...user, lastName: e.target.value });
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
                                    if (user) setUser({ ...user, phoneNumber: e.target.value });
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
                                    if (user) setUser({ ...user, email: e.target.value });
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
                                if (user) setUser({ ...user, address: e.target.value });
                            }}
                            placeholder="آدرس*"
                            rows={5}
                            className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200 resize-none"
                            required
                        />
                    </div>

                    <div className="button flex justify-end gap-3">
                        <BtnSubmit name="ثبت آدرس جدید" onClick={handelAdd} />
                        <BtnCancel name="انصراف" onClick={() => navigate('/user/address')} />
                    </div>
                </form>
            </div>

        </>
    )
}
export default AddAddress;