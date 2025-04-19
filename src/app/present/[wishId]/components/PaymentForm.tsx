'use client';

import { useFunnelContext } from '@/Context/FunnelContext';
import React from 'react';
import { presentListObject } from '@/constant/model/present';
import Image from 'next/image';
import convertMoneyText from '@/utils/regex';
import useBoolean from '@/hooks/useBoolean';
import Button from '@/components/Elements/Button';
import { Step } from '@/components/Modules/Funnel';
import { BeefCakeImg, MainCakeImg } from '@public/assets/images';
import { TransferInfoType } from '@/types/wishesType';
import { postPublicCakes } from '@/api/public';
import { useParams } from 'next/navigation';
import { AccountCopySpeechBubbleIc } from '@public/assets/icons';
import clipboardCopy from '@/utils/clipboardCopy';
import { paymentListArray, paymentListObject } from '@/constant/bankList';
import InputForm from '@/components/UI/InputForm';
import { PresentFunnelStepType } from '@/constant/funnelStep';
import { toast } from 'sonner';
import { PresentFormSchemaType } from '@/Schema/present.schema';
import { useFetch } from '@/hooks/useFetch';
import { LoadingCake } from '@/components/UI/Loading';

function KakaopayCodePayment({
  송금할친구이름,
  송금금액,
  transferInfo,
}: {
  송금할친구이름: string;
  송금금액: string;
  transferInfo: TransferInfoType;
}) {
  const { wishId } = useParams();
  const { nextStep, getSharedData } = useFunnelContext<PresentFunnelStepType>();
  const presentFormData = getSharedData('present') as PresentFormSchemaType;
  const { status, delayFetchData, LoadingModal } = useFetch(postPublicCakes);

  const clickYet = useBoolean(true);

  const 최초은행앱연결실행확인 = () => {
    if (!clickYet.state) return;

    clickYet.changeState(false);
  };

  async function onLinkKakaopayApp() {
    최초은행앱연결실행확인();

    if (!송금금액) return;
    if (!transferInfo.kakaoPayCode) return;

    const { forPayCode, kakaoPayCode } = transferInfo;

    if (forPayCode) {
      await clipboardCopy(convertMoneyText(송금금액), '금액복사 성공!');
      window.open(kakaoPayCode);
    }
  }

  const handleNextClick = () => {
    if (status === 'loading') return;

    최초은행앱연결실행확인();

    delayFetchData(1000, { ...presentFormData, wishId: wishId as string });
    nextStep();
  };

  return (
    <div className="flex flex-col  items-center w-full font-bitbit text-white text-[24px]">
      <Image src={BeefCakeImg} alt="케이크 이미지" width={121} className="mt-120" />
      <p>{`${송금할친구이름}님에게`}</p>
      <p className="text-main_blue text-[50px] leading-none">{`${convertMoneyText(송금금액) || 0}원`}</p>
      <p>송금하기</p>

      <Step.ButtonWrapper vertical fixedBottom className="gap-10">
        <Button onClick={() => onLinkKakaopayApp()}>카카오페이 송금하기</Button>

        <Button
          disabled={clickYet.state}
          bgColor={(!clickYet.state && 'gray4') || 'main_blue'}
          fontColor={(!clickYet.state && 'white') || 'black'}
          onClick={handleNextClick}
        >
          송금 완료했다면 편지 확인하기
        </Button>
      </Step.ButtonWrapper>
      <LoadingModal render={<LoadingCake text="선물 중" />} />
    </div>
  );
}

