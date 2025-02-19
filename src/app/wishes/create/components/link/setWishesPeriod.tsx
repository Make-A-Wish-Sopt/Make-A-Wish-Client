'use client';

import CalendarInput from '@/components/Common/Calendar/CalendarInput';
import { getDate } from '@/utils/common/getDate';
import { WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { useFormContext, useWatch } from 'react-hook-form';

export default function SetWishesPeriod({ disabled }: { disabled?: boolean }) {
  const { control, setValue } = useFormContext<WishesLinkDataResolverType>();
  const [startDateWatch, endDateWatch] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  function handleChangeDate(selectedDate: Date) {
    setValue('startDate', selectedDate);
    setValue('endDate', getDate(selectedDate, 7));
  }

  return (
    <div className="flex justify-between gap-10">
      <CalendarInput
        date={startDateWatch}
        handleChangeDate={handleChangeDate}
        readonly={disabled}
      />
      <CalendarInput date={endDateWatch} readonly />
    </div>
  );
}
