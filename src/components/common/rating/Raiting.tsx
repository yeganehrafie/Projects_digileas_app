import React from "react";
import { FaStar } from "react-icons/fa6";

interface PropsRaiting {
    rating?: number;
    onclick?: (rating: number) => void;
    size?: number;
}

const Raiting: React.FC<PropsRaiting> = ({ rating = 0, onclick, size = 18 }) => {
    const totalStars = 5;

    return (
        <div className="flex items-center justify-start gap-1">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= rating;

                return (
                    <button
                        key={index}
                        onClick={() => onclick?.(starValue)}
                        className={`outline-none bg-transparent transition-colors duration-200 ${onclick ? "cursor-pointer hover:scale-110" : "cursor-default"
                            }`}
                    >
                        <FaStar
                            className={`${isFilled ? "text-amber-400" : "text-gray-300"
                                } transition-colors duration-200`}
                            size={size}
                        />
                    </button>
                );
            })}
        </div>
    );
}

export default Raiting;