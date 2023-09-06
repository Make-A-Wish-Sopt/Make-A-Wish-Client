import theme from '@/styles/theme';
import styled, { css } from 'styled-components';

interface ProgressBarProps {
  percent: number;
  vertical: boolean;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { percent, vertical } = props;
  return (
    <>
      <Styled.Container vertical={vertical}>
        <Styled.Progress percent={percent} />
      </Styled.Container>
    </>
  );
}

const Styled = {
  Container: styled.div<{ vertical: boolean }>`
    width: 1rem;
    height: 27rem;

    background-color: ${theme.colors.pastel_blue};

    border-bottom-right-radius: 5rem;
    border-bottom-left-radius: 5rem;
    border-top-right-radius: 5rem;
    border-top-left-radius: 5rem;

    ${(props) =>
      props.vertical &&
      css`
        -ms-transform: rotate(-90deg); /* IE 9 */
        -webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
        transform: rotate(-90deg);
      `}
  `,
  Progress: styled.div<{ percent: number }>`
    width: ${(props) => props.percent}%;
    height: 100%;

    background-color: ${theme.colors.main_blue};

    border-bottom-right-radius: 5rem;
    border-bottom-left-radius: 5rem;
    border-top-right-radius: 5rem;
    border-top-left-radius: 5rem;
  `,
};
