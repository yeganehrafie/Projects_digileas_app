import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext ";
import type { User } from "../../../model/User";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import BtnSubmit from "../../../components/common/buttons/BtnSubmit";
import BtnCancel from "../../../components/common/buttons/BtnCancel";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
const UpdatePassword = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(AppContext);
    const [currentPassword, setCurrentPassword] = useState("");//رمز عبور فعلی
    const [newPassword, setNewPassword] = useState("");//رمز عبور جدید
    const [confirmPassword, setConfirmPassword] = useState("");//تکرار رمز عبور جدید

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) {
            ToastUtils.error("کاربر یافت نشد");
            return;
        }

        if (currentPassword !== currentUser.password) {
            ToastUtils.error("رمز عبور فعلی اشتباه است");
            return;
        }

        if (newPassword.length < 6) {
            ToastUtils.error("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
            return;
        }

        if (newPassword !== confirmPassword) {
            ToastUtils.error("رمز عبور جدید و تکرار آن یکسان نیستند");
            return;
        }

        // به‌روزرسانی currentUser در context و localStorage
        const updatedUser = { ...currentUser, password: newPassword };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // به‌روزرسانی در لیست کاربران
        const usersData = localStorage.getItem("users");
        if (usersData) {
            const users: User[] = JSON.parse(usersData);
            const updatedUsers = users.map(u =>
                u.phoneNumber === currentUser.phoneNumber ? updatedUser : u
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }

        ToastUtils.success("رمز عبور با موفقیت تغییر کرد");
        navigate("/user/dashboard");
    };
    return (
        <>
            {/* BreadCrumb */}
            < BreadCrumb
                items={
                    [
                        { link: "/user/dashboard", label: "داشبرد" },
                        { link: "", label: "تغییر رمز عبور" },
                    ]}
            ></BreadCrumb >
            <form onSubmit={handleSubmit}>
                <div className="box rounded-md shadow-md p-6 bg-white mt-10">
                    <div className="changePassword flex flex-col mt-3">
                        <div className="changePassword-Content  grid grid-cols-1 md:grid-cols-3 gap-4 ">
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="رمز عبور فعلی "
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="رمز عبور جدید "
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="تکرار رمزعبور جدید"
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="btns flex flex-row gap-4 mt-3">
                                <BtnSubmit name="تغییر رمز عبور" />
                                <BtnCancel
                                    onClick={() => navigate("/user/dashboard")}
                                    name="انصراف" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </>
    )
}
export default UpdatePassword;