import React from "react";


interface PropsButton {
    onclick?: () => void;
    name: string
}
const BtnAddCart: React.FC<PropsButton> = ({ onclick, name }) => {

    return (
        <button
            onClick={onclick}
            name={name}
            className="max-w-md w-auto px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-emerald-500 hover:bg-emerald-400 hover:duration-300 "
        >
            {name}
        </button>
    );
}

export default BtnAddCart;