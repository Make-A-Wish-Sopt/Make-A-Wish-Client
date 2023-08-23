export const convertMoneyText = (price: number) => {
  if (price !== undefined) return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
