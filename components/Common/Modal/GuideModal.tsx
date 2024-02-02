import styled from 'styled-components';
import Image from 'next/image';
import { CloseWhiteIc } from '@/public/assets/icons';
import { GuideContentImg, GuideBoxImg } from '@/public/assets/images';

interface GuideModalProps {
  handleToggle: () => void;
}

export default function GuideModal(props: GuideModalProps) {
  const { handleToggle } = props;

  return (
    <Styled.Container>
      <Styled.ButtonContainer onClick={handleToggle}>
        <Image src={CloseWhiteIc} alt="닫기" />
      </Styled.ButtonContainer>

      <Styled.Content>
        <Styled.ScrollContent>
          <Image src={GuideContentImg} alt="서비스 가이드 설명" width="300" />
        </Styled.ScrollContent>
      </Styled.Content>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    padding-top: 4rem;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;

    width: 33rem;
    height: 61.4rem;

    border-radius: 1.6rem;

    padding: 4rem 1.5rem 2rem;

    background-image: url(${GuideBoxImg.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  `,

  ScrollContent: styled.div`
    width: 100%;
    height: 100%;

    overflow: scroll;
  `,

  ButtonContainer: styled.div`
    display: flex;
    flex-direction: row-reverse;

    position: relative;
    margin: 2.3rem 0rem 2.9rem;
  `,
};
