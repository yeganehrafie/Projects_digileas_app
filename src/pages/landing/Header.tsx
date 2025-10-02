import { MdOutlineEmail } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { LuTwitter } from "react-icons/lu";
import { BsWhatsapp } from "react-icons/bs";

const Header = () => {
    return (
        <header className="header">
            <div className="max-w-full">
                <div className="header-top-wrapper bg-[#092532] text-gray-200
                      flex items-center justify-between  md:px-[10%] py-4 text-md font-semibold">
                    <div className="header-left space-x-4 space-y-4 md:space-y-0 flex flex-col md:flex-row items-center">
                        <div className="email mx-2 flex items-center md:border-l md:border-emerald-800 border-b-0 border-t-0 border-r-0">
                            <span><MdOutlineEmail className="text-emerald-500 " /></span>
                            <span className="mx-2 hover:text-emerald-500 duration-500"><a href="#"> deagis@gmail.com</a></span>
                        </div>
                        <div className="phon flex items-center ">
                            <span><FaHeadphonesSimple className="text-emerald-500 " /></span>
                            <span className="mx-2 hover:text-emerald-500 duration-500"><a href="#"> 87877878 026</a></span>
                        </div>
                    </div>
                    <div className="header-right  flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                        <div className="profile cursor-pointer mx-2 flex items-center md:border-l md:border-emerald-800 border-b-0 border-t-0 border-r-0">
                            <span><FaRegUser className="text-emerald-500 " /></span>
                            <span className="mx-2 hover:text-emerald-500 duration-500">حساب</span>
                        </div>
                        <div className="login cursor-pointer flex items-center md:border-l md:border-emerald-800 border-b-0 border-t-0 border-r-0">
                            <span><MdLogin className="text-emerald-500 " /></span>
                            <span className="mx-2 hover:text-emerald-500 duration-500">ورود</span>
                        </div>
                        <div className="socialMedia flex items-center space-x-4 ">
                            <span className="mx-2">مارا دنبال کنید:</span>
                            <span>
                                <GrInstagram className="text-emerald-500 cursor-pointer 
                                                      hover:drop-shadow-[0_0_12px_rgba(90,207,94,0.9)]
                                                      duration-300 transition-all" />
                            </span>
                            <span>
                                <LuTwitter className="text-emerald-500 cursor-pointer 
                                                 hover:drop-shadow-[0_0_12px_rgba(90,207,94,0.9)]
                                                 duration-300 transition-all" />
                            </span>
                            <span>
                                <BsWhatsapp className="text-emerald-500 cursor-pointer 
                                                 hover:drop-shadow-[0_0_12px_rgba(90,207,94,0.9)]
                                                 duration-300 transition-all" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;