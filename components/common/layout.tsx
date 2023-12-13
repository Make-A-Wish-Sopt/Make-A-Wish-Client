import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <Styled.Root>
      <Styled.Container>{children}</Styled.Container>
    </Styled.Root>
  );
}

export default Layout;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  `,

  Container: styled.div`
    width: 37.5rem;
    height: 100%;

    padding: 2.2rem 2.2rem 0 2.2rem;
  `,
};
