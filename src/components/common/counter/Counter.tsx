import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setCount(value);
        }
    };

    return (
        <div className="flex items-center text-center gap-1">
            <button
                onClick={handleDecrement}
                className="bg-white text-emerald-500 p-4 border border-gray-300 rounded-full hover:bg-[#8493CA] hover:text-white duration-500 "
                aria-label="Decrease count"
            >
                <FaMinus />
            </button>
            <input
                type="text"
                value={count}
                onChange={handleChange}
                className="outline-none border-none text-center w-12"
                aria-label="Counter value"
            />
            <button
                onClick={handleIncrement}
                className="bg-white text-emerald-500 p-4 border border-gray-300 rounded-full hover:bg-[#8493CA] hover:text-white duration-500"
                aria-label="Increase count"
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default Counter;
