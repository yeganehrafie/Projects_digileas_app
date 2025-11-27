import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/dashboardLayout/breadCrumb/BreadCrumb";
import ImageUpload from "../../../../components/common/upload/ImageUpload";
import BtnCancel from "../../../../components/common/buttons/BtnCancel";
import BtnSubmit from "../../../../components/common/buttons/BtnSubmit";
const EditeSelling: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string>("");
    const navigate = useNavigate();

    return (
        <>
            <BreadCrumb
                items={[
                    { link: "/admin/dashboard", label: "داشبرد" },
                    { link: "/admin/selling", label: "محصولات پر فروش" },
                    { link: "", label: "ویرایش محصول " },
                ]}
            />
            <div className="form shadow-lg rounded-md p-4 bg-white flex-1 w-full">
                <div className="contact-us flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="نام محصول *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                name="text"
                                placeholder=" قیمت *"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                            <input
                                type="text"
                                name="text"
                                placeholder=" قیمت با تخفیف*"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="text"
                                placeholder="توضیحات*"
                                className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>


                    <div className="input-group">
                        <ImageUpload
                            folder="discount-products"
                            uploadUrl={imagePreview}
                            setUploadUrl={setImagePreview}
                            name="imgPro"
                            disabled={false}
                            value={imagePreview}
                            size={{ width: 380, height: 250 }}
                        />
                    </div>
                </div>
                <div className="btn mt-4 flex gap-2 justify-end">
                    <BtnCancel name="انصراف" onClick={() => navigate("/admin/selling")} />
                    <BtnSubmit name="ویرایش اطلاعات" onClick={() => navigate("/admin/selling")} />
                </div>
            </div>
        </>
    );
}
export default EditeSelling;