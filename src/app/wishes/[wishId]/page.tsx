import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header, { MypageButton } from '@/components/Elements/Header';

import MainLayout from '@/layouts/MainLayout';
import SelectAvatarCakesButton from './_components/SelectAvatarCakes';
import { DefaultResponseType } from '@/types/api/response';

export default async function WishesIdPage({ params }: { params: { wishId: string } }) {
  const { wishId } = params;

  const publicProgressWishes = await getPublicWishes(wishId);

  if (!publicProgressWishes.success) {
    const errorResonse = publicProgressWishes.data as DefaultResponseType;
    return <ErrorPage alertMessage={`${errorResonse.message}`} isError={false} />;
  }

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />}>
      <section className="flex flex-col items-center">
        <HeroContent />
        <SelectAvatarCakesButton wishId={wishId} />
      </section>
    </MainLayout>
  );
}

const HeroContent = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[56px] text-main_blue mt-10 font-bitbit leading-none">
        조물주보다 <br />
        생일선물주
      </h1>

      <span className="font-galmuri text-white text-[18px] text-center mt-20 mb-6">
        당신을 대표할
        <br /> 케이크를 고른 후, 입장해주세요!
      </span>
    </div>
  );
};
