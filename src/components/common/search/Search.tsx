import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search: React.FC = () => {
    return (
        <div className="search">
            <form className="relative flex items-center w-full">
                <input
                    className="w-full text-right text-md text-gray-800 border border-gray-300
                     focus:border-emerald-500 rounded-full duration-300 px-12 py-2 cursor-pointer outline-none 
                     placeholder:text-sm placeholder:text-gray-400"
                    type="text"
                    placeholder="جستجو کنید ..."
                />
                <IoSearchOutline className="absolute right-4 text-xl text-gray-400" />
            </form>
        </div>
    );
}
export default Search;