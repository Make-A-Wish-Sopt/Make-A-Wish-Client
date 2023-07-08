import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Dispatch, SetStateAction, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { getMonth, getYear, isBefore } from 'date-fns';
import theme from '@/styles/theme';
import { useDate } from '@/hooks/useDate';

interface CustomDatePickerProps {
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}

export default function CustomDatePicker(props: CustomDatePickerProps) {


  const { endDate, setEndDate } = props;

  // 연도 range
  const years = Array.from(
    { length: getYear(new Date()) + 6 - getYear(new Date()) }, (_, index) => getYear(new Date()) + index);

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const handleDateChange = (date: Date | null) => {
    if (date && isBefore(date, new Date())) {
      // 선택한 날짜가 현재 날짜보다 예전인 경우
      alert('선택하신 날짜는 현재 날짜보다 이전입니다. 유효한 날짜를 선택해주세요.');
      return;
    }
    setEndDate(useDate(date));
  };

  return (
    <Styled.Container>
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <Styled.CalendarHeader>
            <Styled.SelectBox
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option: number) => (
                <Styled.OptionBox key={option} value={option}>
                  {option}
                </Styled.OptionBox>
              ))}
            </Styled.SelectBox>
            년 &emsp;
            <Styled.SelectBox
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map((option) => (
                <Styled.OptionBox key={option} value={option}>
                  {option}
                </Styled.OptionBox>
              ))}
            </Styled.SelectBox>
            월
          </Styled.CalendarHeader>
        )}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={new Date(endDate)}
        onChange={handleDateChange}
        selectsEnd
        endDate={new Date(endDate)}
      />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 11rem;
    ${theme.fonts.body14};
  `,

  CalendarHeader: styled.div`
  width: 100%;
  `,

  SelectBox: styled.select`
  `,

  OptionBox: styled.option`
  `,
};
