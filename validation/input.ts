const REGEX = Object.freeze({
  COOPANG: /^http[s]?:\/\/www.coupang.com/,
  TWENTY_NINE: /^http[s]?:\/\/www.29cm.co.kr/,
});

export const validation = {
  isCorrectSite(input: string) {
    return REGEX.COOPANG.test(input) || REGEX.TWENTY_NINE.test(input);
  },
};
