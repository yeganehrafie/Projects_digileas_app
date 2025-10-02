// import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import Header from "./Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // const [topBarOpenStatus, setTopBarOpenStatus] = useState<boolean>(false);

    // const close_top_menu = () => {
    //     if (topBarOpenStatus) {
    //         setTopBarOpenStatus(false);
    //     }
    // };

    return (
        <div
            // onClick={close_top_menu}
            dir="rtl"
            className="mainbg text-emerald-900 overflow-x-hidden"
        >
            {/* Decorative floating leaves */}
            <Link
                to="/"
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10"
            >
                <svg
                    className="leaf float-slow absolute top-10 end-8 w-14 h-14"
                    viewBox="0 0 64 64"
                    fill="none"
                >
                    <path
                        d="M12 40c18-28 34-28 40-24-4 6-2 20-22 32S10 56 8 52c-2-4 0-8 4-12z"
                        fill="#86efac"
                    />
                    <path
                        d="M10 50c18-20 30-24 40-32"
                        stroke="#065f46"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
                <svg
                    className="leaf float-med absolute bottom-16 start-10 w-16 h-16"
                    viewBox="0 0 64 64"
                    fill="none"
                >
                    <path
                        d="M16 48c10-26 30-34 36-30-2 8-8 20-26 30S12 56 10 52s2-6 6-4z"
                        fill="#a7f3d0"
                    />
                    <path
                        d="M14 50c14-14 26-22 34-30"
                        stroke="#065f46"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
                <svg
                    className="leaf float-fast absolute top-1/2 end-1/4 w-10 h-10"
                    viewBox="0 0 64 64"
                    fill="none"
                >
                    <path
                        d="M14 42c12-18 26-20 32-18-1 6-6 14-20 20S12 48 10 46c-2-2 0-4 4-4z"
                        fill="#6ee7b7"
                    />
                    <path
                        d="M12 46c12-10 22-14 30-20"
                        stroke="#065f46"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </Link>

            {/* <Header
        setTopBarOpenStatus={setTopBarOpenStatus}
        topBarOpenStatus={topBarOpenStatus}
      /> */}
            <div className="lg:min-h-[600px] min-h-[500px]">{children}</div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;