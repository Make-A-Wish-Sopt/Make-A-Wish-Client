import styled from 'styled-components';
import Image from 'next/image';

import theme from '@/styles/theme';
import { CloseSmallIc } from '@/public/assets/icons';
import IconButton from '@/components/common/button/iconButton';
import { DeleteModalCake } from '@/public/assets/images';
import ButtonBox from '@/components/common/button/buttonBox';

interface DeleteModalProps {
  clickModal: () => void;
}

export default function DeleteModal(props: DeleteModalProps) {
  const { clickModal } = props;

  const handleClick = () => {
  };

  return (
    <Styled.Container>
      <Styled.IconContainer>
        <IconButton src={CloseSmallIc} alt="닫기" onClick={clickModal} />
      </Styled.IconContainer>

      <Styled.ContentContainer>
        <Image src={DeleteModalCake} alt={'케이크'} />
        <Styled.DeleteText>총 { }개의 소원링크를 삭제합니다.</Styled.DeleteText>
      </Styled.ContentContainer>

      <Styled.ButtonContainer>
        <ButtonBox
          handleClick={handleClick}
          backgroundColor={theme.colors.white}
          fontColor={theme.colors.main_blue}
        >취소</ButtonBox>
        <ButtonBox
          handleClick={handleClick}
          backgroundColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
        >확인</ButtonBox>
      </Styled.ButtonContainer>

    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 31.6rem;
    height: 21.2rem;
    /* height: 14.3rem; */
    background-color: ${theme.colors.pastel_blue};
    padding: 2rem;
    border-radius: 1.6rem;
    margin: 0 1rem 0;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  IconContainer: styled.header`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,

  ContentContainer: styled.div`
    margin: 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  DeleteText: styled.div`
    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
    margin: 0.7rem 0 1rem;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`,
};
