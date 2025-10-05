// سبد خرید برای باکس ها
import React from "react";
import Tooltip from "../tooltipBox/Tooltip";
import { HiOutlineShoppingBag } from "react-icons/hi";

const BtnCart: React.FC = () => {

    return (
        <Tooltip text="افزودن به سبد خرید">
            <button className="cartBox  bg-[#8493CA] text-white p-4 rounded-full shadow-md 
               text-white hover:bg-emerald-500 transition-colors duration-300">
                <HiOutlineShoppingBag size={18} />
            </button>
        </Tooltip>

    )
}
export default BtnCart