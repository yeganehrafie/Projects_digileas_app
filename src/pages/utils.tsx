/* نمایش محدود کلمات عنوان و توضیحات */
export const truncateText = (text: string, wordLimit: number): string => {
  if (typeof text !== 'string') return "";
  const words = text.split(" ");
  return words.length <= wordLimit
    ? text
    : words.slice(0, wordLimit).join(" ") + "...";
};
