import styled from 'styled-components';

interface SNSBoxProps {
  children: React.ReactNode;
  handleClick?: () => void;
}

<<<<<<< HEAD:components/button/snsBox.tsx
export default function SNSBox(props: SNSBoxProps) {
  const { children, handleClick } = props;

  return <Styled.Box onClick={handleClick}>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div`
=======
export default function SNSBox(props: SnsBoxProps) {
  const { children, onClick } = props;

  return <Styled.Container onClick={onClick}>{children}</Styled.Container>;
}

const Styled = {
  Container: styled.div`
    cursor: pointer;
>>>>>>> refactor#45-wishes:components/common/button/snsBox.tsx
    margin: 0 0.5rem 0;
    cursor: pointer;
  `,
};
