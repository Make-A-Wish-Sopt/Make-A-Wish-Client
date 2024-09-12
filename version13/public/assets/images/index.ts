//명명규칙 : 1. 첫글자는 대문자 2. ~~Img으로 끝내기
export { default as MainLoginImg } from '../images/mainLoginImg.png';
export { default as MainCakeImg } from '../images/mainCakeImg.png';
export { default as LogoImg } from '../images/logoImg.svg';
export { default as MainPageCakeImg } from '../images/mainPageCakeImg.png';

export { default as BeefCakeDetailImg } from '../images/cakes/beefCake/beefCakeDetailImg.png';
export { default as ChickenCakeDetailImg } from '../images/cakes/chickenCake/chickenCakeDetailImg.png';
export { default as CoffeeCakeDetailImg } from '../images/cakes/coffeeCake/coffeeCakeDetailImg.png';
export { default as FlowerCakeDetailImg } from '../images/cakes/flowerCake/flowerCakeDetailImg.png';
export { default as PerfumeCakeDetailImg } from '../images/cakes/perfumeCake/perfumeCakeDetailImg.png';
export { default as PoopCakeDetailImg } from '../images/cakes/poopCake/poopCakeDetailImg.png';
export { default as SushiCakeDetailImg } from '../images/cakes/sushiCake/sushiCakeDetailImg.png';
export { default as VitaminCakeDetailImg } from '../images/cakes/vitaminCake/vitaminCakeDetailImg.png';
export { default as RudolphCakeDetailImg } from '../images/cakes/rudolphCake/rudolphCakeDetailImg.png';

export { default as BeefCakeImg } from '../images/cakes/beefCake/beefCakeImg.svg';
export { default as ChickenCakeImg } from '../images/cakes/chickenCake/chickenCakeImg.svg';
export { default as CoffeeCakeImg } from '../images/cakes/coffeeCake/coffeeCakeImg.svg';
export { default as FlowerCakeImg } from '../images/cakes/flowerCake/flowerCakeImg.svg';
export { default as PerfumeCakeImg } from '../images/cakes/perfumeCake/perfumeCakeImg.svg';
export { default as PoopCakeImg } from '../images/cakes/poopCake/poopCakeImg.svg';
export { default as SushiCakeImg } from '../images/cakes/sushiCake/sushiCakeImg.svg';
export { default as VitaminCakeImg } from '../images/cakes/vitaminCake/vitaminCakeImg.svg';
export { default as RudolphCakeImg } from '../images/cakes/rudolphCake/rudolphCakeImg.svg';

export { default as BeefCakeThanksImg } from '../images/cakes/beefCake/beefCakeThanksImg.svg';
export { default as ChickenCakeThanksImg } from '../images/cakes/chickenCake/chickenCakeThanksImg.svg';
export { default as CoffeeCakeThanksImg } from '../images/cakes/coffeeCake/coffeeCakeThanksImg.svg';
export { default as FlowerCakeThanksImg } from '../images/cakes/flowerCake/flowerCakeThanksImg.svg';
export { default as PerfumeCakeThanksImg } from '../images/cakes/perfumeCake/perfumeCakeThanksImg.svg';
export { default as PoopCakeThanksImg } from '../images/cakes/poopCake/poopCakeThanksImg.svg';
export { default as SushiCakeThanksImg } from '../images/cakes/sushiCake/sushiCakeThanksImg.svg';
export { default as VitaminCakeThanksImg } from '../images/cakes/vitaminCake/vitaminCakeThanksImg.svg';
export { default as RudolphCakeThanksImg } from '../images/cakes/rudolphCake/rudolphCakeThanksImg.svg';

export { default as BeefCakeSmallImg } from '../images/cakes/beefCake/beefCakeSmallImg.svg';
export { default as ChickenCakeSmallImg } from '../images/cakes/chickenCake/chickenCakeSmallImg.svg';
export { default as CoffeeCakeSmallImg } from '../images/cakes/coffeeCake/coffeeCakeSmallImg.svg';
export { default as FlowerCakeSmallImg } from '../images/cakes/flowerCake/flowerCakeSmallImg.svg';
export { default as PerfumeCakeSmallImg } from '../images/cakes/perfumeCake/perfumeCakeSmallImg.svg';
export { default as PoopCakeSmallImg } from '../images/cakes/poopCake/poopCakeSmallImg.svg';
export { default as SushiCakeSmallImg } from '../images/cakes/sushiCake/sushiCakeSmallImg.svg';
export { default as VitaminCakeSmallImg } from '../images/cakes/vitaminCake/vitaminCakeSmallImg.svg';
export { default as RudolphCakeSmallImg } from '../images/cakes/rudolphCake/rudolphCakeSmallImg.svg';

export { default as GuideBoxImg } from '../images/guideBoxImg.svg';
export { default as GuideContentImg } from '../images/guideContentImg.svg';
export { default as BorderImg } from '../images/borderImg.svg';

// cake
export { default as MainEndCakeImg } from '../images/mainEndCakeImg.png';
export { default as LinkBeefCakeImg } from '../images/linkBeefCakeImg.png';
export { default as MypageCakeImg } from '../images/mypageCakeImg.png';

// chat
export { default as MainChatImg } from '../images/chat/mainPageChatImg.svg';
export { default as MainWishChatImg } from '../images/chat/mainWishChatImg.svg';
export { default as MainEndChatImg } from '../images/chat/mainEndChatImg.svg';
export { default as ShareChatImg } from '../images/chat/sharePageChatImg.svg';
export { default as LinksPageChatImg } from '../images/chat/linksPageChatImg.svg';

// shopping website
export { default as TwentynineLogoImg } from '../images/shop/twentynineLogoImg.svg';
export { default as NaverShoppingLogoImg } from '../images/shop/naverShoppingLogoImg.svg';

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
