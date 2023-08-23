import theme from '@/styles/theme';
import styled from 'styled-components';

interface UploadTypeToggleBtnProps {
  isLinkLoadType: boolean;
  handleLoadTypeToggle: (state: boolean) => void;
}

export default function UploadTypeToggleBtn(props: UploadTypeToggleBtnProps) {
  const { isLinkLoadType, handleLoadTypeToggle } = props;
  return (
    <Styled.ButtonContainer>
      <Styled.ToggleButton
        onClick={() => handleLoadTypeToggle(true)}
        fontColor={isLinkLoadType ? theme.colors.white : theme.colors.main_blue}
        bgColor={isLinkLoadType ? theme.colors.main_blue : 'transparent'}
      >
        선물 링크 불러오기
      </Styled.ToggleButton>
      <Styled.ToggleButton
        onClick={() => handleLoadTypeToggle(false)}
        fontColor={isLinkLoadType ? theme.colors.main_blue : theme.colors.white}
        bgColor={isLinkLoadType ? 'transparent' : theme.colors.main_blue}
      >
        선물 직접 등록하기
      </Styled.ToggleButton>
    </Styled.ButtonContainer>
  );
}

const Styled = {
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 33.1rem;
    height: 5.8rem;

    margin-bottom: 2rem;

    border-radius: 4.9rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 0.5rem;
  `,

  ToggleButton: styled.div<{ fontColor: string; bgColor: string }>`
    display: flex;
    justify-content: center;
    align-items: center;

    ${theme.fonts.body16};
    color: ${(props) => props.fontColor};

    width: 16rem;
    height: 4.8rem;

    border-radius: 4rem;
    background-color: ${(props) => props.bgColor};

    cursor: pointer;
  `,
};
