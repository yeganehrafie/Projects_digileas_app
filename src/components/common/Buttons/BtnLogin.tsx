import React from "react";
import { TbLogin } from "react-icons/tb";


interface PropsButton {
    onClick?: () => void;
    name: string
}
const BtnLogin: React.FC<PropsButton> = ({ onClick, name }) => {

    return (
        <button
            onClick={onClick}
            name={name}
            type="submit"
            className="max-w-full w-full flex justify-center px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-emerald-500 hover:bg-emerald-400 hover:duration-300 flex items-center "
        >
            {name}
            <TbLogin className="mx-1" />
        </button>
    );
}

export default BtnLogin;