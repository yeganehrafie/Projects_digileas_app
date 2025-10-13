import React from "react";
import { TiArrowLeft } from "react-icons/ti";

interface PropsButton {
    onClick?: () => void;
    name: string
}
const BtnBloges: React.FC<PropsButton> = ({ onClick, name }) => {

    return (
        <button
            onClick={onClick}
            name={name}
            className="flex items-center max-w-md w-auto px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-emerald-500 hover:bg-emerald-400 duration-300 "
        >
            {name}
            <TiArrowLeft />
        </button>
    );
}

export default BtnBloges;