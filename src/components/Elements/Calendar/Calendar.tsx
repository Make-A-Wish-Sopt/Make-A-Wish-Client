import React, { CSSProperties } from 'react';
import { DayPicker, NextMonthButtonProps, PreviousMonthButtonProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import ArrowIcon from '../Icon/ArrowIcon';

interface CalendarProps {
  date: Date;
  isOpen: boolean;
  changeDate?: (selectedDate: Date) => void;
  style?: CSSProperties;
}

// 🔽 컴포넌트 외부로 분리
function NextMonthArrowButton(buttonProps: NextMonthButtonProps) {
  return (
    <button
      {...buttonProps}
      type="button"
      className="mr-10 mt-15 ml-25"
      aria-label="다음 달로 이동"
    >
      <ArrowIcon />
    </button>
  );
}

function PreviousMonthArrowButton(buttonProps: PreviousMonthButtonProps) {
  return (
    <button {...buttonProps} type="button" className="rotate-180 mt-15" aria-label="이전 달로 이동">
      <ArrowIcon />
    </button>
  );
}

export default function Calendar({ date, changeDate, isOpen, style }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={date}
      onSelect={changeDate}
      locale={ko}
      components={{
        NextMonthButton: NextMonthArrowButton,
        PreviousMonthButton: PreviousMonthArrowButton,
      }}
      className={`flex justify-center items-center w-full max-w-[331px] aspect-square text-main_blue rounded-2xl text-[14px] p-15 z-10 transition-all duration-300 ${
        isOpen ? 'w-full opacity-100 scale-100' : 'w-0 opacity-0 scale-0'
      }`}
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
