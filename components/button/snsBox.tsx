import styled from 'styled-components';

interface SNSBoxProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SNSBox(props: SNSBoxProps) {
  const { children, onClick } = props;

  return <Styled.Box onClick={onClick}>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div`
    margin: 0 0.5rem 0;
    cursor: pointer;
  `,
};
