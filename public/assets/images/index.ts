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

export { default as BeefCakeSmallImg } from '../images/cakes/beefCakeSmallImg.svg';
export { default as ChickenCakeSmallImg } from '../images/cakes/chickenCakeSmallImg.svg';
export { default as CoffeeCakeSmallImg } from '../images/cakes/coffeeCakeSmallImg.svg';
export { default as FlowerCakeSmallImg } from '../images/cakes/flowerCakeSmallImg.svg';
export { default as PerfumeCakeSmallImg } from '../images/cakes/perfumeCakeSmallImg.svg';
export { default as PoopCakeSmallImg } from '../images/cakes/poopCakeSmallImg.svg';
export { default as SushiCakeSmallImg } from '../images/cakes/sushiCakeSmallImg.svg';
export { default as VitaminCakeSmallImg } from '../images/cakes/vitaminCakeSmallImg.svg';

export { default as GaugeBarImg } from '../images/gaugeBarImg.svg';
export { default as GuideBoxImg } from '../images/guideBoxImg.svg';
export { default as GuideContentImg } from '../images/guideContentImg.svg';
export { default as BorderImg } from '../images/borderImg.svg';

// cake
export { default as PillCakeImg } from '../images/pillCakeImg.svg';
export { default as MypageCakeImg } from '../images/myPageCakeImg.svg';
export { default as MypageChatImg } from '../images/myPageChatImg.svg';
export { default as ShareChatImg } from '../images/sharePageChatImg.svg';
export { default as MainChatImg } from '../images/mainPageChatImg.svg';
export { default as WishesChatImg } from '../images/wishesChatImg.svg';
export { default as DeleteModalCake } from '../images/deleteModalCake.svg';
export { default as LinkPageCake } from '../images/linkPageCake.svg';
export { default as SharePageCake } from '../images/sharePageCake.svg';
export { default as LoginPageImg } from '../images/loginPageImg.svg';


// shopping website
export { default as TwentynineLogoImg } from '../images/shop/twentynineLogoImg.svg';
export { default as CoupangLogoImg } from '../images/shop/coupangLogoImg.svg';

// SNS share
export { default as KaKaoLogoImg } from '../images/sns/kakaoLogoImg.svg';
export { default as InstaLogoImg } from '../images/sns/instaLogoImg.svg';
export { default as FacebookLogoImg } from '../images/sns/facebookLogoImg.svg';
export { default as TwitterLogoImg } from '../images/sns/twitterLogoImg.svg';

// bank
const bankImgs: Record<string, any> = {};
for (let i = 1; i <= 33; i++) {
  bankImgs[`bank${i}Img`] = require(`../images/bankLogo/bank${i}Img.svg`).default;
}

export default bankImgs;
