export default function DayCountText({ dayCount }: { dayCount?: number }) {
  return (
    <div className="w-full text-right px-5 mt-8">
      <span className="text-[20px] font-bitbit text-main_blue">
        {dayCount ? `D-${dayCount}` : 'D-?'}
      </span>
    </div>
  );
}
