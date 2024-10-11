export { default as MainLoginImg } from '../images/mainLoginImg.png';
export { default as MainCakeImg } from '../images/mainCakeImg.png';
export { default as LogoImg } from '../images/logoImg.svg';
export { default as MainPageCakeImg } from '../images/mainPageCakeImg.png';
export { default as MainCakeListImg } from '../images/mainCakeListImg.png';

//생일선물을 주는 사람이 선택하는 선물 아이템 이미지
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

// SNS share
export { default as KaKaoLogoImg } from '../images/sns/kakaoLogoImg.svg';
export { default as InstaLogoImg } from '../images/sns/instaLogoImg.svg';
export { default as FacebookLogoImg } from '../images/sns/facebookLogoImg.svg';
export { default as TwitterLogoImg } from '../images/sns/twitterLogoImg.svg';

//케이크 트리 관련 이미지
export { default as CakeDishTopRibbonImg } from '../images/cakeDishTopRibbonImg.png';
export { default as WishesCreateDefaultImg } from '../images/wishesCreateDefaultImg.png';

// 트리에 올라가는 케이크 이미지
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

//자신을 대표하는 아바타 케이크 이미지
export { default as BeefCakeAvatarImg } from '../images/AvatarCakeList/BeefCakeAvatarImg.png';
export { default as ChickenCakeAvatarImg } from '../images/AvatarCakeList/ChickenCakeAvatarImg.png';
export { default as FlowerCakeAvatarImg } from '../images/AvatarCakeList/FlowerCakeAvatarImg.png';
export { default as LpCakeAvatarImg } from '../images/AvatarCakeList/LpCakeAvatarImg.png';
export { default as PerfumeCakeAvatarImg } from '../images/AvatarCakeList/PerfumeCakeAvatarImg.png';
export { default as RudolphCakeAvatarImg } from '../images/AvatarCakeList/RudolphCakeAvatarImg.png';
export { default as SantaCakeAvatarImg } from '../images/AvatarCakeList/SantaCakeAvatarImg.png';
export { default as SnowCakeAvatarImg } from '../images/AvatarCakeList/SnowCakeAvatarImg.png';
export { default as SushiCakeAvatarImg } from '../images/AvatarCakeList/SushiCakeAvatarImg.png';
export { default as VitaminCakeAvatarImg } from '../images/AvatarCakeList/VitaminCakeAvatarImg.png';
export { default as CoffeeCakeAvatarImg } from '../images/AvatarCakeList/CoffeeCakeAvatarImg.png';
export { default as DdongCakeAvatarImg } from '../images/AvatarCakeList/DdongCakeAvatarImg.png';

export { default as SharePageCakeImg } from '../images/SharePageCakeImg.png';

// bank
const bankImgs: Record<string, any> = {};
for (let i = 1; i <= 33; i++) {
  bankImgs[`bank${i}Img`] = require(`../images/bankLogo/bank${i}Img.svg`).default;
}

export default bankImgs;
