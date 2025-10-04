import React from "react";
import { IoSearchOutline } from "react-icons/io5";
/**
 * 
 * برای محصولات براساس نام و قیمت باشه 
 * برای داشبرد ادمین و کاربر بر اساس نیاز 
 * با اینترفیس بهش پراپس بدی اوک میشه
 * 
 */
const Search: React.FC = () => {
    return (
        <div className="search">
            <form className="relative flex items-center w-full">
                <input
                    className="w-full text-right text-md text-gray-800 border border-gray-300
                     focus:border-emerald-500 rounded-sm duration-300 px-12 py-3 cursor-pointer outline-none pr-4"
                    type="text"
                    placeholder="جستجو کنید ..."
                />
                <IoSearchOutline className="absolute left-3 text-xl text-gray-400" />
            </form>
        </div>
    );
}
export default Search;