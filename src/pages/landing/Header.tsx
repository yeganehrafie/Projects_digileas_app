// import { Link } from "react-router-dom";
import Logo from "../../components/common/logo/Logo";
import Search from "../../components/common/search/Search";
import NavigationMenu from "./NavigationMenu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";


const Header = () => {
    return (
        <header className="header">
            <div className="max-w-full shadow-md shadow-gray-500/50">
                {/* header-1 */}
                <div className="header-top-wrapper bg-[#0E2148] text-gray-800
                      flex items-center justify-between  md:px-[10%] py-3 text-md ">
                    {/* search */}
                    <div className="header-left w-2/3 px-5 md:w-2/4 ">
                        <Search />
                    </div>
                    <div className="header-right text-gray-100 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                        <div className="profile cursor-pointer mx-2 flex items-center md:border-l md:border-emerald-800 border-b-0 border-t-0 border-r-0">
                            <span><FaRegUser className="text-[#3be8aeff] " /></span>
                            <span className="mx-2 hover:text-[#3be8aeff] duration-500">حساب</span>
                        </div>
                        <div className="cart cursor-pointer flex items-center">
                            <span><MdOutlineShoppingCart className="text-[#3be8aeff] " /></span>
                            <span className="mx-2 hover:text-[#3be8aeff] duration-500">سبد خرید</span>
                        </div>
                    </div>
                </div>
                {/* header-2 */}
                <div className="header-buttom-wrapper bg-[#fff] text-gray-800
                      flex items-center justify-between flex-row 
                       md:px-[10%]  py-4 text-md  space-y-4 md:space-y-0 px-5">
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