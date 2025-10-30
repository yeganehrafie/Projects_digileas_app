import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { User } from "../../model/User";
import Profile from "../user/profile/Edite";
import Dashboard from "../user/Dashboard";
import Favorites from "../user/favorites/Favorites";
import UpdatePassword from "../user/profile/UpdatePassword";
export default function UserRoutes() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null") as User;
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.roleIds?.[0] !== 1) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/edite" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile/changePassword" element={<UpdatePassword />} />

        </Routes>
    );
}