function AccountDepositPayment({
  송금할친구이름,
  송금금액,
  transferInfo,
}: {
  송금할친구이름: string;
  송금금액: string;
  transferInfo: TransferInfoType;
}) {
  const { wishId } = useParams();

  const { nextStep, getSharedData } = useFunnelContext<PresentFunnelStepType>();
  const presentFormData = getSharedData('present') as PresentFormSchemaType;
  const { status, delayFetchData, LoadingModal } = useFetch(postPublicCakes);

  const clickYet = useBoolean(true);

  const 계좌번호복사하기 = async () => {
    if (!transferInfo?.accountInfo) return;

    const { accountInfo } = transferInfo;

    const 계좌정보 = `${accountInfo.account} ${accountInfo.bank}`;

    await clipboardCopy(계좌정보, `${계좌정보} 계좌를 복사했어요!`);
  };

  const handleNextButtonClick = () => {
    if (status === 'loading') return;

    delayFetchData(1000, { ...presentFormData, wishId: wishId as string });
    nextStep();
  };

  const 최초은행앱연결실행확인 = () => {
    if (!clickYet.state) return;

    clickYet.changeState(false);
  };

  const handleDeepLink = (paymentId: number) => {
    if (!paymentId) return;

    const ua = navigator.userAgent.toLowerCase();

    if (paymentListObject[paymentId].name === '토스뱅크') {
      window.open('supertoss://toss/pay');

      setTimeout(() => {
        window.open(
          ua.indexOf('android') > -1
            ? 'https://play.google.com/store/apps/details?id=viva.republica.toss'
            : 'https://apps.apple.com/app/id839333328',
        );
      }, 2000);
    }

    if (paymentListObject[paymentId].name === '카카오뱅크') {
      window.open('kakaobank://');

      setTimeout(() => {
        window.open(
          ua.indexOf('android') > -1
            ? 'https://play.google.com/store/apps/details?id=com.kakaobank.channel'
            : 'https://apps.apple.com/app/id1258016944',
        );
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full text-white font-bitbit">
      <span className="text-[24px] mt-54 ">{`${송금할친구이름}님에게`}</span>
      <span className="text-main_blue text-[50px] leading-none">{`${convertMoneyText(송금금액)}원`}</span>
      <span className="text-[24px] ">송금하기</span>
      <div className="relative mt-62">
        <Image
          src={AccountCopySpeechBubbleIc}
          alt="계좌번호 복사 아이콘"
          className="animate-bounce absolute -top-[50px]  z-10"
          style={{
            animation: 'bounce 1.3s ease-in-out infinite',
          }}
        />
        <button type="button" onClick={() => 계좌번호복사하기()}>
          <Image
            className="duration-300 transition-all "
            src={MainCakeImg}
            alt="계좌번호 복사하기 이미지"
            width={128}
            style={{
              animation: 'growShrink 1s ease-out infinite',
            }}
          />
          <style jsx>{`
            @keyframes growShrink {
              0% {
                transform: scale(1);
              }

              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          `}</style>
        </button>
      </div>

      <div className="w-full">
        <InputForm title="송금수단으로 이동하기" textCenter>
          <ul className="flex gap-8">
            {paymentListArray.map((paymentItem) => (
              <li key={paymentItem.id} className="w-full">
                <button
                  type="button"
                  className="flex flex-col gap-10 items-center justify-center w-full h-92 rounded-xl bg-dark_green cursor-pointer"
                  onClick={() => {
                    handleDeepLink(paymentItem.id);
                    최초은행앱연결실행확인();
                  }}
                >
                  <Image src={paymentItem.bankIconImg} alt="은행 로고 이미지" />
                  <span className="font-galmuri text-[14px]">{paymentItem.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </InputForm>
      </div>

      <Step.ButtonWrapper fixedBottom>
        <Button disabled={clickYet.state} onClick={() => handleNextButtonClick()}>
          {clickYet.state ? '송금하고, 편지 확인하기' : '송금 완료했어요!'}
        </Button>
      </Step.ButtonWrapper>
      <LoadingModal render={<LoadingCake text="선물 중" />} />
    </div>
  );
}

export default function PaymentForm({
  transferInfo,
  nickname,
}: {
  transferInfo: TransferInfoType;
  nickname: string;
}) {
  const { getSharedData, onMoveStep } = useFunnelContext<PresentFunnelStepType>();
  if (!transferInfo) {
    return <div>해당 유저는 편지만 받길 원해요!</div>;
  }

  const { forPayCode } = transferInfo;
  const presentFormData = getSharedData('present');

  if (!presentFormData) {
    toast.error('선물정보를 먼저 입력해주세요!');
    onMoveStep('present');
  }

  const { giftMenuId } = getSharedData('present') as PresentFormSchemaType;

  const presentPrice = giftMenuId > 0 ? presentListObject[giftMenuId].price.toString() : '0';

  return forPayCode ? (
    <KakaopayCodePayment
      송금할친구이름={nickname}
      송금금액={presentPrice}
      transferInfo={transferInfo}
    />
  ) : (
    <AccountDepositPayment
      송금할친구이름={nickname}
      송금금액={presentPrice}
      transferInfo={transferInfo}
    />
  );
}
