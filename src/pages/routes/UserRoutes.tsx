import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { User } from "../../model/User";
import Cart from "../landing/basket/Basket";
import Profile from "../user/Profile";
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
}
