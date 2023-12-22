import styled, { css } from 'styled-components';
import ProgressBar from '../../Common/rogressBar';
import theme from '@/styles/theme';

interface ContributionProps {
  percent: number;
  vertical: boolean;
}

export default function Contribution(props: ContributionProps) {
  const { percent, vertical } = props;
  return (
    <Styled.Container>
      <Styled.Text>당신의 기여도는...?</Styled.Text>
      <ProgressBar percent={percent} vertical={vertical} />
      <Styled.ProgressBox>
        <Styled.PercentWrapper percent={percent}></Styled.PercentWrapper>
        <Styled.Percent>{percent}%</Styled.Percent>
      </Styled.ProgressBox>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 5rem 0 7rem;
  `,

  Text: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};

    margin-bottom: 0.5rem;
  `,

  ProgressBox: styled.div`
    display: flex;

    width: 100%;

    margin-top: 0.5rem;
  `,

  PercentWrapper: styled.div<{ percent: number }>`
    width: ${(props) => props.percent}%;

    ${(props) =>
      props.percent > 3 &&
      css`
        margin-left: -1.7rem;
      `}
  `,

  Percent: styled.div`
    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};
  `,
};
