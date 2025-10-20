import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../../model/User";
import Search from "../../common/search/Search";
import AppContext from "../../../context/AppContext ";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { CgMenuRight } from "react-icons/cg";
import Img_user from "../../../images/image_user.png";
const Header_Dashborde: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [localUser, setLocalUser] = useState<User | null>(null);
    const { setIsOpen, isOpen, setUser, setCurrentUser, currentUser } = useContext(AppContext);

    const loadUserFromStorage = () => {
        const userData = localStorage.getItem("currentUser");
        const userProfileData = localStorage.getItem("userProfile");

        if (userProfileData) {
            const parsedProfile = JSON.parse(userProfileData);
            setLocalUser({
                ...parsedProfile,
                image: parsedProfile.profileImage
            });
        } else if (userData) {
            setLocalUser(JSON.parse(userData));
        }
    };

    useEffect(() => {
        loadUserFromStorage();
        const handleStorageChange = () => {
            loadUserFromStorage();
        };

        window.addEventListener('storage', handleStorageChange);

        const interval = setInterval(loadUserFromStorage, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        loadUserFromStorage();
    }, [currentUser]);


    useEffect(() => {
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            setLocalUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("storage");
        setCurrentUser(undefined);
        setUser(undefined);
        setLocalUser(null);
        return true;
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        loadUserFromStorage();
        const handleStorageChange = () => {
            loadUserFromStorage();
        };

        window.addEventListener('storage', handleStorageChange);

        const interval = setInterval(loadUserFromStorage, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        loadUserFromStorage();
    }, [currentUser]);
    return (
        <header className="header">
            <div className="max-w-full border-b ">
                <div className="header-top-wrapper bg-white text-gray-800
                    flex items-center justify-between md:px-[2%]  py-3 text-md">

                    {/*  header-right */}
                    <div className="header-right flex items-center gap-8 mt-3">
                        {/* hamberger menu */}
                        <div className="btn-menu px-[5%] md:px-0">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    localStorage.setItem("isOpen", JSON.stringify(!isOpen));
                                    setIsOpen(!isOpen);
                                }}
                                data-ignore-outside-click
                                className="bg-transparent outline-none"
                            >
                                <CgMenuRight className="text-xl text-gray-600" />
                            </button>
                        </div>
                        <div className="search max-w-full w-[300px] md:w-[350px]">
                            <Search />
                        </div>
                    </div>


                    {/* user dropdown header-left*/}
                    <div className="header-left text-gray-800 flex fixed left-6 items-center">
                        <div className="relative outline-none" ref={dropdownRef}>
                            <div className="flex items-center">
                                <button
                                    onClick={toggleDropdown}
                                    className="profile cursor-pointer mx-2 flex items-center  duration-500 transition-all"
                                >
                                    {localUser?.image ? (
                                        <img
                                            src={localUser.image}
                                            alt={localUser.username}
                                            className="w-14  rounded-full object-cover ml-2 border-double border-4 border-emerald-500"
                                        />
                                    ) : (
                                        <img
                                            src={Img_user}
                                            className="w-14  rounded-full object-cover ml-2 border-double border-4 border-emerald-500"
                                        />
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
                                    <div className="absolute top-full right-0  mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden ">
                                        <div className="py-2 text-md text-right">
                                            <Link
                                                to="/user/profile/edite"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center px-4 py-2  text-gray-600 hover:text-emerald-500  duration-500"
                                            >
                                                <FaUserCircle className="text-emerald-500 ml-2" />
                                                پروفایل من
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2  text-gray-600  hover:text-[#DD0303]  duration-500"
                                            >
                                                <BiLogOut className="text-[#DD0303] ml-2" />
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