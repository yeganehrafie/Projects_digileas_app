import React, { useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import SideBar from "./SidBar";
import AppContext from "../../context/AppContext ";
import Header_Dashborde from "./components/Header";


interface LayoutDashboardProps {
    children: ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
    const { isOpen, setIsOpen } = useContext(AppContext);
    const [topBarOpenStatus, setTopBarOpenStatus] = useState<boolean>(false);


    useEffect(() => {
        if (window.innerWidth >= 768) {
            const saved = localStorage.getItem("isOpen");
            if (saved !== null) {
                setIsOpen(JSON.parse(saved));
            }
        }
    }, [setIsOpen]);

    //برای اینکه در حالت موبایل در هر جای صفحهکلیک شد سایدبار بسته بشه
    useEffect(() => {
        if (window.innerWidth < 768) {
            localStorage.setItem("isOpen", JSON.stringify(isOpen));
        }
    }, [isOpen]);


    const close_top_menu = () => {
        if (topBarOpenStatus) {
            setTopBarOpenStatus(false);
        }
    };

    return (
        <div
            onClick={close_top_menu}
            className="min-h-screen overflow-y-auto scrollbar-minimal  bg-gray-50">
            <div className="flex">
                {/* SideBar */}
                <SideBar />

                <div
                    className={`transition-all duration-300 overflow-y-auto  scrollbar-minimal absolute 
                        ${isOpen ? "mx-auto w-full  lg:w-5/6 left-0 " : "w-full left-0"
                        }`}
                >
                    <Header_Dashborde />
                    {/* main content*/}
                    <main className="flex-1 overflow-auto p-6  bg-gray-50 scrollbar-minimal">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;

