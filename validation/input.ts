const REGEX = Object.freeze({
  COOPANG: /^http[s]?:\/\/www.coupang.com/,
  TWENTY_NINE: /^http[s]?:\/\/product.29cm.co.kr/,
  PHONE: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/

});

export const validation = {

  isCorrectPhoneNumber(input: string) {
    return REGEX.PHONE.test(input);
  }
};
