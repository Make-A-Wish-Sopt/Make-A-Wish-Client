'use client';

import { ReactNode } from 'react';
import Button from '@/components/Elements/Button';
import ItemWrapper from '@/components/Elements/Button/FixedBottomButton';
import { RoutePathType, useRouters } from '@/hooks/useRouters';
import Image from 'next/image';
import { MainCakeImg } from '../../public/assets/images';

export default function ErrorPage({
  alertMessage,
  routePath = '/',
  btnMessage = '홈으로 이동하기',
  errorText = 'ERROR',
  isError = true,
}: {
  alertMessage: string;
  routePath?: RoutePathType;
  btnMessage?: string;
  errorText?: ReactNode;
  isError?: boolean;
}) {
  const { handleRouter } = useRouters();

  return (
    <main className="w-full h-svh flex flex-col justify-center items-center px-22  ">
      <div className="flex flex-col items-center justify-center w-375 h-full">
        <Image src={MainCakeImg} alt="메인케이크 이미지" width={200} />

        {isError && <h1 className="font-bitbit text-main_blue text-[100px]">{errorText}</h1>}
        <p className="font-bitbit text-white text-[25px] text-center whitespace-pre leading-none">
          {alertMessage}
        </p>

        <ItemWrapper fixedBottom className="gap-10">
          <Button
            onClick={() => {
              handleRouter(routePath);
            }}
          >
            {btnMessage}
          </Button>
        </ItemWrapper>
      </div>
    </main>
  );
}
