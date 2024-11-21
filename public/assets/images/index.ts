export { default as MainCakeImg } from '../images/mainCakeImg.png';
export { default as MainCakeListImg } from '../images/mainCakeListImg.png';

export { default as AccountCopyCakeImg } from '../images/AccountCopyCakeImg.png';

//생일선물을 주는 사람이 선택하는 선물 아이템 이미지
export { default as PresentItem1Img } from './presentItem/presentItem1Img.png';
export { default as PresentItem2Img } from './presentItem/presentItem2Img.png';
export { default as PresentItem3Img } from './presentItem/presentItem3Img.png';
export { default as PresentItem4Img } from './presentItem/presentItem4Img.png';
export { default as PresentItem5Img } from './presentItem/presentItem5Img.png';
export { default as PresentItem6Img } from './presentItem/presentItem6Img.png';

export { default as MypageDefaultCakeImg } from '../images/mypageDefaultCakeImg.png';

// cake
export { default as MainEndCakeImg } from '../images/mainEndCakeImg.png';

// SNS share
export { default as ShareKaKaoLogoImg } from '../images/sns/kakaoLogoImg.svg';
export { default as ShareInstaLogoImg } from '../images/sns/instaLogoImg.svg';
export { default as ShareFacebookLogoImg } from '../images/sns/facebookLogoImg.svg';
export { default as ShareTwitterLogoImg } from '../images/sns/twitterLogoImg.svg';

//케이크 트리 관련 이미지
export { default as CakeDishTopRibbonImg } from '../images/cakeDishTopRibbonImg.png';
export { default as WishesCreateDefaultImg } from '../images/wishesCreateDefaultImg.png';

// 트리에 올라가는 케이크 이미지
export { default as AdminCakeImg } from './CakeList/AdminCakeImg.png';
export { default as BeefCakeImg } from './CakeList/BeefCakeImg.png';
export { default as ChickenCakeImg } from './CakeList/ChickenCakeImg.png';
export { default as FlowerCakeImg } from './CakeList/FlowerCakeImg.png';
export { default as LpCakeImg } from './CakeList/LpCakeImg.png';
export { default as PerfumeCakeImg } from './CakeList/PerfumeCakeImg.png';
export { default as RudolphCakeImg } from './CakeList/RudolphCakeImg.png';
export { default as SantaCakeImg } from './CakeList/SantaCakeImg.png';
export { default as SnowCakeImg } from './CakeList/SnowCakeImg.png';
export { default as SushiCakeImg } from './CakeList/SushiCakeImg.png';
export { default as VitaminCakeImg } from './CakeList/VitaminCakeImg.png';
export { default as CoffeeCakeImg } from './CakeList/CoffeeCakeImg.png';
export { default as DdongCakeImg } from './CakeList/DdongCakeImg.png';

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
