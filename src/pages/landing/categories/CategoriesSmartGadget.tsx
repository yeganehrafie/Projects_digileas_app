import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface Category {
    id: number;
    name: string;
    slug: string;
    hasChildren?: boolean;
    parentId?: number;
}

interface CategoriesProps {
    selectedCategories: number[];
    onCategoryChange: (categoryIds: number[]) => void;
    initialSelectedCategory?: number;
}

const CategoriesSmartGadget: React.FC<CategoriesProps> = ({
    selectedCategories,
    onCategoryChange,
    initialSelectedCategory
}) => {
    const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);

    const categories: Category[] = [
        { id: 1, name: "گجت های هوشمند", slug: "گجت-های-هوشمند", hasChildren: true },
        { id: 2, name: "تصفیه کننده هوا", slug: "تصفیه-کننده-هوا", parentId: 1 },
        { id: 3, name: "جارو رباتیک", slug: "جارو-رباتیک", parentId: 1 },
        { id: 4, name: "شیکر شارژی", slug: "شیکر-شارژی", parentId: 1 },
    ];

    const toggleCategory = (categoryId: number) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCategoryChange = (categoryId: number) => {
        const newSelectedCategories = selectedCategories.includes(categoryId)
            ? []
            : [categoryId];

        onCategoryChange(newSelectedCategories);
    };

    const mainCategories = categories.filter(cat => !cat.parentId);
    const childCategories = categories.filter(cat => cat.parentId);

    // آیکون Chevron با SVG
    const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
        <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    const renderCategory = (category: Category) => {
        const isChecked = selectedCategories.includes(category.id);
        const hasChildren = category.hasChildren;
        const isExpanded = expandedCategories.includes(category.id);
        const children = hasChildren ? childCategories.filter(child => child.parentId === category.id) : [];

        return (
            <div key={category.id} className="w-full">
                <div className="flex items-center justify-between w-full">
                    <label className="flex items-center cursor-pointer flex-1">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => handleCategoryChange(category.id)}
                        />
                        <span className="text-md font-medium text-gray-800 hover:text-emerald-500 duration-300 mx-2">
                            {category.name}
                        </span>
                    </label>

                    {hasChildren && (
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            <ChevronIcon isExpanded={isExpanded} />
                        </button>
                    )}
                </div>

                {/* زیرمنوها */}
                {hasChildren && isExpanded && (
                    <div className="mr-6 mt-5 space-y-4 border-r-2 border-emerald-300 pr-2">
                        {children.map(child => {
                            const isChildChecked = selectedCategories.includes(child.id);
                            return (
                                <label key={child.id} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isChildChecked}
                                        onChange={() => handleCategoryChange(child.id)}
                                    />
                                    <div className={`
                                        w-4 h-4 flex items-center justify-center border-2 rounded-sm bg-white mr-2 
                                        transition-colors duration-200 mx-2
                                        ${isChildChecked ? 'border-emerald-400' : 'border-gray-300'}
                                    `}>
                                        <IoMdCheckmark className={`
                                            transition-opacity duration-200 w-2 h-2
                                            ${isChildChecked ? 'text-emerald-400 opacity-100' : 'text-emerald-400 opacity-0'}
                                        `} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 hover:text-emerald-500 duration-300">
                                        {child.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };
    // تنظیم دسته‌بندی اولیه
    useEffect(() => {
        if (initialSelectedCategory && initialSelectedCategory > 0) {
            // پیدا کردن دسته‌بندی والد برای باز کردن آن
            const category = categories.find(cat => cat.id === initialSelectedCategory);
            if (category && category.parentId) {
                setExpandedCategories(prev =>
                    prev.includes(category.parentId!) ? prev : [...prev, category.parentId!]
                );
            }

            // تنظیم دسته‌بندی انتخاب شده
            onCategoryChange([initialSelectedCategory]);
        }
    }, [initialSelectedCategory]);
    return (
        <div className="categories flex flex-col text-start space-y-4 mt-5">
            {mainCategories.map(renderCategory)}
        </div>
    );
};

export default CategoriesSmartGadget;