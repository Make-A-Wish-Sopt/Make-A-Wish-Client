import { convertDateToString } from '@/utils/date';
import Box from '../Box';
import CalendarIcon from '../Icon/CalendarIcon';

export default function CalendarDateBox({ date, readonly }: { date?: Date; readonly?: boolean }) {
  return (
    <Box className={`flex justify-between items-center `}>
      <p className={` font-galmuri text-[14px] ${readonly ? 'text-gray2' : 'text-white'}`}>
        {convertDateToString(date)}
      </p>
      <CalendarIcon color={readonly ? 'gray2' : 'white'} />
    </Box>
  );
}
