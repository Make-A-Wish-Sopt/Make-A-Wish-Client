import router from 'next/router';
import theme from '@/styles/theme';
import ButtonBox from '@/components/common/button/buttonBox';
import ShareModal from '../common/modal/ShareModal';
import useModal from '@/hooks/common/useModal';
import Modal from '../common/modal/modal';

interface ButtonProps {
  wishStatus: string;
}


export default function Button(props: ButtonProps) {
  const { wishStatus } = props;
  const { isOpen, handleToggle } = useModal();


  const Button = () => {
    if (wishStatus === 'before') {
      return (
        <ButtonBox
          backgroundColor={theme.colors.gray1}
          fontColor={theme.colors.white}
        >
          내 소원 링크 공유하기
        </ButtonBox>
      );
    } else if (wishStatus === 'while') {
      return (
        <ButtonBox
          handleClick={handleToggle}
          backgroundColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
        >
          내 소원 링크 공유하기
        </ButtonBox>
      );
    } else if (wishStatus === 'end') {
      return null;
    } else {
      return (
        <ButtonBox
          handleClick={handleMovePage}
          backgroundColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
        >
          소원 링크 생성하기
        </ButtonBox>
      );
    }
  };

  const handleMovePage = () => {
    router.push('/wishes');
  };


  return (
    <>
      <Button />
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <ShareModal handleModalClick={handleToggle} />
        </Modal>)}
    </>
  );
}