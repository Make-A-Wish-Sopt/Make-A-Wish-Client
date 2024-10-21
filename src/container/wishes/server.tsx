import { PublicWishesDataType } from '@/types/api/response';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export async function WishesMessageToCreateUser({
  publicWishesData,
  cakeMessageOnlyOne,
}: {
  publicWishesData?: PublicWishesDataType;
  cakeMessageOnlyOne: boolean;
}) {
  const { nickName } = (await getLoginUserCookiesData()) || { nickName: '' };

  return (
    <>
      <div className="text-[24px] font-bitbit text-center text-white mt-10 whitespace-pre-wrap">
        {publicWishesData ? (
          <span className="transition-opacity duration-500 opacity-100 leading-tight">
            {cakeMessageOnlyOne
              ? `저희가 ${publicWishesData.name}님의 생일을\n축하하며 편지를 남겼어요!`
              : `${publicWishesData.name}님의 생일잔치에\n도착한 케이크들이에요!`}
          </span>
        ) : (
          <span className="transition-opacity duration-500 opacity-100 leading-tight">{`${
            nickName ? nickName : 'ㅇㅇ'
          }님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</span>
        )}
      </div>
    </>
  );
}
