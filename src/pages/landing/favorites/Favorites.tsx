import React, { useState, useEffect } from "react";
import ProductsBox from "../../landing/components/ProductsBox";
import { ToastUtils } from "../../../components/common/toast/ToastUtils";
import BreadCrumb from "../../../components/landingLayout/breadCrumb/BreadCrumb";
import Loading from "../../../components/common/loading/Loading";
import BtnBack from "../../../components/common/buttons/BtnBack";
import type { Product } from "../../../model/Products";

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);




    useEffect(() => {
        const loadBasket = () => {
            const favoritesData = localStorage.getItem("favorites");
            if (favoritesData) {
                setFavorites(JSON.parse(favoritesData));
            }
            setLoading(false);
        };

        loadBasket();
    }, []);



    // حذف محصول از علاقه‌مندی‌ها
    const handleRemoveItem = (productId: string) => {
        const updatedFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        ToastUtils.success("محصول از علاقه‌مندی‌ها حذف شد");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loading />
            </div>
        );
    }
    return (
        <div className="bg-white ">
            {/* BreadCrumb */}
            <BreadCrumb
                title="لیست علاقه مندی ها"
                items={[
                    { label: "صفحه اصلی", type: "home" },
                    { label: "علاقه مندی ها" }
                ]}
                homePath="/"
            />

            <div className="px-[5%]">
                {/* back button */}
                <div className="flex w-full justify-end mt-10">
                    <BtnBack />
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-10">
                    <div className="products w-full ">
                        <ProductsBox
                            products={favorites}
                            onQuickView={handleQuickView}
                            selectedProduct={selectedProduct}
                            isModalOpen={isModalOpen}
                            onCloseModal={handleCloseModal}
                            useSwiper={false}
                            isFavoritePage={true}
                            onRemoveFromFavorites={handleRemoveItem}
                        />


                    </div>
                </div>
            </div>


        </div>
    );
}

export default Favorites;