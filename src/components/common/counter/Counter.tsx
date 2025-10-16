import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface CounterProps {
    count?: number;
    onCountChange?: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({ count = 1, onCountChange }) => {
    const [localCount, setLocalCount] = useState<number>(count);

    useEffect(() => {
        setLocalCount(count);
    }, [count]);

    const handleIncrement = () => {
        const newCount = localCount + 1;
        setLocalCount(newCount);
        onCountChange?.(newCount);
    };

    const handleDecrement = () => {
        const newCount = localCount > 1 ? localCount - 1 : 1;
        setLocalCount(newCount);
        onCountChange?.(newCount);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setLocalCount(value);
            onCountChange?.(value);
        }
    };

    return (
        <div className="flex items-center text-center justify-center gap-1">
            <button
                onClick={handleDecrement}
                className="bg-white text-emerald-500 p-4 border border-gray-300 rounded-full hover:bg-[#8493CA] hover:text-white duration-500"
                aria-label="Decrease count"
            >
                <FaMinus />
            </button>
            <input
                type="text"
                value={localCount}
                onChange={handleChange}
                className="outline-none border-none text-center w-12 "
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