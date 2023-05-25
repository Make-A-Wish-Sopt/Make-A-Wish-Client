export const sendKakaoMessage = (nickname: string) => {
  const shareUrl = `https://developers.kakao.com/`;

  if (window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${nickname}님이 받고싶어 하는 생일 선물은? `,
        description: '조물주보다 생일선물주는 생일 선물을 주는 사람과 받는 사람, 모두의 부담을 덜어주는 선물 편딩 플랫폼입니다.',
        imageUrl: "https://example.com/pill-cake-image.jpg",
        link: {
          webUrl: shareUrl,
        },
      },
      buttonTitle: '웹으로 이동',
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            webUrl: shareUrl,
          },
        },
      ],
    });
  }
};
