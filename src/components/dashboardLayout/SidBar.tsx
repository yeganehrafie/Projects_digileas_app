import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import SideBarItem from "./components/SideBarItem";
import SideBarItemIcon from "./components/SideBarItemIcon";
import AppContext from "../../context/AppContext ";
import Logo from "../common/logo/Logo";


const SideBar: React.FC = () => {
    const { setIsOpen, isOpen } = useContext(AppContext);
    const [isMobile, setIsMobile] = useState(false);
    const [prevIsMobile, setPrevIsMobile] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const isOpenRef = useRef<boolean>(isOpen);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    //در حالت موبایل با تغییر روت در منو منو بسته بسته میشه
    useEffect(() => {
        if (isMobile && isOpen) {
            setIsOpen(false);
        }
    }, [location.pathname, isMobile, setIsOpen, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // فقط در حالت موبایل اجازه بسته شدن با کلیک بیرون داشته باشیم
            if (!isMobile) return;
            if (!isOpenRef.current) return;

            const target = event.target as HTMLElement;
            let current: HTMLElement | null = target;

            while (current) {
                if (current.hasAttribute("data-ignore-outside-click")) {
                    return;
                }
                current = current.parentElement;
            }

            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobile, setIsOpen]);


    // مدیریت ریسایز
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;

            if (!prevIsMobile && mobile) {
                setIsOpen(false);
            } else if (prevIsMobile && !mobile) {
                setIsOpen(true);
            }

            setIsMobile(mobile);
            setPrevIsMobile(mobile);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsOpen, prevIsMobile]);


    return (
        <>
            {/* SideBar */}
            <div
                ref={sidebarRef}
                data-ignore-outside-click
                className={`
        fixed top-0 right-0 h-full
        transition-all duration-500 ease-in-out
        bg-white shadow-lg
        ${isMobile ? "z-50" : "z-50"}
        ${isOpen
                        ? "w-24 px-0 lg:w-1/6  lg:px-4 opacity-100 translate-x-0"
                        : "w-0 opacity-0 translate-x-full pointer-events-none"
                    }
        overflow-hidden
    `}

            >
                <div className="logo flex justify-center items-center p-4 hidden lg:block">
                    <Logo />
                </div>
                <div className="w-64 ">
                    {isOpen ? (
                        <SideBarItem />
                    ) : (
                        !isMobile && <SideBarItemIcon setSideBarOpenStatus={setIsOpen} />
                    )}
                </div>
            </div>

            {/* Overlay برای موبایل */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-50"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default SideBar;