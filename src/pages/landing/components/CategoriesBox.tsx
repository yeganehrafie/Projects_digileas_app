import { MdOutlineDevices } from "react-icons/md";
import { IoIosLaptop } from "react-icons/io";
import { GiTablet } from "react-icons/gi";
import { SlHome } from "react-icons/sl";
import "../../../pages/landing/Style/animateAos.css"

const CategoriesBox: React.FC = () => {
    const Categories = [
        { id: 1, title: "لپ تاپ وکامپیوتر", icon: <IoIosLaptop size={40} />, href: "#1" },
        { id: 2, title: "موبایل و تبلت", icon: <GiTablet size={40} />, href: "#2" },
        { id: 3, title: "لوازم الکترونیکی", icon: <MdOutlineDevices size={40} />, href: "#3" },
        { id: 4, title: "خانه و آشپزخانه", icon: <SlHome size={40} />, href: "#4" },
    ]

    return (
        <>
            <div className="categories max-w-full mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Categories.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className="group categories_Box bg-[#F6F9FC] p-8 rounded-lg cursor-pointer hover:shadow-lg duration-500 transition-all text-center"
                        >
                            <div className="flex items-center justify-center">
                                <span className="text-white group-hover:bg-gradient-to-r group-hover:from-[#11B76B] group-hover:to-[#3be8aeff] 
                                 duration-500 h-24 w-24 rounded-full bg-[#8493CA] flex items-center justify-center">
                                    {item.icon}
                                </span>
                            </div>
                            <h2 className="text-gray-700 group-hover:text-emerald-400 transition-colors duration-500 text-md font-semibold mt-4">
                                {item.title}
                            </h2>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
export default CategoriesBox;