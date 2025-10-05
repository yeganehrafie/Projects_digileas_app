import React from "react";
interface PropsTooltip {
    text?: string;
    children: React.ReactNode;
}
const Tooltip: React.FC<PropsTooltip> = ({ text, children }) => {
    return (
        <div className="relative flex items-center justify-center">
            <div className="group/tooltip relative">
                {children}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 
                 bg-[#0E2148] text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 
                 transition-opacity duration-300 whitespace-nowrap z-50">
                    {text}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                    border-4 border-transparent border-t-[#0E2148]"></div>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;