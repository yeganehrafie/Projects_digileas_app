import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Tooltip from "../tooltipBox/Tooltip";
interface PropsButton {
    onclick: () => void;
}
const BtnDelete: React.FC<PropsButton> = ({ onclick }) => {

    return (
        <Tooltip text="حذف">
            <button
                onClick={onclick}
                className="text-xl text-[#E62727]  hover:text-[#E62727] duration-300"
            >
                <TiDeleteOutline />
            </button>
        </Tooltip>

    );
}
export default BtnDelete;