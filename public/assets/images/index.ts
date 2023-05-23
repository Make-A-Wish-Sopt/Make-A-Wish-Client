//명명규칙 : 1. 첫글자는 대문자 2. ~~Img으로 끝내기

export { default as BeefCakeDetailImg } from '../images/cakes/beefCakeDetailImg.svg';
export { default as ChickenCakeDetailImg } from '../images/cakes/chickenCakeDetailImg.svg';
export { default as CoffeeCakeDetailImg } from '../images/cakes/coffeeCakeDetailImg.svg';
export { default as FlowerCakeDetailImg } from '../images/cakes/flowerCakeDetailImg.svg';
export { default as PerfumeCakeDetailImg } from '../images/cakes/perfumeCakeDetailImg.svg';
export { default as PoopCakeDetailImg } from '../images/cakes/poopCakeDetailImg.svg';
export { default as SushiCakeDetailImg } from '../images/cakes/sushiCakeDetailImg.svg';
export { default as VitaminCakeDetailImg } from '../images/cakes/vitaminCakeDetailImg.svg';

export { default as BeefCakeImg } from '../images/cakes/beefCakeImg.svg';
export { default as ChickenCakeImg } from '../images/cakes/chickenCakeImg.svg';
export { default as CoffeeCakeImg } from '../images/cakes/coffeeCakeImg.svg';
export { default as FlowerCakeImg } from '../images/cakes/flowerCakeImg.svg';
export { default as PerfumeCakeImg } from '../images/cakes/perfumeCakeImg.svg';
export { default as PoopCakeImg } from '../images/cakes/poopCakeImg.svg';
export { default as SushiCakeImg } from '../images/cakes/sushiCakeImg.svg';
export { default as VitaminCakeImg } from '../images/cakes/vitaminCakeImg.svg';

export { default as BeefCakeThanksImg } from '../images/cakes/beefCakeThanksImg.svg';
export { default as ChickenCakeThanksImg } from '../images/cakes/chickenCakeThanksImg.svg';
export { default as CoffeeCakeThanksImg } from '../images/cakes/coffeeCakeThanksImg.svg';
export { default as FlowerCakeThanksImg } from '../images/cakes/flowerCakeThanksImg.svg';
export { default as PerfumeCakeThanksImg } from '../images/cakes/perfumeCakeThanksImg.svg';
export { default as PoopCakeThanksImg } from '../images/cakes/poopCakeThanksImg.svg';
export { default as SushiCakeThanksImg } from '../images/cakes/sushiCakeThanksImg.svg';
export { default as VitaminCakeThanksImg } from '../images/cakes/vitaminCakeThanksImg.svg';

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
