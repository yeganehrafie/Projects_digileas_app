import type { ReactNode } from "react";
import SideBar from "./SidBar";
import Header_Dashborde from "./components/Header";
interface LayoutDashboardProps {
    children: ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
    return (
        <div dir="rtl" className="min-h-screen bg-gray-50">
            {/* هدر  داشبورد */}
            <Header_Dashborde />

            <div className="flex h-screen pt-16">
                {/* سایدبار */}
                <div className="w-64 bg-white shadow-lg">
                    <SideBar />
                </div>

                {/* محتوای اصلی */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default LayoutDashboard;