import theme from '@/styles/theme';
import styled, { css } from 'styled-components';

interface ProgressBarProps {
  percent: number | undefined;
}

export default function VerticalProgressBar(props: ProgressBarProps) {
  const { percent } = props;

  return (
    <>
      <Styled.ProgressBox>
        <Styled.Percent>{percent}%</Styled.Percent>
        <Styled.PercentWrapper percent={Number(percent)}></Styled.PercentWrapper>
      </Styled.ProgressBox>

      <Styled.BarContainer>
        <Styled.Progress percent={Number(percent)} />
      </Styled.BarContainer>
    </>
  );
}

const Styled = {

  ProgressBox: styled.div`
    height: 27rem;
    display: flex;
    flex-direction: column;
    justify-content: right;
  `,

  PercentWrapper: styled.div<{ percent: number }>`
    height: ${(props) => props.percent}%;

    ${(props) =>
      props.percent > 3 &&
      css`
        margin-top: -2rem;
      `}
  `,

  Percent: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    margin-top: auto;
    margin-right: 0.5rem;
  `,

  BarContainer: styled.div`
    width: 1rem;
    height: 27rem;

    background-color: ${theme.colors.pastel_blue};

    border-bottom-right-radius: 5rem;
    border-bottom-left-radius: 5rem;
    border-top-right-radius: 5rem;
    border-top-left-radius: 5rem;

    -ms-transform: rotate(180deg); /* IE 9 */
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
  `,

  Progress: styled.div<{ percent: number }>`
    height: ${(props) => props.percent}%;
    max-height: 100%;
    width: 100%;

    background-color: ${theme.colors.main_blue};

    border-bottom-right-radius: 5rem;
    border-bottom-left-radius: 5rem;
    border-top-right-radius: 5rem;
    border-top-left-radius: 5rem;
  `,
};
