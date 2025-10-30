import { Route, Routes } from "react-router-dom";
import Main from "../landing/Main";
import ProductsDiscount from "../landing/products/ProductsDiscount/ProductsDiscount";
import ProductsNew from "../landing/products/ProductsNew/ProductsNew";
import ProductsSelling from "../landing/products/ProductsSelling/ProductsSelling";
import Bloges from "../landing/blog/Bloges";
import ProductsMobile from "../landing/products/product-category/ProductsMobile";
import ProductsLaptop from "../landing/products/product-category/ProductsLaptop";
import ProductsAccessory from "../landing/products/product-category/ProductsAccessory";
import ProductsSmartGadget from "../landing/products/product-category/ProductsSmartGadget";
import ProductsPhoneCase from "../landing/products/product-category/ProductsPhoneCase";
import ProductsGameConsole from "../landing/products/product-category/ProductsGameConsole";
import ProductsCooler from "../landing/products/product-category/ProductsCooler";
import ProductsDetails from "../landing/components/ProductsDetails";
import BlogDetails from "../landing/components/BlogDetails";
import About from "../landing/About";
import Guide from "../landing/Guide";
import Contact from "../landing/Contact";
import Login from "../verify/Login";
import Signup from "../verify/Signup";
import Basket from "../landing/basket/Basket";
export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/productsDiscount" element={<ProductsDiscount />} />
            <Route path="/productsNew" element={<ProductsNew />} />
            <Route path="/productsSelling" element={<ProductsSelling />} />

            <Route path="/product-category/mobile/:categorySlug?" element={<ProductsMobile />} />
            <Route path="/product-category/laptop/:categorySlug?" element={<ProductsLaptop />} />
            <Route path="/product-category/accessory/:categorySlug?" element={<ProductsAccessory />} />
            <Route path="/product-category/smartGadget/:categorySlug?" element={<ProductsSmartGadget />} />
            <Route path="/product-category/phoneCase/:categorySlug?" element={<ProductsPhoneCase />} />
            <Route path="/product-category/gameConsole/:categorySlug?" element={<ProductsGameConsole />} />
            <Route path="/product-category/productsCooler" element={<ProductsCooler />} />
            <Route path="/products/:slug" element={<ProductsDetails />} />

            <Route path="/articles/:slug" element={<BlogDetails />} />
            <Route path="/articles" element={<Bloges />} />
            <Route path="/about" element={<About />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact-us" element={<Contact />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/basket" element={<Basket />} />


        </Routes>
    );
}
