import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../../model/User";
import Logo from "../../common/logo/Logo";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Header_Dashborde: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [localUser, setLocalUser] = useState<User | null>(null);

    useEffect(() => {
        // دریافت اطلاعات کاربر از localStorage
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            setLocalUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setLocalUser(null);
        setIsDropdownOpen(false);
        window.location.reload();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="max-w-full shadow-md">
                {/* header-1 */}
                <div className="header-top-wrapper bg-white text-gray-800
                    flex items-center justify-between md:px-[5%] py-3 text-md">

                    {/* logo header-right*/}
                    <div className="logo">
                        <Logo />
                    </div>

                    {/* user dropdown header-left*/}
                    <div className="header-left text-gray-800 flex items-center">
                        <div className="relative" ref={dropdownRef}>
                            <div className="flex items-center">
                                <button
                                    onClick={toggleDropdown}
                                    className="profile cursor-pointer mx-2 flex items-center hover:text-[#3be8aeff] duration-500 transition-all"
                                >
                                    {localUser?.image ? (
                                        <img
                                            src={localUser.image}
                                            alt={localUser.username}
                                            className="w-8 h-8 rounded-full object-cover ml-2 border-2 border-emerald-500"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center ml-2">
                                            <span className="text-white text-sm font-bold">
                                                {localUser?.username?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                    )}

                                    <span className="mx-2 flex items-center">
                                        {localUser?.username || 'کاربر'}
                                        <FaChevronDown
                                            className={`ml-1 text-xs transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
                                                }`}
                                        />
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden">
                                        <div className="py-2 text-md text-right">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center justify-end">
                                                    {localUser?.image ? (
                                                        <img
                                                            src={localUser.image}
                                                            alt={localUser.username}
                                                            className="w-10 h-10 rounded-full object-cover ml-3 border-2 border-emerald-500"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center ml-3">
                                                            <span className="text-white text-lg font-bold">
                                                                {localUser?.username?.charAt(0) || 'U'}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-800">{localUser?.username}</p>
                                                        <p className="text-sm text-gray-500">{localUser?.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                to="/user/profile/edite"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-emerald-500 transition-colors duration-200"
                                            >
                                                <FaUserCircle className="text-emerald-500 ml-2" />
                                                پروفایل من
                                            </Link>

                                            <div className="border-t border-gray-100 my-1"></div>

                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                                            >
                                                <BiLogOut className="text-red-500 ml-2" />
                                                خروج از حساب
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header_Dashborde;