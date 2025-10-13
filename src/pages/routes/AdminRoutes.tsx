import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { User } from "../../model/User";
import Dashboard from "../admin/Dashboard";
export default function AdminRoutes() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null") as User;
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.roleIds?.[0] !== 0) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}
