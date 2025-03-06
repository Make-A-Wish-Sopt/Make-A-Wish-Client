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
  isError = true,
}: {
  alertMessage?: string;
  routePath?: RoutePathType;
  btnMessage?: string;
  isError?: boolean;
}) {
  const { handleRouter } = useRouters();

  return (
    <>
      <main className="w-full h-svh flex flex-col justify-center items-center px-22  ">
        <div className="flex flex-col items-center justify-center w-375 h-full">
          <Image src={MainCakeImg} alt="메인케이크 이미지" width={200} />

          {isError && <h1 className="font-bitbit text-main_blue text-[100px]">ERROR</h1>}
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
        </div>
      </main>
    </>
  );
}
