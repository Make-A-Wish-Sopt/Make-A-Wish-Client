import { StaticImageData } from 'next/image';
import {
  ShareFacebookLogoImg,
  ShareInstaLogoImg,
  ShareKaKaoLogoImg,
  ShareTwitterLogoImg,
} from '../../../public/assets/images';

type ShareSnskeyType = 'kakao' | 'instagram' | 'meta' | 'x';
type SnsDataType = {
  name: string;
  image: StaticImageData;
  onClick: (link?: string, name?: string) => void;
};

export const snsShareListObject: Record<ShareSnskeyType, SnsDataType> = {
  kakao: {
    name: '카카오',
    image: ShareKaKaoLogoImg,
    onClick: (link: string, name: string) => {
      if (typeof window !== 'undefined' && window.Kakao?.isInitialized()) {
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `${name}님의 생일선물을 고민하고 있다면?`,
            description: `고민할 필요없이 이 귀여운 케이크를 선물해 ${name}님의 생일 펀딩에 참여해보세요!`,
            imageUrl: 'https://ifh.cc/g/wWJNBF.jpg',
            link: {
              mobileWebUrl: link,
              webUrl: link,
            },
          },
          buttons: [
            {
              title: '자세히 보기',
              link: {
                mobileWebUrl: link,
                webUrl: link,
              },
            },
          ],
        });
      } else {
        console.error('Kakao SDK is not initialized.');
      }
    },
  },
  instagram: {
    name: '인스타그램',
    image: ShareInstaLogoImg,
    onClick: () => {
      window.open(`https://instagram.com`);
    },
  },
  meta: {
    name: '메타',
    image: ShareFacebookLogoImg,
    onClick: (link: string) => {
      const hashtag = encodeURIComponent(`#조물주보다생일선물주`);

      window.open(`http://www.facebook.com/sharer/sharer.php?u=${link}&hashtag=${hashtag}`);
    },
  },
  x: {
    name: '엑스',
    image: ShareTwitterLogoImg,
    onClick: (link: string, name: string) => {
      const text = encodeURIComponent(
        `${name}님의 생일선물을 고민하고 있다면?\n고민할 필요없이 이 귀여운 케이크를 선물해 ${name}님의 생일 펀딩에 참여해보세요! \n`,
      );
      window.open(`https://twitter.com/intent/tweet?text=${text + link}`);
    },
  },
};

export const snsShareListArray = Object.values(snsShareListObject);
