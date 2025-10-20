import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BtnLogin from "../../components/common/buttons/BtnLogin";
import AppContext from "../../context/AppContext ";
import type { User } from "../../model/User";
import { ToastUtils } from "../../components/common/toast/ToastUtils";

const Login: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ phone?: string; password?: string; general?: string }>({});
    const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

    const { setCurrentUser, setUser, user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!validatePhone(phoneNumber)) {
            setErrors({ phone: "شماره موبایل باید 11 رقمی و با 09 شروع شود." });
            return;
        }

        if (!password.trim()) {
            setErrors({ password: "لطفاً رمز عبور را وارد کنید." });
            return;
        }

        // جستجو در کاربران ادمین
        const adminUsers = JSON.parse(localStorage.getItem("adminUsers") || "[]") as User[];
        const adminUser = adminUsers.find(user =>
            user.phoneNumber === phoneNumber && user.password === password
        );

        if (adminUser) {
            // ورود ادمین
            setUser(adminUser);
            setCurrentUser(adminUser);
            localStorage.setItem("currentUser", JSON.stringify(adminUser));
            ToastUtils.success(`کاربر ${user?.username} به فروشگاه دیجی لیزخوش آمدید`);
            redirectUserByRole(adminUser);
            return;
        }

        // جستجو در کاربران عادی
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];
        const normalUser = existingUsers.find(user =>
            user.phoneNumber === phoneNumber && user.password === password
        );

        if (normalUser) {
            // ورود کاربر عادی
            setUser(normalUser);
            setCurrentUser(normalUser);
            localStorage.setItem("currentUser", JSON.stringify(normalUser));
            // localStorage.removeItem("userProfile");
            ToastUtils.success(`کاربر ${user} به فروشگاه دیجی لیزخوش آمدید`);
            redirectUserByRole(normalUser);
            return;
        }

        ToastUtils.error("اطلاعات وارد شده صحیح نمی‌باشد");
    };

    const redirectUserByRole = (userData: User | undefined) => {
        if (!userData || !userData.roleIds || userData.roleIds.length === 0) {
            navigate("/");
            return;
        }

        const roleId = userData.roleIds[0];

        if (roleId === 0) {
            navigate("/admin/dashboard");
        } else if (roleId === 1) {
            navigate("/user/profile/edite");
        } else {
            navigate("/");
        }
    };


    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            redirectUserByRole(userData);
        }
    }, []);

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^09\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };
    const handlePhoneSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!validatePhone(phoneNumber)) {
                setErrors({ phone: "شماره موبایل باید 11 رقمی و با 09 شروع شود." });
                setShowCodeInput(false);
            } else {
                setErrors({});
                setShowCodeInput(true);
            }
        }
    };
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100 to-emerald-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-xl md:w-1/3 w-full mx-4">
                <div className="title flex items-center justify-center">
                    <h2 className="text-gray-700 text-xl font-medium">
                        به فروشگاه{" "}
                        <span className="text-emerald-500">دیجی لیز</span>
                        {" "}خوش آمدید
                    </h2>
                </div>
                <hr className="border-gray-200 mt-5 mb-8" />

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="login-content grid grid-cols-1 space-y-6">
                        <div className="input-group">
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    if (val.length <= 11) setPhoneNumber(val);
                                }}
                                onKeyDown={handlePhoneSubmit}
                                placeholder="*شماره موبایل"
                                className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                required
                            />
                            {errors.phone && (
                                <p className="mt-1 text-[#DD0303] text-sm">{errors.phone}</p>
                            )}
                        </div>

                        {showCodeInput && (
                            <div className="input-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*رمز عبور را وارد نمایید"
                                    className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.password ? "border-gray-700" : "border-gray-700"
                                        } focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-[#DD0303] text-sm">{errors.password}</p>
                                )}
                            </div>
                        )}

                        <div className="btn">
                            <BtnLogin name="ورود" onClick={handleLogin} />
                        </div>

                        <div className="signup flex items-center justify-start">
                            <p className="text-gray-700 text-md font-medium">
                                حساب ندارید؟
                                <Link to="/signup" className="text-emerald-500 mx-2 hover:text-emerald-600">
                                    ثبت نام کنید
                                </Link>
                            </p>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;