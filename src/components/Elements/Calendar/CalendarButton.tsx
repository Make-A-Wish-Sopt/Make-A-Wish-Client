import useBoolean from '@/hooks/useBoolean';
import Box from '../Box';
import Calendar from './Calendar';
import { convertDateToString } from '@/utils/common/getDate';
import CalendarIcon from '../Icon/CalendarIcon';

export default function CalendarButton({
  date,
  handleChangeDate,
  readonly,
}: {
  date?: Date;
  handleChangeDate?: (selectDate: Date) => void;
  readonly?: boolean;
}) {
  const { state: calendarOpenState, handleState: handleChangeCalendarOpenState } = useBoolean();

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
      <Box styles={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleClick}
          className={`flex items-center justify-between w-full h-full font-galmuri text-[14px]  text-${readonly ? 'gray2' : 'white'}`}
        >
          {convertDateToString(date)}
          <CalendarIcon color={readonly ? 'gray2' : 'white'} />
        </button>
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
