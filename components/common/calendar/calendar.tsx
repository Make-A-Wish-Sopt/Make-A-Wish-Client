import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import CustomDatePicker from '../modal/CustomDatePicker';

interface CalendarProps {
  date: Date;
  changeStartDate?: (value: Date) => void;
  calendarIcon: any;
  readOnly: boolean;
}

export default function Calendar(props: CalendarProps) {
  const { date, changeStartDate, calendarIcon, readOnly } = props;

  return (
    <Styled.CalendarWrapper>
      <CustomDatePicker date={date} changeStartDate={changeStartDate} readOnly={readOnly} />
      <Image src={calendarIcon} alt="캘린더 아이콘" />
    </Styled.CalendarWrapper>
  );
}

const Styled = {
  CalendarWrapper: styled.div`
    display: flex;

    width: 100%;
    height: 100%;

    cursor: pointer;
  `,

  DateText: styled.p`
    width: 100%;

    ${theme.fonts.body12};

    cursor: pointer;
  `,
};
