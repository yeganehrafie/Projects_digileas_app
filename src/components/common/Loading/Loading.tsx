import React from "react";
import { ImSpinner6 } from "react-icons/im";


const Loading: React.FC = () => {
    return (
        <div className=" z-10 flex items-center justify-center ">
            <div className="text-">
                <ImSpinner6 className="text-5xl text-emerald-500" />
            </div>
        </div>
    );
};
export default Loading;
