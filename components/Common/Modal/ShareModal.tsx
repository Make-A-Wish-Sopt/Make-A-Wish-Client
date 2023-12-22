import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { CloseSmallIc } from '@/public/assets/icons';
import ShareContent from './ShareContent';

interface ShareModalProps {
  handleToggle: () => void;
}

export default function ShareModal(props: ShareModalProps) {
  const { handleToggle } = props;

  return (
    <Styled.Container>
      <Styled.IconContainer>
        <Image src={CloseSmallIc} alt="닫기" onClick={handleToggle} />
      </Styled.IconContainer>

      <ShareContent />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 31.6rem;
    height: 14.3rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 2.2rem 1.5rem 1.6rem;
    border-radius: 1.6rem;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  IconContainer: styled.div`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,
};
