import React from "react";
import { Link } from "react-router-dom";

interface PropsBtn {
    text?: string;
    link?: string;
    onclick?: () => void;
}

const BtnViewMoreDashboard: React.FC<PropsBtn> = ({ text, onclick, link }) => {
    const commonClasses = "outline-none bg-transparent font-semibold text-md text-gray-700 hover:text-emerald-500 duration-500 cursor-pointer";

    if (link) {
        return (
            <Link
                to={link}
                className={`${commonClasses} mr-auto`}
            >
                {text}
            </Link>
        );
    }

    return (
        <button
            onClick={onclick}
            className={`${commonClasses} mr-auto`}
        >
            {text}
        </button>
    );
};

export default BtnViewMoreDashboard;