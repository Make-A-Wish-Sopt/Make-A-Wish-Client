import { PublicWishesDataType } from '@/types/api/response';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { CakeItemType, defaultCakeListData } from '@/constant/model/cakes';
import { CakesTree } from '@/components/UI/CakeTree';

export async function WishesMessageToCreateUser({
  publicWishesData,
}: {
  publicWishesData?: PublicWishesDataType;
}) {
  const { nickName } = await getLoginUserCookiesData();

  return (
    <>
      <div className="text-[24px] font-bitbit text-center text-white mt-10 whitespace-pre-wrap">
        {publicWishesData ? (
          <span className="transition-opacity duration-500 opacity-100 leading-tight"></span>
        ) : (
          <span className="transition-opacity duration-500 opacity-100 leading-tight">{`${
            nickName ? nickName : 'ㅇㅇ'
          }님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</span>
        )}
      </div>
    </>
  );
}

export async function CakesMessageTree({
  receivedCakeList,
}: {
  receivedCakeList?: CakeItemType[];
}) {
  return <CakesTree cakeList={receivedCakeList || defaultCakeListData} />;
}
