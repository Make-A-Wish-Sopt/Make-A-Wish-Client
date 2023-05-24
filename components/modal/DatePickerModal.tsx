import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { Dispatch, SetStateAction } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { getMonth, getYear, isBefore } from "date-fns";

interface CustomDatePickerProps {
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}

function getDate(date: Date | null): string {
  // 선택한 날짜가 없을 시 현재 날짜로 설정
  if (!date) {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function CustomDatePicker(props: CustomDatePickerProps) {
  const _ = require("lodash");

  // 연도 range(시작 연도, 끝 연도, 연도 간격)
  const years = _.range(getYear(new Date()), getYear(new Date()) + 5, 1);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const handleDateChange = (date: Date | null) => {
    if (date && isBefore(date, new Date())) {
      // 선택한 날짜가 현재 날짜보다 예전인 경우
      alert("선택하신 날짜는 현재 날짜보다 이전입니다. 유효한 날짜를 선택해주세요.")
      return;
    }
    props.setEndDate(getDate(date));
  };

  return (
    <Styled.Container>
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className="custom-react-datepicker__select-wrapper">
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
            년
            &emsp;
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            월
          </div>
        )}
        locale={ko}
        dateFormat="yyyy.MM.dd"
        selected={new Date(props.endDate)}
        onChange={handleDateChange}
        selectsEnd
        endDate={new Date(props.endDate)}
      />
    </Styled.Container>
  );
}


const Styled = {
  Container: styled.div`
  width: 11rem;
  `,
};

