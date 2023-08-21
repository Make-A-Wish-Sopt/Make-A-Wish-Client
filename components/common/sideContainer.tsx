import styled from 'styled-components';

interface SideContainerProps {
  children: React.ReactNode;
}

export default function SideContainer(props: SideContainerProps) {
  const { children } = props;

  return (
    <Styled.Container>{children}</Styled.Container>
  );
}

const Styled = {
  Container: styled.span`
    margin-left: auto;
  `
};
