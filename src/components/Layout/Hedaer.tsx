'use client';

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
