import { PropsWithChildren } from 'react';
import EmptyLayout from './EmptyLayout';
import HeaderLayout from './HeaderLayout';
import Footer from '../footer';

const layouts = {
  header: HeaderLayout,
  empty: EmptyLayout,
};

interface LayoutProps {
  layoutKey: keyof typeof layouts;
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { layoutKey, children } = props;

  const LayoutContainer = layouts[layoutKey];

  return (
    <>
      <LayoutContainer>{children}</LayoutContainer>
      <Footer />
    </>
  );
}
