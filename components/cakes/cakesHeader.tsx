import styled from 'styled-components';
import BackBtn from '../common/button/backBtn';
import theme from '@/styles/theme';

interface GiverHeaderProps {
  dayCount: number;
}

export default function CakesHeader(props: GiverHeaderProps) {
  const { dayCount } = props;
  return (
    <>
      <BackBtn />
      <DayCountText>D-{dayCount}</DayCountText>
    </>
  );
}

const DayCountText = styled.span`
  color: ${theme.colors.main_blue};
  ${theme.fonts.headline20};
`;
