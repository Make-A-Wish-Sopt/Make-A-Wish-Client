'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { BackBtnIc, MenuIc } from '../../../public/assets/icons';

interface HeaderProps {
  backBtn?: boolean;
  menuBtn?: boolean;
}

export default function Header(props: HeaderProps) {
  const { backBtn, menuBtn } = props;
  const pathname = usePathname();
  const router = useRouter();

  const onLogin = true;

  return (
    <StHeaderContainer>
      <StHeaderWrapper>
        {backBtn && <Image src={BackBtnIc} alt="뒤로가기 아이콘" onClick={() => router.back()} />}
        <div></div>
        {menuBtn && pathname === '/wishes' && <Image src={MenuIc} alt="메뉴 아이콘" />}
      </StHeaderWrapper>
    </StHeaderContainer>
  );
}

const StHeaderContainer = styled.header`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const StHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-width: 37.5rem;
  max-width: 50rem;

  width: 100%;

  margin-top: 2rem;

  padding: 0 2.2rem;
`;
