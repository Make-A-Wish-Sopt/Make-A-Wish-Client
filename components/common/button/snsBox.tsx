import styled from 'styled-components';

interface SnsBoxProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SNSBox(props: SnsBoxProps) {
  const { children, onClick } = props;

  return <Styled.Container onClick={onClick}>{children}</Styled.Container>;
}

const Styled = {
  Container: styled.div`
    cursor: pointer;
    margin: 0 0.5rem 0;
  `,
};
