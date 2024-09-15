import Image from 'next/image';
import { ko } from 'date-fns/locale';
import { UseFormReturn } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarHeader from './CalendarHeader';
import { getDate } from '@/utils/common/getDate';
import { CalendarGreyIc, CalendarIc } from '../../../../public/assets/icons';

import Box from '../Box';
import { WishesLinkDataType } from '@/types/input';

interface CalendarProps {
  date: Date;
  methods: UseFormReturn<WishesLinkDataType, any, undefined>;
  readOnly?: boolean;
}

export default function Calendar(props: CalendarProps) {
  const { date, methods, readOnly } = props;

  const handleChangeDate = (selectedDate: Date) => {
    methods.setValue('startDate', selectedDate);
    methods.setValue('endDate', getDate(selectedDate, 7));
  };

  return (
    <Box bgColor="dark_blue" fontColor={readOnly ? 'gray2' : 'white'}>
      <div className="flex justify-between items-center w-full h-full text-[12px] font-galmuri">
        <DatePicker
          renderCustomHeader={({ date, changeYear, changeMonth }) => (
            <CalendarHeader date={date} changeYear={changeYear} changeMonth={changeMonth} />
          )}
          locale={ko}
          dateFormat="yyyy.MM.dd"
          selected={new Date(date)}
          onChange={() => handleChangeDate(date)}
          minDate={new Date()}
          selectsEnd
          readOnly={readOnly}
          className="react-datepicker__input-container"
        />
        <Image src={readOnly ? CalendarGreyIc : CalendarIc} alt="캘린더 아이콘" />
      </div>
    </Box>
  );
}
