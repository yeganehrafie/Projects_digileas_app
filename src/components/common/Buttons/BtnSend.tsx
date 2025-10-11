import React from "react";
import { FiSend } from "react-icons/fi";


interface PropsButton {
    onclick?: () => void;
    name: string
}
const BtnSend: React.FC<PropsButton> = ({ onclick, name }) => {

    return (
        <button
            onClick={onclick}
            name={name}
            className="max-w-md w-auto px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-emerald-500 hover:bg-emerald-400 hover:duration-300 flex items-center "
        >
            <FiSend className="mx-1"/>
            {name}
        </button>
    );
}

export default BtnSend;