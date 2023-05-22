//명명규칙 : 1. 첫글자는 대문자 2. ~~Img으로 끝내기

export { default as BeefCakeDetailImg } from '../images/beefCakeDetailImg.svg';
export { default as ChickenCakeDetailImg } from '../images/chickenCakeDetailImg.svg';
export { default as CoffeeCakeDetailImg } from '../images/coffeeCakeDetailImg.svg';
export { default as FlowerCakeDetailImg } from '../images/flowerCakeDetailImg.svg';
export { default as PerfumeCakeDetailImg } from '../images/perfumeCakeDetailImg.svg';
export { default as PoopCakeDetailImg } from '../images/poopCakeDetailImg.svg';
export { default as SushiCakeDetailImg } from '../images/sushiCakeDetailImg.svg';
export { default as VitaminCakeDetailImg } from '../images/vitaminCakeDetailImg.svg';

export { default as BeefCakeImg } from '../images/beefCakeImg.svg';
export { default as ChickenCakeImg } from '../images/chickenCakeImg.svg';
export { default as CoffeeCakeImg } from '../images/coffeeCakeDetailImg.svg';
export { default as FlowerCakeImg } from '../images/flowerCakeImg.svg';
export { default as PerfumeCakeImg } from '../images/perfumeCakeImg.svg';
export { default as PoopCakeImg } from '../images/poopCakeImg.svg';
export { default as SushiCakeImg } from '../images/sushiCakeImg.svg';
export { default as VitaminCakeImg } from '../images/vitaminCakeImg.svg';

export { default as GaugeBarImg } from '@/public/assets/images/GaugeBarImg.svg';
export { default as HeartImg } from '@/public/assets/images/heartImg.svg';

// 케이크, 말풍선
export { default as PillCakeImg } from '@/public/assets/images/pillCakeImg.svg';
export { default as ShareChatImg } from '@/public/assets/images/sharePageChatImg.svg';
export { default as LoginChatImg } from '@/public/assets/images/loginPageChatImg.svg';
export { default as MainChatImg } from '@/public/assets/images/mainPageChatImg.svg';
export { default as GiverMainChatImg } from '@/public/assets/images/giverMainPageChatImg.svg';


// site
export { default as TwentynineLogoImg } from '@/public/assets/images/twentynineLogoImg.svg';
export { default as CoupangLogoImg } from '@/public/assets/images/coupangLogoImg.svg';

// SNS share
export { default as KaKaoLogoImg } from '@/public/assets/images/kakaoLogoImg.svg';
export { default as InstaLogoImg } from '@/public/assets/images/instaLogoImg.svg';
export { default as FacebookLogoImg } from '@/public/assets/images/facebookLogoImg.svg';
export { default as TwitterLogoImg } from '@/public/assets/images/twitterLogoImg.svg';

// bank
const bankImgs: Record<string, any> = {};
for (let i = 1; i <= 33; i++) {
  bankImgs[`bank${i}_Img`] = require(`@/public/assets/images/bankLogo/bank_${i}.svg`).default;
}

export default bankImgs;
