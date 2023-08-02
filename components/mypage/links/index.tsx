import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import IconButton from '@/components/common/button/iconButton';
import { DeleteBtnIc } from '@/public/assets/icons';
import LinksBox from './linksBox';
import useModal from '@/hooks/common/useModal';
import Modal from '@/components/common/modal';
import DeleteModal from '@/components/common/modal/DeleteModal';

export default function LinksContainer() {
  const { isOpen, handleToggle } = useModal();

  const handleCheckBox = () => {
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
        <IconButton onClick={handleToggle} src={DeleteBtnIc} alt="서비스 가이드" />
      </InputHeader>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <DeleteModal clickModal={handleToggle} />
        </Modal>)}

      <Styled.Container>
        <Styled.Title>나의 소원 링크 모음</Styled.Title>

        <LinksBox
          handleClick={handleCheckBox}
          title={"화정이의 앙큼 벌스데이"}
          date={"2023.01.01~2023.02.02"} />
      </Styled.Container>

    </>
  );
}

const Styled = {
  Container: styled.div`
  margin: 2rem 1rem 0;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    margin: 0 0 2rem;
  `,
};
