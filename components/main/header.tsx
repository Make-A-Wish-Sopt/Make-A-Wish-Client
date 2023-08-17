import styled, { css } from 'styled-components';
import theme from '@/styles/theme';
import { SideBarIc } from '@/public/assets/icons';
import IconButton from '@/components/common/button/iconButton';
import MainHeader from '../common/mainHeader';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import router from 'next/router';

interface HeaderProps {
  wishStatus: string;
  dayCount?: number;
  cakeCount?: number;
}

export default function Header(props: HeaderProps) {
  const { wishStatus, dayCount, cakeCount } = props;
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  const handleMoveToMypage = () => {
    router.push('/mypage');
  };

  const getTitleContent = () => {
    if (wishStatus === 'none') {
      return (
        <Styled.Title>
          {loginUserInfo.nickName}님,
          <br />
          <Styled.TitleColor>소원 링크</Styled.TitleColor>를 생성하고
          <br />
          케이크를 모아봐요!
        </Styled.Title>
      );
    } else if (wishStatus === 'while' || wishStatus === 'end') {
      return (
        <Styled.Title>
          {loginUserInfo.nickName}님에게
          <br />
          <Styled.TitleColor>{cakeCount}개</Styled.TitleColor>의 조각 케이크가
          <br />
          도착했어요!
        </Styled.Title>
      );
    } else if (wishStatus === 'before') {
      return (
        <Styled.Title>
          {loginUserInfo.nickName}님,
          <br />
          <Styled.TitleColor>{dayCount}일 뒤 </Styled.TitleColor>부터 소원링크를
          <br />
          공유해봐요!
        </Styled.Title>
      );
    }
  };

  const getDayText = () => {
    if (wishStatus === 'while') {
      if (dayCount === 0) {
        return '-DAY'
      }
      return `-${dayCount}`;
    } else if (wishStatus === 'end') {
      return dayCount !== undefined ? `+${Math.abs(dayCount)}` : '?';
    } else {
      return '-?';
    }
  };

  const sideContent = (
    <>
      <IconButton src={SideBarIc} alt="사이드바" onClick={handleMoveToMypage} />
      <Styled.DaysText wishStatus={wishStatus}>D{getDayText()}</Styled.DaysText>
    </>
  );

  return (
    <>
      <MainHeader title={getTitleContent()} side={sideContent} />
    </>
  );
}

const Styled = {
  Title: styled.div`
  ${theme.fonts.headline24_130};
`,

  TitleColor: styled.span`
  color: ${theme.colors.main_blue};
`,

  DaysText: styled.span<{ wishStatus: string }>`
${theme.fonts.headline20};
color: ${theme.colors.main_blue};
display: flex;
  justify-content: center;
  margin-top: 1.5rem;


  color: ${theme.colors.main_blue};

  ${({ wishStatus }) =>
      wishStatus === 'end' &&
      css`
      color: ${theme.colors.warning_red}
    `}

  ${({ wishStatus }) =>
      wishStatus === 'before' &&
      css`
      color: ${theme.colors.gray2};
    `}
`
}
