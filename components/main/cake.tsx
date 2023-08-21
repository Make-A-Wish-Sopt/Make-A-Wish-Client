import styled, { css } from 'styled-components';
import theme from '@/styles/theme';
import router from 'next/router';
import Image from 'next/image';
import { MainChatImg, MainEndCakeImg, MainEndChatImg, MainWishChatImg, PillCakeImg } from '@/public/assets/images';
import ProgressBar from '../common/progressBar';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { useRecoilValue } from 'recoil';

interface CakeProps {
  wishStatus: string;
  percent?: number;
  price?: number;
}

export default function Cake(props: CakeProps) {
  const { wishStatus, percent, price } = props;
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  const handleMoveToLetters = () => {
    router.push(`/mypage/letters/${loginUserInfo.wishesId}`);
  };

  const ChatImg = () => {
    return (
      (wishStatus === 'before' || wishStatus === 'while') ? MainWishChatImg :
        (wishStatus === 'end') ? MainEndChatImg :
          MainChatImg
    );
  };

  const priceData = (wishStatus === 'while' || wishStatus === 'end') ? price : '???';


  const CakeImg = () => (wishStatus === 'end' ? MainEndCakeImg : PillCakeImg);

  return (
    <>
      <Styled.Container>

        <Styled.CenterContainer>
          <Styled.ContentContainer>
            <Image src={ChatImg()} alt="말풍선" />
            <Styled.ImageContainer>
              <Image src={CakeImg()} alt="케이크" />
            </Styled.ImageContainer>

            {wishStatus === 'while' || wishStatus === 'end' ? (
              <Styled.AboutButton onClick={handleMoveToLetters}>모인 케이크 보러가기 {'>'}</Styled.AboutButton>
            ) : (
              <Styled.AboutButton>모인 케이크 금액</Styled.AboutButton>
            )}

            <Styled.AboutSmall>총 {priceData}원</Styled.AboutSmall>
          </Styled.ContentContainer>

          {/* 수정 필요 */}
          <Styled.BarContainer>
            <ProgressBar percent={percent} vertical={true} />
            <Styled.ProgressBox>
              <Styled.Percent>{percent}%</Styled.Percent>
              <Styled.PercentWrapper percent={percent}></Styled.PercentWrapper>
            </Styled.ProgressBox>
          </Styled.BarContainer>

        </Styled.CenterContainer>

        {(wishStatus === 'while' || wishStatus === 'end') && (
          <Styled.Warning>펀딩 종료 후 3일내에 송금이 완료됩니다.<br />계좌번호를 확인해주세요!</Styled.Warning>
        )}
      </Styled.Container>

    </>
  );
}

const Styled = {
  Container: styled.div`
    margin: 9rem 0 0;
    display: flex;
    flex-direction: column;
  `,

  ImageContainer: styled.div`
    width: 100%;
    text-align: center;
  `,

  AboutButton: styled.button`
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
margin: 0 0 1rem;
${theme.fonts.headline24_100};
color: ${theme.colors.main_blue};
`,

  AboutSmall: styled.div`
display: flex;
justify-content: center;
align-items: center;
${theme.fonts.headline24_100};
margin: 0 0 5.4rem;
      `,

  Warning: styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  ${theme.fonts.body14};
  color: ${theme.colors.warning_red};
  margin: 0 0 3rem;
`,

  CenterContainer: styled.div`
display: flex;
justify-content: space-between;
    align-items: flex-start;
`,

  ContentContainer: styled.div`
width: 100%;
`,

  // progress bar
  BarContainer: styled.div`
  `,

  ProgressBox: styled.div`
  height: 27rem;
  display: flex;
  flex-direction: column;
`,

  PercentWrapper: styled.div<{ percent: number }>`
  height: ${(props) => props.percent}%;
  
  /* ${(props) =>
      props.percent > 3 &&
      css`
        margin-left: -1.7rem;
      `} */
`,

  Percent: styled.div`
  ${theme.fonts.button16};
  color: ${theme.colors.main_blue};
  margin-top: auto;
`,
}
