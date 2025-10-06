import { Route, Routes } from "react-router-dom";
import Main from "../landing/Main";
import ProductsDiscount from "../landing/products/ProductsDiscount/ProductsDiscount";
export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/productsDiscount" element={<ProductsDiscount />} />
        </Routes>
    );
}
