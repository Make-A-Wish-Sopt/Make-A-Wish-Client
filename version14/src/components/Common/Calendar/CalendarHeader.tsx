import styled from 'styled-components';
import { getMonth, getYear } from 'date-fns';
import { MONTHS } from '@/constant/dateList';


interface CalendarHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { date, changeYear, changeMonth } = props;

  // 연도 range
  const years = Array.from(
    { length: getYear(new Date()) + 6 - getYear(new Date()) },
    (_, index) => getYear(new Date()) + index,
  );

  return (
    <Styled.CalendarHeader>
      <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
        {years.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      년 &emsp;
      <select
        value={MONTHS[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(MONTHS.indexOf(value))}
      >
        {MONTHS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      월
    </Styled.CalendarHeader>
  );
}

const Styled = {
  CalendarHeader: styled.div`
    width: 100%;
  `,
};
