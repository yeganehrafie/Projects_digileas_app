import React, { useState } from "react";
import BtnSend from "../../../components/common/buttons/BtnSend";

const FormComment: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    return (
        <div className="form mt-10 bg-[#f6f9fc] p-6 rounded-md shadow-sm mb-10">
            <div className="title mb-6">
                <h3 className="text-xl font-semibold text-gray-800 text-start">
                    نظر بدهید
                </h3>
            </div>

            <form className="form-content space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="نام شما *"
                            className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ایمیل شما *"
                            className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200"
                            required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="نظر شما *"
                        rows={5}
                        className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200 resize-none"
                        required
                    />
                </div>

                <div className="button flex justify-start">
                    <BtnSend name="ارسال نظر" />
                </div>
            </form>
        </div>
    );
};

export default FormComment;