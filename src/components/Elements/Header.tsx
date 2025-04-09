import Image from 'next/image';
import { BackBtnIc, MenuIc } from '../../../public/assets/icons';
import { RoutePathType } from '@/hooks/useRouters';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface HeaderProps {
  leftMenu?: JSX.Element;
  centerMenu?: JSX.Element;
  rightMenu?: JSX.Element;
}

export default function Header(props: HeaderProps) {
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
}

export const IconRouteButton = ({
  Icon,
  routePath,
}: {
  Icon: JSX.Element;
  routePath: RoutePathType;
}) => {
  // const { handleRouter } = useRouters();
  // return <button onClick={() => handleRouter(routePath)}>{Icon}</button>;
  return <Link href={routePath}>{Icon}</Link>;
};

export function MypageButton() {
  // const { handleRouter } = useRouters();

  return (
    <button>
      <Link href={'/mypage'}>
        <Image src={MenuIc} alt="메뉴 아이콘" />
      </Link>
    </button>
  );
}
