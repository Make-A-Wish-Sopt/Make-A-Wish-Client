import { getMonth, getYear } from 'date-fns';

interface CalendarHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { date, changeYear, changeMonth } = props;
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  // 연도 range
  const years = Array.from(
    { length: getYear(new Date()) + 6 - getYear(new Date()) },
    (_, index) => getYear(new Date()) + index,
  );

  return (
    <div className="w-full">
      <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
        {years.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      년 &emsp;
      <select
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      월
    </div>
  );
}
