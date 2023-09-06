import theme from '@/styles/theme';
import styled from 'styled-components';
import Footer from './footer';

interface LayoutProps {
  footer?: boolean;
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { footer, children } = props;

  return (
    <Styled.Root>
      <Styled.Container>{children}</Styled.Container>
      {footer && <Footer />}
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
    height: 100svh;

    padding: 2.2rem 2.2rem 0 2.2rem;
  `,
};
