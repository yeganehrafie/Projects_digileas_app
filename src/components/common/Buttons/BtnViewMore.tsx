// مشاهده بیشتر در لندینگ
import React from "react";
import { TiArrowLeft } from "react-icons/ti";


interface PropsBtn {
    text?: string;
    onclick?: () => void;
}
const BtnViewMore: React.FC<PropsBtn> = ({ text, onclick }) => {

    return (
        <button
            onClick={onclick}
            className="flex items-center outline-none bg-transparent text-xl font-meduim  
            text-gray-600 hover:text-emerald-500 duration-300"
        >
            {text}
            <TiArrowLeft />
        </button>
    );
}
export default BtnViewMore;