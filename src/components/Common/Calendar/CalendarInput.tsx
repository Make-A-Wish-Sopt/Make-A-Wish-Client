import useToggle from '@/hooks/common/useToggle';
import Box from '../Box';
import Calendar from './Calendar';
import { convertDateToString } from '@/utils/common/getDate';
import CalendarIcon from '../Icon/CalendarIcon';

export default function CalendarInput({
  date,
  handleChangeDate,
  readonly,
}: {
  date?: Date;
  handleChangeDate?: (selectDate: Date) => void;
  readonly?: boolean;
}) {
  const { state: calendarOpenState, handleState: handleChangeCalendarOpenState } = useToggle();

  function handleClick() {
    if (readonly) return;

    handleChangeCalendarOpenState();
  }

  function ChangeDate(selectDate: Date) {
    handleChangeDate(selectDate);
    handleChangeCalendarOpenState();
  }

  return (
    <>
      <Box
        onClick={handleClick}
        styles={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
      >
        <div
          className={`flex items-center justify-between w-full h-full font-galmuri text-[14px]  text-${readonly ? 'gray2' : 'white'}`}
        >
          {convertDateToString(date)}
          <CalendarIcon color={readonly ? 'gray2' : 'white'} />
        </div>
      </Box>

      <Calendar
        date={date}
        ChangeDate={ChangeDate}
        isOpen={calendarOpenState}
        style={{
          position: 'absolute',
          marginTop: '7rem',
          backgroundColor: '#001D26',
          transformOrigin: 'top left',
        }}
      />
    </>
  );
}
