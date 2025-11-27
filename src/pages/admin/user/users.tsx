import React from "react";
import BreadCrumb from "../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import { exportToExcel } from "../../../components/common/xlsx/GeneratorExcell";
import BtnAdd from "../../../components/common/buttons/BtnAdd";
import ImgUser1 from "../../../images/10.jpg";
import ImgUser2 from "../../../images/11.jpg";
import ImgUser3 from "../../../images/9.jpg";


interface persons {
    id?: number,
    FullName?: string,
    email?: string,
    phonNumber?: string,
    image?: string
}
const Users: React.FC = () => {

    const UsersData: persons[] = [
        { id: 1, FullName: "حنانه رفیعی", email: "hananeh@example.com", phonNumber: "09123456789", image: ImgUser1 },
        { id: 2, FullName: "رویا میرعلمی", email: "roya@example.com", phonNumber: "09351234567", image: ImgUser2 },
        { id: 3, FullName: "پارسا پیروزفر", email: "parsa@example.com", phonNumber: "09109876543", image: ImgUser3 },
    ];
    const handleExport = () => {
        exportToExcel(UsersData, "لیست-کاربران");
    };

    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "", label: "لیست کاربران" },
                ]}
            />
            <div className="card-Orders w-full max-h-full mt-20 px-4">
                <div className="excel mb-10">
                    <BtnAdd name="خروجی فایل اکسل" onclick={handleExport} />
                </div>
                <div className="Orders-content flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-full">
                    <div className="Orders w-full rounded-md shadow-lg bg-gray-50 p-4 flex flex-col items-start text-start justify-start">
                        <div className="Orders w-full mb-4">
                            <div className="content w-full mt-5">
                                {/* حالت دسکتاپ: جدول */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-sm text-right text-gray-700">
                                        <thead className="text-xs text-gray-700 uppercase border border-b-emerald-500 border-r-0 border-l-0 border-t-0">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 font-semibold">عکس</th>
                                                <th scope="col" className="px-4 py-3 font-semibold">نام کامل</th>
                                                <th scope="col" className="px-4 py-3 font-semibold">ایمیل</th>
                                                <th scope="col" className="px-4 py-3 font-semibold">شماره تلفن</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {UsersData.length > 0 ? (
                                                UsersData.map((user) => (
                                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                                        <td className="px-4 py-3">
                                                            {user.image ? (
                                                                <img
                                                                    src={user.image}
                                                                    alt={user.FullName}
                                                                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                    <span className="text-xs text-gray-500">؟</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 font-medium">{user.FullName}</td>
                                                        <td className="px-4 py-3">{user.email}</td>
                                                        <td className="px-4 py-3">{user.phonNumber}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                        هیچ کاربری یافت نشد.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* حالت موبایل: کارت‌ها */}
                                <div className="md:hidden w-full space-y-4">
                                    {UsersData.length > 0 ? (
                                        UsersData.map((user) => (
                                            <div key={user.id} className="bg-white rounded-lg shadow p-4 border">
                                                <div className="flex items-start gap-3 mb-3">
                                                    {user.image ? (
                                                        <img
                                                            src={user.image}
                                                            alt={user.FullName}
                                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                            <span className="text-sm text-gray-500">؟</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-gray-800">{user.FullName}</p>
                                                        <p className="text-sm text-gray-600">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-right">
                                                    <div>
                                                        <span className="text-xs text-gray-500">ایمیل:</span>
                                                        <p className="text-sm">{user.email}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs text-gray-500">شماره تلفن:</span>
                                                        <p className="text-sm">{user.phonNumber}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            هیچ کاربری یافت نشد.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Users;