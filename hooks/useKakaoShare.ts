
export const useKakaoShare = (nickname: string, link: string) => {
  if (window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${nickname}님이 받고싶어 하는 생일 선물은?`,
        description:
          '#마음은 가볍게, 선물은 무겁게 #부담없는 생일 펀딩 플랫폼 #조물주보다 생일선물주',
        imageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
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
  }
};
