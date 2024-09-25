//명명규칙 : 1. 첫글자는 대문자 2. ~~Img으로 끝내기
export { default as MainLoginImg } from '../images/mainLoginImg.png';
export { default as MainCakeImg } from '../images/mainCakeImg.png';
export { default as LogoImg } from '../images/logoImg.svg';
export { default as MainPageCakeImg } from '../images/mainPageCakeImg.png';
export { default as MainCakeListImg } from '../images/mainCakeListImg.png';

//PresentItem
export { default as PresentItem1Img } from './presentItem/presentItem1Img.png';
export { default as PresentItem2Img } from './presentItem/presentItem2Img.png';
export { default as PresentItem3Img } from './presentItem/presentItem3Img.png';
export { default as PresentItem4Img } from './presentItem/presentItem4Img.png';
export { default as PresentItem5Img } from './presentItem/presentItem5Img.png';
export { default as PresentItem6Img } from './presentItem/presentItem6Img.png';

export { default as MypageDefaultCakeImg } from '../images/mypageDefaultCakeImg.png';

export { default as GuideBoxImg } from '../images/guideBoxImg.svg';
export { default as GuideContentImg } from '../images/guideContentImg.svg';
export { default as BorderImg } from '../images/borderImg.svg';

// cake
export { default as MainEndCakeImg } from '../images/mainEndCakeImg.png';
export { default as LinkBeefCakeImg } from '../images/linkBeefCakeImg.png';

// chat
export { default as MainChatImg } from '../images/chat/mainPageChatImg.svg';
export { default as MainWishChatImg } from '../images/chat/mainWishChatImg.svg';
export { default as MainEndChatImg } from '../images/chat/mainEndChatImg.svg';
export { default as ShareChatImg } from '../images/chat/sharePageChatImg.svg';
export { default as LinksPageChatImg } from '../images/chat/linksPageChatImg.svg';

// SNS share
export { default as KaKaoLogoImg } from '../images/sns/kakaoLogoImg.svg';
export { default as InstaLogoImg } from '../images/sns/instaLogoImg.svg';
export { default as FacebookLogoImg } from '../images/sns/facebookLogoImg.svg';
export { default as TwitterLogoImg } from '../images/sns/twitterLogoImg.svg';

export { default as CakeDishTopRibbonImg } from '../images/cakeDishTopRibbonImg.png';
export { default as WishesCreateDefaultImg } from '../images/wishesCreateDefaultImg.png';

// New Cake List
export { default as BeefCakeImg } from './CakeList/beefCakeImg.png';
export { default as ChickenCakeImg } from './CakeList/chickenCakeImg.png';
export { default as FlowerCakeImg } from './CakeList/flowerCakeImg.png';
export { default as LpCakeImg } from './CakeList/lpCakeImg.png';
export { default as PerfumeCakeImg } from './CakeList/perfumeCakeImg.png';
export { default as RudolphCakeImg } from './CakeList/rudolphCakeImg.png';
export { default as SantaCakeImg } from './CakeList/santaCakeImg.png';
export { default as SnowCakeImg } from './CakeList/snowCakeImg.png';
export { default as SushiCakeImg } from './CakeList/sushiCakeImg.png';
export { default as VitaminCakeImg } from './CakeList/vitaminCakeImg.png';
export { default as CoffeeCakeImg } from './CakeList/coffeeCakeImg.png';
export { default as DdongCakeImg } from './CakeList/ddongCakeImg.png';

// New Cake List
export { default as BeefCakeSelectImg } from '../images/CakeSelectList/beefCakeSelectImg.svg';
export { default as ChickenCakeSelectImg } from '../images/CakeSelectList/chickenCakeSelectImg.svg';
export { default as FlowerCakeSelectImg } from '../images/CakeSelectList/flowerCakeSelectImg.svg';
export { default as LpCakeSelectImg } from '../images/CakeSelectList/lpCakeSelectImg.svg';
export { default as PerfumeCakeSelectImg } from '../images/CakeSelectList/perfumeCakeSelectImg.svg';
export { default as RudolphCakeSelectImg } from '../images/CakeSelectList/rudolphCakeSelectImg.svg';
export { default as SantaCakeSelectImg } from '../images/CakeSelectList/santaCakeSelectImg.svg';
export { default as SnowCakeSelectImg } from '../images/CakeSelectList/snowCakeSelectImg.svg';
export { default as SushiCakeSelectImg } from '../images/CakeSelectList/sushiCakeSelectImg.svg';
export { default as VitaminCakeSelectImg } from '../images/CakeSelectList/vitaminCakeSelectImg.svg';

// bank
const bankImgs: Record<string, any> = {};
for (let i = 1; i <= 33; i++) {
  bankImgs[`bank${i}Img`] = require(`../images/bankLogo/bank${i}Img.svg`).default;
}

export default bankImgs;
