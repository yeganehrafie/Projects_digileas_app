import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const BtnScrollTop: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 h-14 w-14 p-3 rounded-full outline-none shadow-lg 
            text-center text-md bg-emerald-400 text-gray-50 z-50 flex items-center justify-center
            hover:bg-emerald-500 transition-colors duration-300"
        >
            <IoIosArrowUp className="text-xl" />
        </button>
    )
}
export default BtnScrollTop;