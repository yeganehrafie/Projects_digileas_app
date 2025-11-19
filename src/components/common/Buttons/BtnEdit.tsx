import React from "react";
import { BiEdit } from "react-icons/bi";
import Tooltip from "../tooltipBox/Tooltip";

interface PropsButton {
    onclick: () => void;
}
const BtnEdit: React.FC<PropsButton> = ({ onclick }) => {

    return (
        <Tooltip text="ویرایش">
            <button
                onClick={onclick}
                className="text-xl text-amber-500 duration-300"
            >
                <BiEdit />
            </button>
        </Tooltip >

    );
}
export default BtnEdit;