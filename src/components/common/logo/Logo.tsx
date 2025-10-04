import React from "react";
import { GiShoppingBag } from "react-icons/gi";


const Logo: React.FC = () => {

    return (
        <div className="logo flex">
            <svg width="0" height="0">
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3be8aeff" />
                </linearGradient>
            </svg>

            <GiShoppingBag
                className="mx-2 text-3xl"
                style={{ fill: "url(#gradient)" }}
            />
            <div className="flex flex-col">
                <span className="font-bold">digileas</span>
                <span className="text-emerald-500 tracking-wider">مرجع خرید کالای الکترونیک</span>
            </div>
        </div>
    );
}
export default Logo;