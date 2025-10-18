import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../model/User";
import Logo from "../../components/common/logo/Logo";
import NavigationMenu from "./NavigationMenu";
import { FaRegUser, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import AppContext from "../../context/AppContext ";

const Header = () => {
    const { user, currentUser } = useContext(AppContext);
    const [localUser, setLocalUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            setLocalUser(JSON.parse(userData));
        }
    }, []);

    const loggedInUser = currentUser || user || localUser;


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

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setLocalUser(null);
        setIsDropdownOpen(false);
        window.location.reload();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <header className="header">
            <div className="max-w-full shadow-md shadow-gray-500/50">
                {/* header-1 */}
                <div className="header-top-wrapper bg-[#0E2148] text-gray-800
                      flex items-center justify-between  md:px-[5%] py-3 text-md ">
                    {/* search */}
                    <div className="header-right w-2/3 px-5 md:w-2/4 ">
                        <div className="search">
                            <form className="relative flex items-center w-full">
                                <input
                                    className="w-full text-right text-md text-gray-800 border border-gray-300
                     focus:border-emerald-500 rounded-sm duration-300 px-12 py-3 cursor-pointer outline-none pr-4"
                                    type="text"
                                    placeholder="جستجو کنید ..."
                                />
                                <IoSearchOutline className="absolute left-3 text-xl text-gray-400" />
                            </form>
                        </div>                    </div>
                    <div className="header-left text-gray-100 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                        <div className="relative" ref={dropdownRef}>
                            {loggedInUser ? (
                                <div className="flex items-center">
                                    <button
                                        onClick={toggleDropdown}
                                        className="profile cursor-pointer mx-2 flex items-center md:border-l md:border-emerald-800 border-b-0 border-t-0 border-r-0 hover:text-[#3be8aeff] duration-500 transition-all"
                                    >
                                        <span><FaRegUser className="text-[#3be8aeff]" /></span>
                                        <span className="mx-2 flex items-center">
                                            {loggedInUser.username}
                                            <FaChevronDown
                                                className={`ml-1 text-xs transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
                                                    }`}
                                            />
                                        </span>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-5 w-48 bg-white rounded-md shadow-lg   border border-gray-200 z-50 overflow-hidden">
                                            <div className="py-2 text-md text-right ">
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
                            ) : (
                                <Link
                                    to="/login"
                                    className="profile cursor-pointer mx-2 flex items-center md:border-l md:border-emerald-800 border-b-0 border-t-0 border-r-0 hover:text-[#3be8aeff] duration-500"
                                >
                                    <span><FaRegUser className="text-[#3be8aeff]" /></span>
                                    <span className="mx-2">ورود / ثبت نام</span>
                                </Link>
                            )}
                        </div>
                        <Link
                            to="/basket"
                            className="basket cursor-pointer flex items-center ">
                            <span><MdOutlineShoppingCart className="text-[#3be8aeff] " /></span>
                            <span className="mx-2 hover:text-[#3be8aeff] duration-500">سبد خرید</span>
                        </Link>
                    </div>
                </div>
                {/* header-2 */}
                <div className="header-buttom-wrapper bg-[#fff] text-gray-800
                      flex items-center justify-between flex-row 
                       md:px-[5%]  py-4 text-md  space-y-4 md:space-y-0 px-5">
                    {/* logo */}
                    <div className="logo ">
                        <Logo />
                    </div>
                    {/* NavigationMenu */}
                    <div className="menu">
                        <NavigationMenu />
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;