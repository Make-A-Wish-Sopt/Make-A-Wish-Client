import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { KakaoLoginIc, WideArrowDownIc } from '@/public/assets/icons';
import { MainLoginImg } from '@/public/assets/images';
import GuideModal from '@/components/Common/modal/GuideModal';
import Modal from '@/components/Common/modal';
import useModal from '@/hooks/common/useModal';

interface MainViewProps {
  text: string;
}

export default function MainView(props: MainViewProps) {
  const { text } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <GuideModal handleToggle={handleToggle} />
        </Modal>
      )}

      <Styled.ImageContainer>
        <Styled.Title>
          조물주보다
          <br />
          생일선물주
        </Styled.Title>

        <Image
          src={MainLoginImg}
          alt="사용 설명 케이크 이미지"
          width={252}
          onClick={handleToggle}
        />
      </Styled.ImageContainer>
      <Styled.About>{text}</Styled.About>

      <Styled.WideArrowDownIcon />
    </>
  );
}

const Styled = {
  Title: styled.div`
    ${theme.fonts.title56};
    color: ${theme.colors.main_blue};
    margin-bottom: 2.8rem;
    display: flex;
    justify-content: center;
    white-space: pre-line;
  `,

  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    margin-top: 8.1rem;
  `,

  About: styled.div`
    display: flex;
    justify-content: center;

    margin: 1rem 0 2.1rem;

    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};

    text-align: center;
    white-space: pre-line;
  `,

  WideArrowDownIcon: styled((props) => <Image {...props} src={WideArrowDownIc} alt="아래화살표" />)`
    margin-bottom: 2.4rem;
  `,

  KakaoLoginIcon: styled((props) => (
    <Image {...props} src={KakaoLoginIc} alt="카카오로그인아이콘" />
  ))`
    margin-right: 1.3rem;
  `,
};
