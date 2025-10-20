import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import Img_user from "./../../../images/image_user.png";
import BtnSubmit from "../../../components/common/buttons/BtnSubmit";
// import BtnDeleteProfile from "../../../components/common/buttons/BtnDeleteProfile";
import AppContext from "../../../context/AppContext ";
import type { User } from "../../../model/User";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import Tooltip from "../../../components/common/tooltipBox/Tooltip";
import { IoIosCamera } from "react-icons/io";

interface UserProfileData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
    address: string;
}
const Edite: React.FC = () => {
    const { currentUser, setCurrentUser } = useContext(AppContext);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        profileImage: "",
        address: "",
    });

    const convertUserToUserProfileData = (user: User): UserProfileData => {
        return {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            username: user.username || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            profileImage: user.image || "",
            address: user.address || ""
        };
    };

    useEffect(() => {
        const savedUserData = localStorage.getItem("userProfile");
        if (savedUserData) {
            const parsedData = JSON.parse(savedUserData);
            setUserData(parsedData);
        } else if (currentUser) {
            setUserData(convertUserToUserProfileData(currentUser));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // مدیریت آپلود عکس
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                const updatedUserData = {
                    ...userData,
                    profileImage: imageUrl
                };

                setUserData(updatedUserData);
                localStorage.setItem("userProfile", JSON.stringify(updatedUserData));
                if (setCurrentUser) {
                    const updatedUser = {
                        ...currentUser,
                        image: imageUrl
                    } as User;
                    setCurrentUser(updatedUser);
                    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                }
                ToastUtils.success("عکس پروفایل با موفقیت به روز شد");

            };
            reader.readAsDataURL(file);
        }
    };


    // ثبت تغییرات
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem("userProfile", JSON.stringify(userData));

        if (setCurrentUser) {
            const updatedUser = {
                ...currentUser,//حذف اطلاعات قبلی کاربر
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                address: userData.address,
                image: userData.profileImage
            } as User;

            setCurrentUser(updatedUser);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));

            updateUserInUsersList(updatedUser);
        }

        ToastUtils.success("تغییرات با موفقیت ثبت شد")
    };

    //   آپدیت کاربر در لیست 
    const updateUserInUsersList = (updatedUser: User) => {
        const existingUsers = localStorage.getItem("users");
        if (existingUsers) {
            const users: User[] = JSON.parse(existingUsers);

            // پیدا کردن کاربر فعلی و آپدیت آن
            const updatedUsers = users.map(user => {
                if (user.phoneNumber === updatedUser.phoneNumber ||
                    (currentUser && user.phoneNumber === currentUser.phoneNumber)) {
                    return {
                        ...user,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName,
                        username: updatedUser.username,
                        email: updatedUser.email,
                        address: updatedUser.address,
                        image: updatedUser.image
                    };
                }
                return user;
            });

            // ذخیره لیست آپدیت شده
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }

    };

    return (
        <>
            {/* BreadCrumb */}
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "", label: " ویرایش پروفایل" },
                ]}
            />

            <form onSubmit={handleSubmit}>
                <div className="profile bg-white border border-gray-50 shadow-md py-3 px-8 pb-8 max-w-full w-[80%] mx-auto rounded-md">
                    <div className="flex flex-col items-start justify-start space-y-8 w-full">
                        {/* Image */}
                        <div className="profile-img flex items-center gap-6">
                            <div className="relative cursor-pointer">
                                <Tooltip text="تصویر پروفایل">
                                    <img
                                        className="w-24 h-24 rounded-full object-cover border-double border-4 border-emerald-500"
                                        src={userData.profileImage || Img_user}
                                        alt="img_user"
                                    />
                                    <div className="absolute -bottom-1 -left-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                                        <IoIosCamera />
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </Tooltip >

                            </div>

                        </div>

                        {/* user data */}
                        <div className="profile-content w-full">
                            <div className="flex flex-col md:flex-row items-center justify-start gap-6 w-full">
                                <div className="input-group w-full md:w-1/2">
                                    <label htmlFor="firstName" className="text-gray-800 font-medium">نام</label>
                                    <input
                                        className="outline-none cursor-pointer max-w-full w-full px-4 py-2 border border-gray-300 focus:border-emerald-400 rounded-sm mt-2"
                                        type="text"
                                        name="firstName"
                                        placeholder="یگانه"
                                        value={userData.firstName || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group w-full md:w-1/2">
                                    <label htmlFor="lastName" className="text-gray-800 font-medium">نام خانوادگی</label>
                                    <input
                                        className="outline-none cursor-pointer max-w-full w-full px-4 py-2 border border-gray-300 focus:border-emerald-400 rounded-sm mt-2"
                                        type="text"
                                        name="lastName"
                                        placeholder="رفیعی"
                                        value={userData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-start gap-6 w-full mt-4">
                                <div className="input-group w-full md:w-1/2">
                                    <label htmlFor="username" className="text-gray-800 font-medium">نام کاربری</label>
                                    <input
                                        className="outline-none cursor-pointer max-w-full w-full px-4 py-2 border border-gray-300 focus:border-emerald-400 rounded-sm mt-2"
                                        type="text"
                                        name="username"
                                        placeholder="yeganeh"
                                        value={userData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group w-full md:w-1/2">
                                    <label htmlFor="email" className="text-gray-800 font-medium">ایمیل</label>
                                    <input
                                        className="outline-none cursor-pointer max-w-full w-full px-4 py-2 border border-gray-300 focus:border-emerald-400 rounded-sm mt-2"
                                        type="email"
                                        name="email"
                                        placeholder="degilise@gmail.com"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-start gap-6 w-full mt-4">
                                <div className="input-group w-full md:w-1/2">
                                    <label htmlFor="phoneNumber" className="text-gray-800 font-medium">موبایل</label>
                                    <input
                                        className="outline-none cursor-pointer max-w-full w-full px-4 py-2 border border-gray-300 focus:border-emerald-400 rounded-sm mt-2"
                                        type="number"
                                        name="phoneNumber"
                                        placeholder="09102608990"
                                        value={userData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group w-full md:w-1/2">
                                    <label htmlFor="address" className="text-gray-800 font-medium">آدرس</label>
                                    <textarea
                                        name="address"
                                        value={userData.address}
                                        onChange={handleTextareaChange}
                                        placeholder="کرج- باغستان"
                                        className="outline-none cursor-pointer max-w-full w-full px-4 py-2 border border-gray-300 focus:border-emerald-400 rounded-sm mt-2"
                                    ></textarea>

                                </div>
                            </div>
                        </div>
                        <BtnSubmit
                            onClick={() => handleSubmit({} as React.FormEvent)}
                            name="ثبت تغییرات"
                        />

                    </div>
                </div>
            </form>
        </>
    );
}

export default Edite;