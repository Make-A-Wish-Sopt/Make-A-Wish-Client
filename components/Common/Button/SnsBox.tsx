import styled from 'styled-components';

interface SNSBoxProps {
  children: React.ReactNode;
  handleClick?: () => void;
}

export default function SNSBox(props: SNSBoxProps) {
  const { children, handleClick } = props;

  return <Styled.Box onClick={handleClick}>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div`
    margin: 0 0.5rem 0;
    cursor: pointer;
  `,
};
