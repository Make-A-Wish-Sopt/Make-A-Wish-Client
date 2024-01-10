import { useGetMainProgressData } from '@/hooks/queries/wishes';
import { SideBarIc } from '@/public/assets/icons';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import theme from '@/styles/theme';
import Image from 'next/image';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export default function MainTopContent() {
  const { progressData } = useGetMainProgressData();
  const loginUserInfo = useRecoilValue(LoginUserInfo);
  const [nickName, setNickName] = useState('');

  const handleMoveToMypage = () => {
    router.push('/mypage');
  };

  const getDayText = () => {
    if (!progressData) return 'D-?';

    if (progressData?.dayCount === 0) {
      return 'D-Day';
    } else {
      return progressData.dayCount < 0
        ? `D+${Math.abs(progressData?.dayCount)}`
        : `D-${progressData?.dayCount}`;
    }
  };

  useEffect(() => {
    setNickName(loginUserInfo.nickName);
  }, [loginUserInfo]);

  return (
    <Styled.Container>
      <Styled.TextWrapper>
        {progressData ? (
          progressData.status === 'BEFORE' ? (
            <>
              {`${nickName}님\n`}
              <Styled.Text>{`${
                progressData.dayCount < 1 ? 1 : progressData.dayCount
              }일 뒤 `}</Styled.Text>
              {`부터 소원링크를\n공유할 수 있어요!`}
            </>
          ) : (
            <>
              {`${nickName}님에게\n`}
              <Styled.Text>{`${progressData.cakeCount}개 `}</Styled.Text>
              {`의 조각 케이크가\n도착했어요!`}
            </>
          )
        ) : (
          <>
            {`${nickName}님\n`}
            <Styled.Text>{'소원 링크 '}</Styled.Text>
            {`를 생성하고\n케이크를 모아봐요!`}
          </>
        )}
      </Styled.TextWrapper>

      <Styled.RigthSideWrapper>
        <Image src={SideBarIc} alt="설정" onClick={handleMoveToMypage} />
        <Styled.DayText className={progressData?.status || ''}>{getDayText()}</Styled.DayText>
      </Styled.RigthSideWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.header`
    display: flex;
    justify-content: space-between;

    margin-top: 2rem;
  `,

  TextWrapper: styled.div`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.black};
    white-space: pre-line;
  `,

  Text: styled.span`
    color: ${theme.colors.main_blue};
  `,

  RigthSideWrapper: styled.div`
    display: flex;
    flex-direction: column;

    gap: 2.3rem;
  `,

  DayText: styled.span`
    ${theme.fonts.headline20};
    color: ${theme.colors.main_blue};

    &.BEFORE {
      color: ${theme.colors.gray2};
    }

    &.END {
      color: ${theme.colors.warning_red};
    }
  `,
};
