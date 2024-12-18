import { DayPicker, NextMonthButtonProps, PreviousMonthButtonProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import ArrowIcon from '../Icon/ArrowIcon';
import { CSSProperties } from 'react';

interface CalendarProps {
  date: Date;
  isOpen: boolean;
  ChangeDate?: (selectedDate: Date) => void;
  style?: CSSProperties;
}

export default function Calendar(props: CalendarProps) {
  const { date, ChangeDate, isOpen, style } = props;

  return (
    <DayPicker
      mode="single"
      selected={date}
      onSelect={ChangeDate}
      locale={ko}
      components={{
        NextMonthButton: (props: NextMonthButtonProps) => (
          <button {...props} className="mr-10 mt-15 ml-25">
            <ArrowIcon />
          </button>
        ),
        PreviousMonthButton: (props: PreviousMonthButtonProps) => (
          <button {...props} className="rotate-180 mt-15">
            <ArrowIcon />
          </button>
        ),
      }}
      className={`flex justify-center items-center w-full max-w-[331px] aspect-square text-main_blue rounded-2xl  text-[14px] p-15 z-10 transition-all duration-300 ${isOpen ? 'w-full opacity-100 scale-100' : 'w-0 opacity-0 scale-0'}`}
      classNames={{
        weekday: 'font-bold text-[18px]',
        month_caption: 'font-bold mb-20',
        caption_label: 'text-[24px]',
        selected: 'bg-main_blue text-white rounded-full',
        today: 'text-bold',
        disabled: 'text-gray2',
      }}
      disabled={{ before: new Date() }}
      style={style}
    />
  );
}
