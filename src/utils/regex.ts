const convertMoneyText = (price: string): string => {
  if (!price) return '';

  const rawPrice = price.replace(/[^0-9]/g, '').replace(/,/g, '');
  return rawPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default convertMoneyText;
