import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import BtnDelete from "../../../components/common/buttons/BtnDelete";
import BtnAdd from "../../../components/common/buttons/BtnAdd";
import BtnEdit from "../../../components/common/buttons/BtnEdit";
import Loading from "../../../components/common/loading/Loading";
import type { User, UserProductsBoxProps } from "../../../model/User";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import { truncateText } from "../../utils";
import Modal from "../../../components/common/modal/modalDetailes";

const Address: React.FC<UserProductsBoxProps> = ({
    user = [],
    onCloseModal,
    onRemoveFromFavorites
}) => {
    const [localUser, setLocalUser] = useState<User[]>(user);
    const [isLoading, setLocalIsLoading] = useState(true);
    const [selectedUserForModal, setSelectedUserForModal] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (user.length > 0) {
            setLocalUser(user);
        } else {
            const loadFromLocalStorage = () => {
                setLocalIsLoading(true);
                try {
                    const saved = localStorage.getItem("address");
                    if (saved) {
                        const parsed = JSON.parse(saved) as User[];
                        setLocalUser(parsed);
                    }
                } catch (e) {
                    console.error("Failed to load address data", e);
                } finally {
                    setLocalIsLoading(false);
                }
            };
            loadFromLocalStorage();
        }
    }, [user]);

    const handleDelete = (userId: string) => {
        const updated = localUser.filter(userItem => userItem.id !== userId);
        setLocalUser(updated);
        localStorage.setItem("address", JSON.stringify(updated));
        if (onRemoveFromFavorites) {
            onRemoveFromFavorites(userId);
        }
        ToastUtils.success("آدرس با موفقیت حذف شد");
    };

    const handleShowDetails = (userItem: User) => {
        setSelectedUserForModal(userItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserForModal(null);
        if (onCloseModal) {
            onCloseModal();
        }
    };

    return (
        <>
            {/* BreadCrumb */}
            <BreadCrumb
                items={[
                    { link: "/user/dashboard", label: "داشبرد" },
                    { link: "", label: "آدرس های من" },
                ]}
            />

            <div className="btn-address mt-10">
                <BtnAdd name="افزودن آدرس جدید" onclick={() => navigate("/user/address/add")} />
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <Loading />
                </div>
            )}


            {!isLoading && (
                <div className="user mt-10">
                    {(!localUser || localUser.length === 0) ? (
                        <div className="flex flex-col items-center justify-center text-center mt-10">
                            <span className="font-meduim p-3 rounded-md bg-amber-400 text-white text-md w-full border-double border-4 border-white">
                                اطلاعاتی برای نمایش وجود ندارد
                            </span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto border border-gray-200 shadow-md rounded-sm">
                            {/* نسخه دسکتاپ */}
                            <table className="w-full table-auto border-collapse text-md font-medium hidden md:table">
                                <thead className="bg-[#F4F6FF]">
                                    <tr className="text-right text-gray-800 ">
                                        <th className="p-3">نام و نام خانوادگی</th>
                                        <th className="p-3">آدرس</th>
                                        <th className="p-3">شماره تماس</th>
                                        <th className="p-3">ایمیل</th>
                                        <th className="p-3"></th>
                                        <th className="p-3"></th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localUser.map((userItem) => (
                                        <tr key={userItem.id} className="border-b bg-white hover:bg-gray-50 duration-300 text-right text-md text-gray-700">

                                            <td className="p-3 font-medium gap-2">
                                                {userItem.firstName} {userItem.lastName}
                                            </td>
                                            <td className="p-3 text-justify">
                                                {truncateText(userItem.address || "آدرسی ثبت نشده است", 25)}
                                            </td>
                                            <td className="p-3 font-medium">{userItem.phoneNumber || "شماره تماس"}</td>
                                            <td className="p-3 font-medium">{userItem.email || "ایمیلی ثبت نشده"}</td>
                                            <td className="p-3">
                                                <BtnEdit onclick={() => navigate(`/user/address/edit/${userItem.id}`)} />
                                            </td>
                                            <td className="p-3">
                                                <BtnDelete onclick={() => handleDelete(userItem.id!)} />
                                            </td>
                                            <td className="p-3">
                                                <span
                                                    className="text-md font-meduim text-emerald-500 hover:underline duration-300 cursor-pointer"
                                                    onClick={() => handleShowDetails(userItem)}
                                                >
                                                    جزئیات بیشتر
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* نسخه موبایل */}
                            <div className="md:hidden space-y-4 p-4 bg-[#F4F6FF]">
                                {localUser.map((userItem) => (
                                    <div
                                        key={userItem.id}
                                        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="space-y-3 text-right">

                                            <h4 className="font-bold text-gray-800 text-md">
                                                {userItem.firstName} {userItem.lastName}
                                            </h4>

                                            <div className="bg-gray-50 rounded-md p-3">
                                                <p className="text-md text-gray-700 leading-6">
                                                    <strong>آدرس:</strong> {userItem.address || "آدرسی ثبت نشده است."}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-start">
                                                <p className="text-md text-gray-700">
                                                    <strong>شماره تماس:</strong> {userItem.phoneNumber || "ثبت نشده"}
                                                </p>
                                                <p className="text-md text-gray-700">
                                                    <strong>ایمیل:</strong> {userItem.email || "ایمیلی ثبت نشده است."}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                <div className="btn flex gap-2">
                                                    <BtnEdit onclick={() => navigate(`/user/address/edit/${userItem.id}`)} />
                                                    <BtnDelete onclick={() => handleDelete(userItem.id!)} />
                                                </div>
                                                <div>
                                                    <span
                                                        className="text-md font-meduim text-emerald-500 hover:underline duration-300 cursor-pointer"
                                                        onClick={() => handleShowDetails(userItem)}
                                                    >
                                                        جزئیات بیشتر
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={'جزئیات آدرس '}
                size="md"
            >
                {selectedUserForModal && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="  flex items-center rounded-lg gap-1">
                                <span className="font-bold text-gray-700">نام  :</span>
                                <span className="text-gray-600 ">{selectedUserForModal.firstName || "ثبت نشده"}</span>
                            </div>
                            <div className="  flex items-center rounded-lg gap-1">
                                <div className="font-bold text-gray-700">نام خانوادگی :</div>
                                <div className="text-gray-600 ">{selectedUserForModal.lastName || "ثبت نشده"}</div>
                            </div>
                            <div className="  flex items-center rounded-lg gap-1">
                                <div className="font-bold text-gray-700">شماره تماس :</div>
                                <div className="text-gray-600 ">{selectedUserForModal.phoneNumber || "ثبت نشده"}</div>
                            </div>
                            <div className="  flex items-center rounded-lg gap-1">
                                <div className="font-bold text-gray-700">ایمیل :</div>
                                <div className="text-gray-600 ">{selectedUserForModal.email || "ثبت نشده"}</div>
                            </div>
                        </div>
                        <div className="  flex items-center rounded-lg gap-1">
                            <div className="font-bold text-gray-700">آدرس کامل :</div>
                            <div className="text-gray-600  text-justify leading-7">
                                {selectedUserForModal.address || "آدرسی ثبت نشده است"}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default Address;