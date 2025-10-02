import type { ReactNode } from "react";
// import SideBar from "./SideBar";
// import TopBar from "./TopBar";
// import AppContext from "../../context/AppContext";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="w-full h-full overflow-auto">
            {/* <TopBar
        top_menu_click={top_menu_click}
        topBarOpenStatus={topBarOpenStatus}
      /> */}

            <div className="flex flex-grow h-full overflow-auto">
                {/* بخش sidbar */}
                <div>
                    {/* <SideBar /> */}
                </div>

                {/* بخش content */}
                <main>
                    <div>
                        {children}
                    </div>
                </main>
                <div id="modal"></div>
            </div>
        </div>
    );
};

export default Layout;