import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext ";
import { getMenu } from "./menuService";

interface SideBarItemIconProps {
    setSideBarOpenStatus: (status: boolean) => void;
}

interface MenuItem {
    icon: React.ReactNode;
}

const SideBarItemIcon: React.FC<SideBarItemIconProps> = ({
    setSideBarOpenStatus,
}) => {
    const [menu, setMenu] = useState<MenuItem[] | null>(null);
    const { currentUser, user } = useContext(AppContext);
    const userData = currentUser || user;
    useEffect(() => {
        if (userData) {
            const role = userData?.roleIds?.[0];
            if (role !== undefined) {
                const m = getMenu(role);
                setMenu(m);
            }
        }
    }, [userData]);
    return (
        menu && (
            <ul className="space-y-2 text-center font-bold ">
                {menu.map((item, index) => (
                    <li
                        key={`${index}-${item.icon}`}
                        className="md:w-full md:py-0  "
                        onClick={() => setSideBarOpenStatus(true)}
                    >
                        <div className="flex flex-row md:text-center">
                            <span className=" lg:p-3 xl:p-3 md:text-center ">
                                {item.icon}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        )
    );
};

export default SideBarItemIcon;
