import type { ReactNode } from "react";
import { useState, useEffect, useContext } from "react";
import { IoSend } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import Footer from "./Footer";
import Header from "./Header";
import AppContext from "../../context/AppContext ";
import BtnChat from "../common/buttons/BtnChat";
import BtnScrollTop from "../common/buttons/BtnScrollTop";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [chatMessage, setChatMessage] = useState<string>("");
    const [chatVisible, setChatVisible] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<{ id: number, text: string, isUser: boolean }>>([]);
    const { currentUser } = useContext(AppContext)
    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    useEffect(() => {
        if (isChatOpen) {
            setTimeout(() => setChatVisible(true), 10);
            document.body.style.overflow = 'hidden';
        } else {
            setChatVisible(false);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isChatOpen]);

    const handleChatClose = () => {
        setChatVisible(false);
        setTimeout(() => setIsChatOpen(false), 300);
    };

    const handleChatSend = async () => {
        if (!chatMessage.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: chatMessage,
            isUser: true,
        };
        setChatMessages((prev) => [...prev, newMessage]);

        const userMessage = chatMessage;
        setChatMessage('');

        try {
            const response = await fetch(
                '',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        userId: currentUser,
                        status: "success",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('خطا در دریافت پاسخ از ربات');
            }

            const data = await response.json();

            const botReply = data.reply;

            setChatMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: botReply, isUser: false },
            ]);
        } catch (error) {
            console.error('خطا در ارسال پیام به AI Agent:', error);

        }
    };
    const handleChatKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChatSend();
        }
    };

    return (
        <div
            dir="rtl"
            className="mainbg text-emerald-900 overflow-x-hidden"
        >
            <Header />
            <div className="lg:min-h-[600px] min-h-[500px]">{children}</div>
            <Footer />
            <BtnChat onclick={toggleChat} />
            <BtnScrollTop />

            {/* chat ai agent */}
            {isChatOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[100] ${chatVisible ? 'bg-opacity-30' : 'bg-opacity-0'
                            }`}
                        onClick={handleChatClose}
                    />

                    {/* پنل چت */}
                    <div
                        className={`fixed right-0 top-0 bottom-0 w-full md:w-1/3 bg-white shadow-2xl
                                   flex flex-col border-r border-gray-200 transform transition-transform duration-300 
                                   z-[101] ${chatVisible ? 'translate-x-0' : 'translate-x-full'}`}
                        dir="rtl"
                        style={{
                            transform: chatVisible ? 'translateX(0)' : 'translateX(100%)',
                            transition: 'transform 300ms ease-out'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* هدر */}
                        <div className="bg-amber-400 p-3 flex justify-between items-center">
                            <div className="flex items-center space-x-3 space-x-reverse">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <h2 className="text-lg font-semibold text-gray-700">چت با پشتیبانی</h2>
                            </div>
                            <button
                                onClick={handleChatClose}
                                className="bg-transparent outline-none"
                                aria-label="بستن چت"
                            >

                                <RiCloseLine
                                    className="text-gray-700 hover:text-gray-500 text-2xl transition-colors duration-200"

                                />
                            </button>
                        </div>

                        {/* پیام‌های کاربر */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`rounded-2xl p-4 max-w-xs ${msg.isUser ? 'bg-amber-100 rounded-tl-none' : 'bg-gray-200 rounded-tr-none'}`}>
                                        <p className="text-gray-800">{msg.text}</p>
                                        <span className="text-xs text-gray-500 block mt-2">
                                            {new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/*  ارسال پیام */}
                        <div className="border-t border-gray-200 p-4 bg-white">
                            <div className="relative flex items-center">
                                <div className="flex-1 relative">
                                    <input
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        onKeyPress={handleChatKeyPress}
                                        placeholder="پیام خود را بنویسید..."
                                        className="w-full p-2  pl-2 border border-gray-300 rounded-md 
                                        focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-transparent
                                        resize-none duration-500"
                                    />
                                    {chatMessage.trim() && (
                                        <button
                                            onClick={handleChatSend}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent outline-none"
                                            aria-label="ارسال پیام"
                                        >
                                            <IoSend className="text-amber-400 text-xl hover:text-amber-500 duration-500" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Layout;