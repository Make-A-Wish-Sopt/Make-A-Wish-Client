//명명규칙 : 1. 첫글자는 대문자 2. ~~Img으로 끝내기
export { default as TestImg } from '@/public/assets/images/test.jpg';
export { default as GaugeBarImg } from '@/public/assets/images/GaugeBarImg.svg';


// 케이크, 말풍선
export { default as PillCakeImg } from '@/public/assets/images/pillCake.svg';
export { default as ShareChatImg } from '@/public/assets/images/sharePage_chat.svg';
export { default as LoginChatImg } from '@/public/assets/images/loginPage_chat.svg';
export { default as MainChatImg } from '@/public/assets/images/mainPage_chat.svg';

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
for (let i = 1; i <= 33; i++) {
    bankImgs[`bank${i}_Img`] = require(`@/public/assets/images/bankLogo/bank_${i}.svg`).default;
}

export default bankImgs;