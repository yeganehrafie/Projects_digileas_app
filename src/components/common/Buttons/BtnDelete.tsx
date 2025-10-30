import React from "react";
import { TiDeleteOutline } from "react-icons/ti";

interface PropsButton {
    onclick: () => void;
}
const BtnDelete: React.FC<PropsButton> = ({ onclick }) => {

    return (
        <button
            onClick={onclick}
            className="text-xl text-[#E62727]  hover:text-[#E62727] duration-300"
        >
            <TiDeleteOutline />
        </button>
    );
}
export default BtnDelete;