import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return <Root>{children}</Root>;
}

export default Layout;

const Root = styled.div`
  width: 100%;
  /* &.minHeight {
    min-height: 136.7rem;
  } */
  display: flex;
  flex-direction: column;
`;
