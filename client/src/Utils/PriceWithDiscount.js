//calculate discount parcentage
export const PriceWithDiscount = (price, discount = 1) => {
  const discountPrice = Math.ceil((Number(price) * Number(discount)) / 100);
  const actualPrice = Number(price) - Number(discountPrice);
  return actualPrice;
};
