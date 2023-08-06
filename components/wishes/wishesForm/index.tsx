import InputHeader from '@/components/common/inputHeader';
import WishesStep1 from './WishesStep1';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { BackBtnIc, WishesFormPresentIc } from '@/public/assets/icons';
import Image from 'next/image';
import useWishesStep from '@/hooks/wishes/useWisehsStep';
import WishesStep2 from './WisehsStep2';
import Preview from './Preview';
import BankInfo from './BankInfo';
import { useRouter } from 'next/router';

export default function WishesFormContainer() {
  const { stepIndex, handleNextStep, handlePrevStep } = useWishesStep();
  const router = useRouter();

  const handleBackBtnClick = () => {
    stepIndex === 1 ? router.back() : handlePrevStep();
  };

  return (
    <Styled.Container>
      <>
        {/* Header */}
        <InputHeader>
          <Image
            src={BackBtnIc}
            alt="뒤로가기"
            style={{ cursor: 'pointer' }}
            onClick={handleBackBtnClick}
          ></Image>
        </InputHeader>

        {/* Title */}
        <Styled.TitleWrapper>
          <Image src={WishesFormPresentIc} alt="선물 이미지" />
          {
            {
              1: <Styled.Title>소원링크 생성하기</Styled.Title>,
              2: <Styled.Title>소원링크 생성하기</Styled.Title>,
              3: <Styled.Title>소원링크 화면 미리보기</Styled.Title>,
              4: <Styled.Title>계좌번호 입력하기</Styled.Title>,
            }[stepIndex]
          }
        </Styled.TitleWrapper>

        {
          {
            1: <WishesStep1 handleNextStep={handleNextStep} />,
            2: <WishesStep2 handleNextStep={handleNextStep} />,
            3: <Preview handleNextStep={handleNextStep} />,
            4: <BankInfo />,
          }[stepIndex]
        }
      </>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};

    margin-left: 1rem;
  `,

  TitleWrapper: styled.div`
    display: flex;

    height: 2.4rem;

    margin: 2.4rem 0 2rem;
  `,
};
