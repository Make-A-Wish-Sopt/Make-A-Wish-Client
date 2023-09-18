import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { getMonth, getYear, isBefore } from 'date-fns';
import theme from '@/styles/theme';
import { MONTHS } from '@/constant/dateList';

interface CustomDatePickerProps {
  date: Date;
  changeStartDate?: (value: Date) => void;
  readOnly: boolean;
}

export default function CustomDatePicker(props: CustomDatePickerProps) {
  const { date, changeStartDate, readOnly } = props;

  // 연도 range
  const years = Array.from(
    { length: getYear(new Date()) + 6 - getYear(new Date()) },
    (_, index) => getYear(new Date()) + index,
  );

  const handleDateChange = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    if (date && isBefore(date, yesterday)) {
      // 선택한 날짜가 현재 날짜보다 예전인 경우
      alert('선택하신 날짜는 현재 날짜보다 이전입니다. 유효한 날짜를 선택해주세요.');
      return;
    }

    changeStartDate && changeStartDate(date);
  };

  return (
    <Styled.Container>
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <Styled.CalendarHeader>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
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
        )}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={new Date(date)}
        onChange={handleDateChange}
        selectsEnd
        endDate={new Date(date)}
        readOnly={readOnly}
      />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 11rem;

    ${theme.fonts.body14};
    ${theme.colors.dark_blue};

    cursor: pointer;
  `,

  CalendarHeader: styled.div`
    width: 100%;
  `,
};
