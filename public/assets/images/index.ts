//명명규칙 : 1. 첫글자는 대문자 2. ~~Img으로 끝내기
export { default as TestImg } from '@/public/assets/images/test.jpg';

// site
export { default as TwentynineLogoImg } from '@/public/assets/images/twentynineLogo.svg';
export { default as CoupangLogoImg } from '@/public/assets/images/coupangLogo.svg';

// SNS share
export { default as KaKaoLogoImg } from '@/public/assets/images/kakaoLogo.svg';
export { default as InstaLogoImg } from '@/public/assets/images/instaLogo.svg';
export { default as FacebookLogoImg } from '@/public/assets/images/facebookLogo.svg';
export { default as TwitterLogoImg } from '@/public/assets/images/twitterLogo.svg';

// bank
const bankImgs: Record<string, any> = {};
for (let i = 1; i <= 18; i++) {
    bankImgs[`bank${i}_Img`] = require(`@/public/assets/images/bankLogo/bank_${i}.png`).default;
}

export default bankImgs;