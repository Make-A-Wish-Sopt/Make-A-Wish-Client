import { PropsWithChildren } from 'react';
import EmptyLayout from './mptyLayout';
import HeaderLayout from './eaderLayout';

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

  return <LayoutContainer>{children}</LayoutContainer>;
}
