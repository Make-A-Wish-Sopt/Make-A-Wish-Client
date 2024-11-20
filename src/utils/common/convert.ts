export const convertEncode = (str: string) => Buffer.from(str).toString('base64');
export const convertDecode = (str: string) => Buffer.from(str, 'base64').toString('utf-8');

export const convertMoneyText = (price: string) => {
  if (price) {
    price = price.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    price = price.replace(/,/g, ''); // ,값 공백처리
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '';
  }
};
