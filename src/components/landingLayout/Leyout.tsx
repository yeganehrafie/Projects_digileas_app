import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import BtnScrollTop from "../common/buttons/BtnScrollTop";
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div
            dir="rtl"
            className="mainbg text-emerald-900 overflow-x-hidden"
        >
            <Header />
            <div className="lg:min-h-[600px] min-h-[500px]">{children}</div>
            <Footer />
            <BtnScrollTop />
        </div>
    );
};

export default Layout;