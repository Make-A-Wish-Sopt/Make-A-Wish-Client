'use client';

import Text from '@/components/Common/Text';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { MainProgressDataType } from '@/types/wishesType';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  MainCakeImg,
  MainChatImg,
  MainEndCakeImg,
  MainEndChatImg,
  MainWishChatImg,
} from '../../../../public/assets/images';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import VerticalProgressBar from '@/components/UI/VerticalProgressBar';

interface WishesMessageClientProps {
  progressData: MainProgressDataType | undefined;
}

export function WishesMessageClient(props: WishesMessageClientProps) {
  const { progressData } = props;
  const loginUserInfo = useRecoilValue(LoginUserInfo);
  const nickName = loginUserInfo.nickName;

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

  return (
    <StTextWrapper>
      {progressData ? (
        progressData.status === 'BEFORE' ? (
          <div>
            <Text color="black">{`${nickName}님\n`}</Text>
            <Text color="main_blue">
              {`${progressData.dayCount < 1 ? 1 : progressData.dayCount}일 뒤 부터 소원링크를\n공유할 수 있어요!`}
            </Text>
          </div>
        ) : (
          <div>
            <Text color="black">{`${nickName}님 에게\n`}</Text>
            <Text color="main_blue">{`${progressData.cakeCount}개 `}</Text>
            <Text color="black">{`의 조각 케이크가\n도착했어요!`}</Text>
          </div>
        )
      ) : (
        <div>
          <Text color="black">{`${nickName}님\n`}</Text>
          <Text color="main_blue">
            {'소원 링크 '}
            <Text color="black">{`를 생성하고\n케이크를 모아봐요!`}</Text>
          </Text>
        </div>
      )}

      <Text color="main_blue" font="headline20">
        {getDayText()}
      </Text>
    </StTextWrapper>
  );
}

const StTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.fonts.headline24_130};

  margin-top: 2rem;
`;

interface MainContentClienProps {
  progressData: MainProgressDataType | undefined;
}

export function MainContentClient(props: MainContentClienProps) {
  const { progressData } = props;

  const router = useRouter();

  const getCakeImage = () => {
    if (!progressData) {
      return MainChatImg;
    }

    if (progressData?.status === 'BEFORE' || progressData?.status === 'WHILE') {
      return MainWishChatImg;
    }

    if (progressData?.status === 'END') {
      return MainEndChatImg;
    }
  };

  const handleMoveLetterPage = () => {
    progressData && router.push(`mypage/letters/${progressData?.wishId}`);
  };

  return (
    <StContentWrapper>
      <Image src={getCakeImage()} alt={'메인 케이크 이미지'} />
      <Image
        src={progressData?.status === 'END' ? MainEndCakeImg : MainCakeImg}
        alt="메인 케이크 이미지"
        width={219}
      />
      <FixedProgressBar>
        <VerticalProgressBar percent={progressData?.percent} />
      </FixedProgressBar>
      <Text color="main_blue">모인케이크</Text>
      <Text color="black">{`총 ${progressData?.cakeCount}개`}</Text>
    </StContentWrapper>
  );
}

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  ${({ theme }) => theme.fonts.headline24_130};

  margin-top: 9.4rem;
`;

const FixedProgressBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;
