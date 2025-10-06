import React from "react";
import { Link } from "react-router-dom";
const BtnBack: React.FC = () => {

    return (
        <Link
            to="#"
            onClick={() => window.history.back()}
            className="max-w-md w-auto px-4 py-2 text-white text-md font-meduim rounded-sm
            bg-emerald-500 hover:bg-emerald-400 hover:duration-300 "
        >
            بازگشت
        </Link>
    );
}
export default BtnBack