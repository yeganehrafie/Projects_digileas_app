import React, { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import BtnSubmit from "../../../components/common/buttons/BtnSubmit";
import { FaSpinner } from "react-icons/fa";

interface ImageUploadProps {
    folder: string;
    uploadUrl: string | undefined;
    setUploadUrl: (url: string) => void;
    name: string | undefined;
    disabled?: boolean;
    value?: string;
    size?: { width: number; height: number };
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    folder,
    setUploadUrl,
    name,
    disabled = false,
    value,
    size = { width: 380, height: 192 },
}) => {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [fileName, setFileName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getCroppedImg = (image: HTMLImageElement, crop: { width: number; height: number }) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        canvas.width = crop.width;
        canvas.height = crop.height;

        // محاسبه نسبت برای کراپ متناسب
        const scaleX = crop.width / image.width;
        const scaleY = crop.height / image.height;
        const scale = Math.max(scaleX, scaleY);
        const srcW = crop.width / scale;
        const srcH = crop.height / scale;
        const srcX = (image.width - srcW) / 2;
        const srcY = (image.height - srcH) / 2;

        ctx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, crop.width, crop.height);
        return canvas.toDataURL("image/png");
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const cropped = getCroppedImg(img, size);
                if (cropped) {
                    setPreview(cropped);
                }
            };
            img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = () => {
        if (!preview) return;
        setIsLoading(true);

        try {
            // ذخیره در localStorage
            const key = `image_${folder}_${name}`;
            localStorage.setItem(key, preview);
            setUploadUrl(preview);
        } catch (err) {
            console.error("Save to localStorage failed", err);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="w-full space-y-4">
            {/* Input فایل */}
            <div className="relative">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    id={`fileInput-${name}`}
                />
                <label
                    htmlFor={`fileInput-${name}`}
                    className="w-full outline-none px-4 py-3 rounded-sm border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 transition-all duration-200 bg-white text-right cursor-pointer block"
                >
                    {fileName || "انتخاب تصویر"}
                </label>
            </div>

            {/* پیش‌نمایش */}
            {preview && (
                <div className="flex flex-col items-start">
                    <img
                        src={preview}
                        alt="Preview"
                        className="rounded-sm shadow border object-cover"
                        style={{ width: size.width, height: size.height }}
                    />
                    <div className="flex gap-2 mt-2">
                        <BtnSubmit onClick={handleUpload} disabled={true} name="اپلود تصویر" />
                        {isLoading ? <FaSpinner className="animate-spin" /> : ""}
                    </div>
                </div>
            )}

            {/* نمایش تصویر قبلی (اگر فایل جدید انتخاب نشده) */}
            {!preview && value && (
                <div>
                    <img
                        src={value}
                        alt="Existing"
                        className="rounded-sm shadow border object-cover"
                        style={{ width: size.width, height: size.height }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;