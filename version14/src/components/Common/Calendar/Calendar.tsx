import Image from 'next/image';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { UseFormReturn } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarHeader from './CalendarHeader';
import { getDate } from '@/utils/common/getDate';
import { CalendarGreyIc, CalendarIc } from '../../../../public/assets/icons';
import Box, { LargeBoxStyle } from '../Box';
import { WishesDataType } from '@/types/wishes/create/wishesCreateDataType';

interface CalendarProps {
  date: Date;
  methods: UseFormReturn<WishesDataType, any, undefined>;
  readOnly?: boolean;
}

export default function Calendar(props: CalendarProps) {
  const { date, methods, readOnly } = props;

  const handleChangeDate = (selectedDate: Date) => {
    methods.setValue('startDate', selectedDate);
    methods.setValue('endDate', getDate(selectedDate, 7));
  };

  return (
    <Box style={LargeBoxStyle} colorSystem={readOnly ? 'darkGreen_gray2' : 'darkGreen_white'}>
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
      </Styled.Wrapper>
      <Image src={readOnly ? CalendarGreyIc : CalendarIc} alt="캘린더 아이콘" />
    </Box>
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
