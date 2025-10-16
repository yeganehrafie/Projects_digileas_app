import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsBox from "../../components/ProductsBox";
import { ToastUtils } from "../../../../components/common/toast/ToastUtils";
import type { Product } from "../../../../model/Products";

const ProductsSellingLanding: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Axios API 
    const baseUrl = "https://api.digileas.com/general/products?sort=best_selling";

    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            if (response.data.ok) {
                setProducts(response.data.data.data);
                setLoading(false);
            } else {
                ToastUtils.error("محصولی یافت نشد");
            }
        });
    }, []);
    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };
    return (
        <div className="px-[5%] mt-10">
            <ProductsBox
                products={products}
                isLoading={loading}
                onQuickView={handleQuickView}
                selectedProduct={selectedProduct}
                isModalOpen={isModalOpen}
                onCloseModal={handleCloseModal}
                useSwiper={true}
            />
        </div >
    );
}
export default ProductsSellingLanding;