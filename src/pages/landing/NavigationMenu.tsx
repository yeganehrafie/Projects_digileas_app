import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";

interface MenuItem {
    name: string;
    href: string;
    active?: boolean;
    dropdown?: MenuItem[];
}
interface NavigationMenuProps {
    onCategorySelect?: (categorySlug: string) => void;
}
const NavigationMenu: React.FC<NavigationMenuProps> = ({ onCategorySelect }) => {
    const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [deepDropdowns, setDeepDropdowns] = useState<{ [key: string]: boolean }>({});

    const menuRef = useRef<HTMLElement>(null);

    const toggleMobileNav = (): void => {
        setMobileNavActive(!mobileNavActive);
    };
    //closed menu
    const toggleDropdown = (dropdownName: string): void => {
        if (activeDropdown === dropdownName) {
            // اگر روی همان دراپ‌داون کلیک شد، بسته شود
            setActiveDropdown(null);
        } else {
            // اگر روی دراپ‌داون دیگری کلیک شد، قبلی بسته و جدید باز شود
            setActiveDropdown(dropdownName);
        }
    };
    //closed submenus
    const toggleDeepDropdown = (dropdownName: string): void => {
        setDeepDropdowns(prev => {
            const newState = { ...prev };

            // اگر قبلا باز بود، بسته شود
            if (newState[dropdownName]) {
                delete newState[dropdownName];
            } else {
                // اگر باز نبود، تمام deep dropdownهای دیگر را ببند و این را باز کن
                Object.keys(newState).forEach(key => {
                    delete newState[key];
                });
                newState[dropdownName] = true;
            }

            return newState;
        });
    };
    //بستن منو ها
    const closeAllMenus = (): void => {
        setActiveDropdown(null);
        setDeepDropdowns({});
        setMobileNavActive(false);
    };
    // useEffect برای هندل کردن کلیک خارج از منو
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeAllMenus();
            }
        };

        if (mobileNavActive || activeDropdown || Object.values(deepDropdowns).some(Boolean)) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileNavActive, activeDropdown, deepDropdowns]);
    const handleCategoryClick = (categoryName: string, href: string) => {
        if (href.startsWith('/product-category/laptop/') || href.startsWith('/product-category/mobile/')) {
            // اجازه بده لینک معمولی کار کند
            closeAllMenus();
            return;
        }
        if (onCategorySelect) {
            // تبدیل نام دسته‌بندی به slug
            const slugMap: { [key: string]: string } = {
                'سامسونگ': 'سامسونگ',
                'اپل': 'اپل',
                'گوشی کار کرده': 'گوشی-کار-کرده',
                'ایسوس': 'ایسوس',
                'اچ پی': 'اچ پی',
                'ایسر': 'ایسر',
                'لنوو': 'لنوو',
                'اکسسوری-ها': 'اکسسوری-ها',
                'ساعت هوشمند اپل': ' ساعت هوشمند اپل',
                'هندزفری اپل': 'هندزفری اپل',
                'هندزفری سامسونگ': 'هندزفری سامسونگ',
                'ساعت هوشمند سامسونگ': 'ساعت هوشمند سامسونگ',
                'آداپتور اپل': 'آداپتور اپل',
                'گجت-های-هوشمند': 'گجت-های-هوشمند',
                'جارو-رباتیک': 'جارو-رباتیک',
                'شیکر-شارژی': 'شیکر-شارژی',
                'تصفیه-کننده-هوا': 'تصفیه-کننده-هوا',
                'قاب-گوشی': 'قاب-گوشی',
                'قاب-گوشی-اپل': 'قاب-گوشی-اپل',
                'قاب-گوشی-اندروید': 'قاب-گوشی-اندروید',
            };

            const slug = slugMap[categoryName];
            if (slug) {
                onCategorySelect(slug);
            }
        }
        closeAllMenus();
    };
    const menuItems: MenuItem[] = [
        {
            name: 'همه دسته بندی ها',
            href: '#',
            dropdown: [
                {
                    name: 'لپ تاپ',
                    href: '#',
                    dropdown: [
                        { name: 'ایسوس', href: '/product-category/laptop/ایسوس' },
                        { name: 'اچ پی', href: '/product-category/laptop/اچ-پی' },
                        { name: 'ایسر', href: '/product-category/laptop/ایسر' },
                        { name: 'لنوو', href: '/product-category/laptop/لنوو' },
                    ]
                },
                {
                    name: 'گوشی موبایل',
                    href: "#",
                    dropdown: [
                        { name: 'سامسونگ', href: '/product-category/mobile/سامسونگ' },
                        { name: 'اپل', href: '/product-category/mobile/اپل' },
                        { name: 'گوشی کار کرده', href: '/product-category/mobile/گوشی-کار-کرده' },
                    ]
                },
                {
                    name: 'اکسسوری ها',
                    href: '#',
                    dropdown: [
                        { name: 'ساعت هوشمند اپل', href: '/product-category/accessory/اپل-اکسسوری' },
                        { name: 'هندزفری اپل', href: '/product-category/accessory/هندزفری-اپل' },
                        { name: 'هندزفری سامسونگ', href: '/product-category/accessory/هندزفری-سامسونگ' },
                        { name: 'ساعت هوشمند سامسونگ', href: '/product-category/accessory/سامسونگ-اکسسوری' },
                        { name: "آداپتور اپل", href: '/product-category/accessory/کلگی-اپل' }
                    ]
                },
                {
                    name: 'گجت های هوشمند',
                    href: '#',
                    dropdown: [
                        { name: 'تصفیه کننده هوا', href: '/product-category/smartGadget/تصفیه-کننده-هوا' },
                        { name: 'جارو رباتیک', href: '/product-category/smartGadget/جارو-رباتیک' },
                        { name: 'شیکر شارژی', href: '/product-category/smartGadget/شیکر-شارژی' },
                    ]
                },
                {
                    name: 'قاب گوشی',
                    href: '#',
                    dropdown: [
                        { name: 'قاب گوشی اندروید', href: '/product-category/phoneCase/قاب-گوشی-اندروید' },
                        { name: 'قاب گوشی اپل', href: '/product-category/phoneCase/قاب-گوشی-اپل' },
                    ]
                },
                {
                    name: 'کنسول بازی',
                    href: '#',
                    dropdown: [
                        { name: 'دسته بازی', href: '/product-category/gameConsole/دسته-بازی' },
                        { name: 'XBOX', href: '/product-category/gameConsole/XBOX' },
                        { name: 'PS4', href: '/product-category/gameConsole/PS4' },
                        { name: 'PS5', href: '/product-category/gameConsole/PS5' },

                    ]
                },
                {
                    name: 'سایر موارد ',
                    href: '#',
                    dropdown: [
                        { name: 'کولر', href: '/product-category/productsCooler' },
                    ]
                },
            ]
        },
        { name: 'صفحه اصلی', href: '/' },
        { name: 'درباره ما', href: '#' },
        { name: 'راهنمای سفارش', href: '#' },
        { name: 'ارتباط با ما', href: '#' },
        { name: 'تخفیفات ویژه', href: '#', active: true },
    ];

    const renderMenuItems = (items: MenuItem[], isSubmenu: boolean = false, parentName?: string): React.ReactElement[] => {
        return items.map((item: MenuItem, index: number) => {
            const fullItemName = parentName ? `${parentName}-${item.name}` : item.name;

            return (
                <li
                    key={index}
                    className={`relative  ${isSubmenu ? '' : 'whitespace-nowrap py-1 px-3 '}`}
                >
                    {item.dropdown ? (
                        <div className="relative group ">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isSubmenu) {
                                        toggleDeepDropdown(fullItemName);
                                    } else {
                                        toggleDropdown(item.name);
                                    }
                                }}
                                className={`flex items-center justify-between w-full transition-colors duration-300 ${isSubmenu
                                    ? 'py-2 px-4 text-md text-gray-700 hover:text-emerald-500'
                                    : item.name === 'همه دسته بندی ها'
                                        ? 'bg-gray-100 text-gray-800 px-4 py-3 rounded-md text-md  hover:text-emerald-500'
                                        : ''
                                    }`}
                            >
                                <div className="flex items-center">
                                    {item.name === 'همه دسته بندی ها' && (
                                        <BiCategory className="text-xl ml-2 text-emerald-500" />
                                    )}
                                    <span className='text-gray-600 text-md  hover:text-emerald-500 duration-300'>{item.name}</span>
                                </div>
                                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 
                                 ${(isSubmenu && deepDropdowns[fullItemName]) ||
                                        (!isSubmenu && activeDropdown === item.name) ? 'rotate-180 ' : ''
                                    }`} />
                            </button>

                            {/* Dropdown Menu - برای "همه دسته بندی ها" موقعیت متفاوت */}
                            <ul className={`
                                absolute bg-white rounded-md shadow-lg py-2 min-w-[220px] z-50
                                transition-all duration-300 ease-in-out text-md px-6 text-right 
                                ${isSubmenu ? 'border border-gray-100 right-full top-0' : ''}
                                ${item.name === 'همه دسته بندی ها'
                                    ? 'left-0 top-full mt-2'
                                    : 'right-full top-10'
                                }
                                ${(isSubmenu && deepDropdowns[fullItemName]) ||
                                    (!isSubmenu && activeDropdown === item.name)
                                    ? 'opacity-100 visible translate-y-0'
                                    : 'opacity-0 invisible -translate-y-2'
                                }
                            `}>
                                {renderMenuItems(item.dropdown, true, fullItemName)}
                            </ul>
                        </div>
                    ) : (
                        <a
                            href={item.href}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryClick(item.name, item.href);
                            }}
                            className={`block py-3 text-lg font-medium hover:text-emerald-500 transition-colors
                                ${item.active ? 'text-emerald-500' : 'text-gray-600'
                                }`}
                        >
                            {item.name}

                        </a>
                    )}
                </li>
            );
        });
    };
    return (
        <nav className="navmenu flex items-center w-full " ref={menuRef}>
            {/* دکمه همه دسته بندی ها در سمت چپ */}
            <div className="hidden xl:block">
                <ul className="flex list-none p-0 items-center">
                    {renderMenuItems([menuItems[0]])}
                </ul>
            </div>

            {/* بقیه منوها در سمت راست */}
            <div className="hidden xl:block flex-grow">
                <ul className="flex justify-end mx-5 list-none p-0 items-center">
                    {renderMenuItems(menuItems.slice(1))}
                </ul>
            </div>

            {/* Mobile Toggle Button */}
            <button
                className="mobile-nav-toggle xl:hidden text-2xl cursor-pointer transition-colors duration-300 ml-auto"
                onClick={toggleMobileNav}
                aria-label="Toggle navigation menu"
            >
                {mobileNavActive ? <FaTimes className="w-6 h-6" /> :
                    <FaBars className="w-6 h-6 text-gray-700 hover:text-emerald-500 duration-300" />}
            </button>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 z-40 ${mobileNavActive ? 'opacity-100 visible' : 'opacity-0 invisible'} xl:hidden`}>
                <ul
                    className={`absolute top-16 left-4 right-4 bottom-4 bg-white rounded-lg p-4 overflow-y-auto transition-transform duration-300 z-50 ${mobileNavActive ? 'translate-y-0' : '-translate-y-4'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {menuItems.map((item: MenuItem, index: number) => (
                        <li key={index} className="border-b border-gray-100 last:border-b-0">
                            {item.dropdown ? (
                                <div className="py-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDropdown(`mobile-${item.name}`);
                                        }}
                                        className={`flex items-center justify-between w-full text-lg font-medium ${item.name === 'همه دسته بندی ها'
                                            ? 'bg-gray-100 hover:text-emerald-500 text-gray-800 px-4 py-3 rounded-md duration-300'
                                            : 'text-gray-800'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            {item.name === 'همه دسته بندی ها' && (
                                                <BiCategory className="text-xl ml-2 text-emerald-500" />
                                            )}
                                            <span>{item.name}</span>
                                        </div>
                                        <FaChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === `mobile-${item.name}` ? 'rotate-180' : ''}`} />
                                    </button>

                                    {activeDropdown === `mobile-${item.name}` && (
                                        <ul className="mt-2 pl-4 bg-gray-50 rounded-md" onClick={(e) => e.stopPropagation()}>
                                            {item.dropdown.map((subItem: MenuItem, subIndex: number) => (
                                                <li key={subIndex} className="border-b border-gray-200 last:border-b-0">
                                                    {subItem.dropdown ? (
                                                        <div className="py-2">
                                                            <button onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleDeepDropdown(`mobile-deep-${subItem.name}`);
                                                            }} className="flex items-center justify-between w-full text-gray-800  
                                                          hover:text-emerald-500 duration-300 text-base font-bold">
                                                                <span>{subItem.name}</span>
                                                                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${deepDropdowns[`mobile-deep-${subItem.name}`] ? 'rotate-180' : ''}`} />
                                                            </button>

                                                            {deepDropdowns[`mobile-deep-${subItem.name}`] && (
                                                                <ul className="mt-1 pl-4 bg-gray-100 rounded" onClick={(e) => e.stopPropagation()}>
                                                                    {subItem.dropdown.map((deepItem: MenuItem, deepIndex: number) => (
                                                                        <li key={deepIndex}>
                                                                            <a
                                                                                href={deepItem.href}
                                                                                className="block py-2 px-3 text-gray-800 text-sm font-bold hover:text-emerald-500 transition-colors"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    closeAllMenus();
                                                                                }}
                                                                            >
                                                                                {deepItem.name}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={subItem.href}
                                                            className="block py-2 px-3 text-gray-600 text-base hover:text-emerald-500 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                closeAllMenus();
                                                            }}
                                                        >
                                                            {subItem.name}
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <a
                                    href={item.href}
                                    className={`block py-3 text-lg font-medium hover:text-emerald-500 transition-colors ${item.active ? 'text-emerald-500' : 'text-gray-600'
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeAllMenus();
                                    }}
                                >
                                    {item.name}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavigationMenu;