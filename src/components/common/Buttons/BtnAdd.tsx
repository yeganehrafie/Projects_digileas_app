import React from "react";
import { MdOutlineAdd } from "react-icons/md";


interface PropsButton {
    onclick?: () => void;
    name: string
}
const BtnAdd: React.FC<PropsButton> = ({ onclick, name }) => {

    return (
        <button
            onClick={onclick}
            name={name}
            className="max-w-md w-auto mr-auto flex items-center px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-[#8493CA] hover:bg-emerald-400 hover:duration-300 "
        >
            <MdOutlineAdd />
            {name}
        </button>
    );
}

export default BtnAdd;