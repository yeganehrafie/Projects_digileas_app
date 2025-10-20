import React from "react";


interface PropsButton {
    onClick?: () => void;
    name: string
}
const BtnSubmit: React.FC<PropsButton> = ({ onClick, name }) => {

    return (
        <button
            onClick={onClick}
            name={name}
            type="submit"
            className="max-w-full w-auto flex justify-center px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-emerald-500 hover:bg-emerald-400 hover:duration-300 flex items-center "
        >
            {name}
        </button>
    );
}

export default BtnSubmit;