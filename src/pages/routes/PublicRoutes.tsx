import { Route, Routes } from "react-router-dom";
import Main from "../landing/Main";
import ProductsDiscount from "../landing/products/ProductsDiscount/ProductsDiscount";
import ProductsNew from "../landing/products/ProductsNew/ProductsNew";
import ProductsSelling from "../landing/products/ProductsSelling/ProductsSelling";
import Bloges from "../landing/blog/Bloges";
import ProductsMobile from "../landing/products/product-category/ProductsMobile";
export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/productsDiscount" element={<ProductsDiscount />} />
            <Route path="/productsNew" element={<ProductsNew />} />
            <Route path="/productsSelling" element={<ProductsSelling />} />

            <Route path="/product-category/mobile" element={<ProductsMobile />} />

            <Route path="/bloges" element={<Bloges />} />

        </Routes>
    );
}
