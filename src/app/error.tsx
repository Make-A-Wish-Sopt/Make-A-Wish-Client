'use client';

import Button from '@/components/Common/Button';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { RoutePathType, useRouters } from '@/hooks/common/useRouters';
import Image from 'next/image';
import { MainCakeImg } from '../../public/assets/images';

export default function ErrorPage({
  alertMessage,
  routePath = '/',
  btnMessage = '홈으로 이동하기',
}: {
  alertMessage?: string;
  routePath?: RoutePathType;
  btnMessage?: string;
}) {
  const { handleRouter } = useRouters();

  return (
    <>
      <main className="w-full h-svh flex flex-col justify-center items-center px-22 min-w-375 max-w-500">
        <Image src={MainCakeImg} alt="메인케이크 이미지" width={200} />

        <h1 className="font-bitbit text-main_blue text-[100px]">ERROR</h1>
        <p className="font-bitbit text-white text-[25px]">{alertMessage}</p>

        <FixedBottomButtonWrapper>
          <Button
            onClick={() => {
              handleRouter(routePath);
            }}
          >
            {btnMessage}
          </Button>
        </FixedBottomButtonWrapper>
      </main>
    </>
  );
}
