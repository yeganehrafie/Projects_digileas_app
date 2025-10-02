import React from "react";
import { IoClose } from "react-icons/io5";

interface PropsButton {
    onclick: () => void;
}
const BtnClose: React.FC<PropsButton> = ({ onclick }) => {

    return (
        <button
            onClick={onclick}
            className="bg-slate-400 text-white h-13 w-13 rounded-full p-2
             hover:bg-[#FF4545] duration-300"
        >
            <IoClose />
        </button>
    );
}
export default BtnClose;