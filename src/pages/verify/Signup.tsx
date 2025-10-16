import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BtnLogin from "../../components/common/buttons/BtnLogin";
import AppContext from "../../context/AppContext ";
import type { User } from "../../model/User";
import { ToastUtils } from "../../components/common/toast/ToastUtils";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        nationalCode: "",
        postalCode: "",
        cityId: undefined as number | undefined,
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<{
        phone?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        nationalCode?: string;
        general?: string;
    }>({});

    const { setCurrentUser, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const adminUsers: User[] = [
        {
            id: "1",
            firstName: "مدیر",
            lastName: "سیستم",
            phoneNumber: "09128888888",
            username: "admin",
            password: "1234567",
            nationalCode: "1743335458",
            email: "yeganerafiei932@gmail.com",
            roleIds: [0]
        }
    ];

    useEffect(() => {
        const existingAdmins = localStorage.getItem("adminUsers");
        if (!existingAdmins) {
            localStorage.setItem("adminUsers", JSON.stringify(adminUsers));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        if (!validatePhone(formData.phoneNumber)) {
            newErrors.phone = "شماره موبایل باید 11 رقمی و با 09 شروع شود.";
        }

        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = "فرمت ایمیل نامعتبر است.";
        }

        if (formData.nationalCode && !validateNationalCode(formData.nationalCode)) {
            newErrors.nationalCode = "کد ملی باید 10 رقمی باشد.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "رمز عبور باید حداقل 6 کاراکتر باشد.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند.";
        }

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phoneNumber.trim()) {
            ToastUtils.error("پر کردن فیلد های ستاره دار الزامی است");
            return false;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = () => {
        if (!validateForm()) {
            return;
        }

        // بررسی وجود کاربر با همین شماره موبایل
        // const existingUsers = localStorage.getItem("users");
        // const users = existingUsers ? JSON.parse(existingUsers) : [];

        // const isDuplicate = users.some((user: User) =>
        //     user.phoneNumber === formData.phoneNumber
        // );

        // if (isDuplicate) {
        //     ToastUtils.error("کاربری با این شماره موبایل قبلاً ثبت نام کرده است");
        //     return;
        // }

        const newUser: User = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            nationalCode: formData.nationalCode || undefined,
            postalCode: formData.postalCode || undefined,
            cityId: formData.cityId,
            address: formData.address || undefined,
            email: formData.email || undefined,
            username: formData.username || undefined,
            password: formData.password, // در حالت واقعی باید هش شود
            roleIds: [1], // رول پیش‌فرض: کاربر عادی
            id: generateUserId(),
        };

        // ذخیره کاربر در context
        setUser(newUser);
        setCurrentUser(newUser);

        // ذخیره در localStorage
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        // ذخیره در لیست کاربران
        saveUserToUsersList(newUser);

        ToastUtils.success("ثبت نام با موفقیت انجام شد");

        // هدایت به پنل کاربر
        redirectUserByRole(newUser);
    };

    const generateUserId = (): string => {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    };

    const saveUserToUsersList = (user: User) => {
        const existingUsers = localStorage.getItem("users");
        const users = existingUsers ? JSON.parse(existingUsers) : [];

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
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
            try {
                const userData: User = JSON.parse(savedUser);
                redirectUserByRole(userData);
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("currentUser");
            }
        }
    }, []);

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^09\d{9}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateNationalCode = (code: string): boolean => {
        const nationalCodeRegex = /^\d{10}$/;
        return nationalCodeRegex.test(code);
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100 to-emerald-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-xl md:w-1/3 w-full mx-4">
                <div className="title flex items-center justify-center">
                    <h2 className="text-gray-700 text-xl font-medium">
                        ثبت نام در{" "}
                        <span className="text-emerald-500">دیجی لیز</span>
                    </h2>
                </div>
                <hr className="border-gray-200 mt-5 mb-8" />

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                    <div className="login-content grid grid-cols-1 space-y-4">
                        {/* نام و نام خانوادگی */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="*نام"
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="*نام خانوادگی"
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* نام کاربری و ایمیل */}
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="نام کاربری"
                                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="ایمیل"
                                    className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-[#DD0303] text-sm">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* کد ملی و موبایل */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="nationalCode"
                                    value={formData.nationalCode}
                                    onChange={handleInputChange}
                                    placeholder="کد ملی"
                                    className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.nationalCode ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                />
                                {errors.nationalCode && (
                                    <p className="mt-1 text-[#DD0303] text-sm">{errors.nationalCode}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="*شماره موبایل"
                                    className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                    required
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-[#DD0303] text-sm">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* رمز عبور */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="*رمز عبور"
                                    className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.password ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-[#DD0303] text-sm">{errors.password}</p>
                                )}
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="*تکرار رمز عبور"
                                    className={`w-full outline-none px-4 py-3 rounded-sm border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200`}
                                    required
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-[#DD0303] text-sm">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        {/* آدرس */}
                        <div className="input-group">
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleTextareaChange}
                                placeholder="آدرس"
                                rows={3}
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                            ></textarea>
                        </div>

                        {/* دکمه ثبت نام */}
                        <div className="btn pt-4">
                            <BtnLogin name="ثبت نام" onClick={handleSignup} />
                        </div>

                        <div className="login flex items-center justify-start pt-4">
                            <p className="text-gray-700 text-md font-medium">
                                قبلاً ثبت نام کرده‌اید؟
                                <Link to="/login" className="text-emerald-500 mx-2 hover:text-emerald-600">
                                    وارد شوید
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;