import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import IconButton from '@/components/button/iconButton';
import { CloseWhiteIc, DetailCloseIc, DetailOpenIc } from '@/public/assets/icons';
import { useEffect, useState } from 'react';

interface TermsModalProps {
  handleToggle: () => void;
  changeIsAgreed: (isChecked: boolean) => void;
}

export default function TermsModal(props: TermsModalProps) {
  const { handleToggle, changeIsAgreed } = props;

  const [isHidden, setIsHidden] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    changeIsAgreed(false);
  }, []);

  const handleMoreViewToggle = () => {
    setIsHidden(!isHidden);
  };
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    changeIsAgreed(!isChecked);
  };

  return (
    <Styled.Container>
      <Styled.Background onClick={handleToggle}></Styled.Background>

      <Styled.Background2>
        <Styled.ButtonContainer onClick={handleToggle}>
          <IconButton src={CloseWhiteIc} alt="닫기" />
        </Styled.ButtonContainer>

        <Styled.Content>
          <Styled.About>
            &apos;조물주보다 생일선물주&apos;는 카카오페이 결제
            <br />
            서비스를 연동하여 펀딩 총 금액의 3.4%를
            <br />
            수수료를 받고 있습니다.
            <br />
            펀딩액 정산 시 차감되어 입금됩니다.
          </Styled.About>

          <Styled.DetailButton onClick={handleMoreViewToggle}>
            {isHidden ? (
              <Image src={DetailOpenIc} alt="자세히 보기" />
            ) : (
              <Image src={DetailCloseIc} alt="닫기" />
            )}
          </Styled.DetailButton>
          {!isHidden && (
            <Styled.AboutDetail>
              &apos;조물주보다 생일선물주&apos;는 사용자분들의 편리한
              <br />
              결제를 위해 카카오페이 결제를 연동하였습니다.
              <br />
              이에 해당 서비스는 카카오페이 가맹점으로 다음과
              <br />
              같은 수수료 정책을 적용 받고 있습니다.
              <br />
              <br />
              1. 서비스 이용 수수료란, 카카오 페이구매 시<br />
              상품주문건별로 부과되는 수수료 입니다.
              <br />
              2. 카카오페이 서비스 독립몰의 수수료는 최대 <br />
              3.4%가 적용됩니다.
              <br />※ 수수료는 부가세가 포함된 비율입니다.
            </Styled.AboutDetail>
          )}

          <Styled.AgreeText>
            <Styled.CheckContainer checked={isChecked} onChange={handleCheckbox} />
            동의하고, 소원링크 생성하기
          </Styled.AgreeText>
        </Styled.Content>
      </Styled.Background2>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  `,

  Background: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.4;
  `,

  Content: styled.div`
    position: relative;
    width: 32rem;
    background: ${theme.colors.pastel_blue};
    padding: 3rem 3.9rem;
    border-radius: 1.6rem;
  `,

  ButtonContainer: styled.div`
    position: relative;
    margin: 6.4rem 0 2.3rem;
  `,

  Background2: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,

  About: styled.div`
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 14px;
    line-height: 150%;
    align-items: center;
    text-align: center;
    color: ${theme.colors.dark_blue};
    margin-bottom: 2rem;
  `,

  AboutDetail: styled.div`
    font-family: 'Pretendard';
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    align-items: center;
    text-align: center;
    color: ${theme.colors.dark_blue};
    opacity: 50%;
    margin-top: 2rem;
  `,

  AgreeText: styled.div`
    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
  `,

  DetailButton: styled.a`
    display: flex;
    justify-content: center;
  `,

  CheckContainer: styled.input.attrs({ type: 'checkbox' })`
    width: 1.4rem;
    height: 1.4rem;
    border: 1px solid ${theme.colors.dark_blue};
    margin: 0 1rem 0.5rem;
    cursor: pointer;
    &:checked {
      background-color: ${theme.colors.dark_blue};
    }
    appearance: none;
  `,
};
