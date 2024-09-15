// export default function useKakaoShare(nickname: string, link: string) {
//   if (window.Kakao) {
//     window.Kakao.Share.sendDefault({
//       objectType: 'feed',
//       content: {
//         title: `${nickname}님의 생일선물을 고민하고 있다면?`,
//         description: `고민할 필요없이 이 귀여운 케이크를 선물해 ${nickname}님의 생일 펀딩에 참여해보세요!`,
//         imageUrl: 'https://ifh.cc/g/wWJNBF.jpg',
//         link: {
//           mobileWebUrl: link,
//           webUrl: link,
//         },
//       },
//       buttons: [
//         {
//           title: '자세히 보기',
//           link: {
//             mobileWebUrl: link,
//             webUrl: link,
//           },
//         },
//       ],
//     });
//   }
// }
