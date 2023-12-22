import Image from 'next/image';
import { ko } from 'date-fns/locale';
import InputBox from '../box/inputBox';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { UseFormReturn } from 'react-hook-form';
import { WishesDataInputType } from '@/types/wishesType';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarHeader from './alendarHeader';
import { getDate } from '@/utils/common/getDate';

interface CalendarProps {
  date: Date;
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  readOnly?: boolean;
}

export default function Calendar(props: CalendarProps) {
  const { date, methods, readOnly } = props;

  const handleChangeDate = (selectedDate: Date) => {
    methods.setValue('startDate', selectedDate);
    methods.setValue('endDate', getDate(selectedDate, 7));
  };

  return (
    <InputBox
      boxType="inputBox--calendar"
      colorSystem={readOnly ? 'pastelBlue_gray2' : 'pastelBlue_darkBlue'}
    >
      <Styled.Wrapper>
        <DatePicker
          renderCustomHeader={({ date, changeYear, changeMonth }) => (
            <CalendarHeader date={date} changeYear={changeYear} changeMonth={changeMonth} />
          )}
          locale={ko}
          dateFormat="yyyy.MM.dd"
          selected={new Date(date)}
          onChange={handleChangeDate}
          minDate={new Date()}
          selectsEnd
          readOnly={readOnly}
          className="react-datepicker__input-container"
        />
        {/* <CustomDatePicker date={date} methods={methods} readOnly={readOnly} /> */}
      </Styled.Wrapper>
      <Image src={readOnly ? CalendarGreyIc : CalendarIc} alt="캘린더 아이콘" />
    </InputBox>
  );
}

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;

    ${theme.fonts.body12};
  `,
};
