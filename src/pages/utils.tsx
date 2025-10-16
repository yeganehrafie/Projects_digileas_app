import type { BasketItem } from "../model/Basket";
import type { Product } from "../model/Products";
import { ToastUtils } from "../components/common/toast/ToastUtils";
/* نمایش محدود کلمات عنوان و توضیحات */
export const truncateText = (text: string, wordLimit: number): string => {
  if (typeof text !== 'string') return "";
  const words = text.split(" ");
  return words.length <= wordLimit
    ? text
    : words.slice(0, wordLimit).join(" ") + "...";
};

/* فرمت قیمت*/
export const formatPrice = (price: string | number): string => {
  const num = typeof price === 'string' ? parseInt(price) : price;
  return new Intl.NumberFormat('fa-IR').format(num);
};

/**افزودن محصول  به سبد خرید || addToBasket*/
export const addToBasket = (item: Product) => {
  const isLoggedIn = localStorage.getItem("currentUser");
  if (!isLoggedIn) {
    ToastUtils.error("لطفا ابتدا وارد حساب کاربری خود شوید")
    return;
  }

  const existingItemsJson = localStorage.getItem("basket");
  const existingItems: BasketItem[] = existingItemsJson ? JSON.parse(existingItemsJson) : [];

  const existingItemIndex = existingItems.findIndex(
    (basket: BasketItem) => basket.product.name === item.name
  );

  if (existingItemIndex !== -1) {
    ToastUtils.warning(`${item.name} قبلا به سبد خرید شما اضافه شده`);
  } else {
    const newItem: BasketItem = {
      product: item,
      quantity: 1,
      orderDate: new Date().toLocaleDateString("fa-IR"),
    };
    const updatedItems = [...existingItems, newItem];
    localStorage.setItem("basket", JSON.stringify(updatedItems));
    ToastUtils.success(`${item.name} محصول به سبد خرید شما اضافه شد!`);
  }
};

/**افزودن محصول به علاقه مندی ها || addToFavorites */
export const addToFavorites = (item: Product) => {
  const isLoggedIn = localStorage.getItem("currentUser");
  if (!isLoggedIn) {
    ToastUtils.error("لطفا ابتدا وارد حساب کاربری خود شوید")
    return;
  }

  const existingItemsJson = localStorage.getItem("favorites");
  const existingItems: Product[] = existingItemsJson ? JSON.parse(existingItemsJson) : [];

  const existingItemIndex = existingItems.findIndex(
    (favorites: Product) => favorites.name === item.name
  );

  if (existingItemIndex !== -1) {
    ToastUtils.warning(`${item.name} قبلا به صفحه علاقه مندی شما اضافه شده`);
  } else {
    const newItem: Product = {
      ...item,
      is_favorite: true,
    };
    const updatedItems = [...existingItems, newItem];
    localStorage.setItem("favorites", JSON.stringify(updatedItems));
    ToastUtils.success(`${item.name} محصول به صفحه علاقه مندی شما اضافه شد!`);
  }
};