import React from "react";


interface PropsButton {
    onClick?: () => void;
    name: string
}
const BtnCancel: React.FC<PropsButton> = ({ onClick, name }) => {

    return (
        <button
            onClick={onClick}
            name={name}
            type="button"
            className="max-w-full w-auto flex justify-center px-4 py-2 text-[#F93827] text-md font-meduim rounded-sm
            bg-white border border-[#F93827] hover:bg-[#F93827]  hover:text-white hover:duration-500 flex items-center "
        >
            {name}
        </button>
    );
}

export default BtnCancel;