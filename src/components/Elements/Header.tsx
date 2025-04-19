import Image from 'next/image';
import { RoutePathType } from '@/hooks/useRouters';
import Link from 'next/link';
import { MenuIc } from '@public/assets/icons';
import { memo } from 'react';

interface HeaderProps {
  leftMenu?: JSX.Element;
  centerMenu?: JSX.Element;
  rightMenu?: JSX.Element;
}

const Header = memo((props: HeaderProps) => {
  const { leftMenu, centerMenu, rightMenu } = props;

  return (
    <header className="flex justify-center w-full">
      <div className="flex justify-between items-center w-375 mt-2rem pt-16 px-22">
        {leftMenu}
        <div>{centerMenu}</div>
        {rightMenu}
      </div>
    </header>
  );
});

export default Header;

export function IconRouteButton({
  Icon,
  routePath,
}: {
  Icon: JSX.Element;
  routePath: RoutePathType;
}) {
  return <Link href={routePath}>{Icon}</Link>;
}

export function MypageButton() {
  return (
    <button type="button">
      <Link href="/mypage">
        <Image src={MenuIc} alt="메뉴 아이콘" />
      </Link>
    </button>
  );
}
