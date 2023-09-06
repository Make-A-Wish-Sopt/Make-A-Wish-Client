import styled from 'styled-components';
import BackBtn from '../common/button/backBtn';
import InputHeader from '../common/inputHeader';
import theme from '@/styles/theme';

interface GiverHeaderProps {
  dayCount: number;
}

export default function CakesHeader(props: GiverHeaderProps) {
  const { dayCount } = props;
  return (
    <InputHeader>
      <BackBtn />
      <DayCountText>D-{dayCount}</DayCountText>
    </InputHeader>
  );
}

const DayCountText = styled.span`
  color: ${theme.colors.main_blue};
  ${theme.fonts.headline20};
`;
