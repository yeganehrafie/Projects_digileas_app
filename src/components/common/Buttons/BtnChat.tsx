import React from "react";
import { BsChatDots } from "react-icons/bs";

interface PropsBtn {
    onclick?: () => void;
}
const BtnChat: React.FC<PropsBtn> = ({ onclick }) => {
    return (
        <>
            <style>
                {`
                @keyframes pulse-shadow {
                    0%, 100% {
                        box-shadow: 0 0 20px 0 rgb(251 191 36 / var(--tw-bg-opacity, 1));
                    }
                    50% {
                        box-shadow: 0 0 40px 12px rgb(252 211 77 / var(--tw-bg-opacity, 1));
                    }
                }
                .btn-chat-animated-shadow {
                    animation: pulse-shadow 3s infinite ease-in-out;
                }
                `}
            </style>

            <button
                onClick={onclick}
                className="fixed bottom-28 left-8 h-14 w-14 p-3 rounded-full outline-none
                    text-center text-md bg-amber-400 text-gray-50 z-50 flex items-center justify-center
                    hover:bg-amber-500 transition-all duration-300 btn-chat-animated-shadow
                    hover:scale-105"
            >
                <BsChatDots className="text-xl" />
            </button>
        </>
    );
};

export default BtnChat;