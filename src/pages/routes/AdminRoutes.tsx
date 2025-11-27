import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { User } from "../../model/User";
import Dashboard from "../admin/dashboard/Dashboard";
import Discount from "../admin/products/products_discount/Discounts";
import Selling from "../admin/products/products_selling/Sellings";
import Users from "../admin/user/users";
import Edite from "../admin/profile/Edite";
import UpdatePassword from "../admin/profile/UpdatePassword";
import AddDiscount from "../admin/products/products_discount/AddDiscount";
import EditeDiscount from "../admin/products/products_discount/EditeDiscount";
import AddSelling from "../admin/products/products_selling/AddSelling";
import EditeSelling from "../admin/products/products_selling/EditeSelling";
import Orders from "../admin/orders/Orders";
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

            <Route path="/discount" element={<Discount />} />

            <Route path="/selling" element={<Selling />} />
            <Route path="/selling/add" element={<AddSelling />} />
            <Route path="/products/edit/:slug" element={<EditeSelling />} />

            <Route path="/users" element={<Users />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/profile/edite" element={<Edite />} />
            <Route path="/profile/changePassword" element={<UpdatePassword />} />

            <Route path="/discount/add" element={<AddDiscount />} />
            <Route path="/products/edit/:slug" element={<EditeDiscount />} />

        </Routes>
    );
}
