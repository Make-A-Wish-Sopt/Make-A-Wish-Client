import RadioSelect from './RadioSelect';

export default function SelectBox({ selectState, text }: { selectState: boolean; text: string }) {
  return (
    <div className="flex items-center w-full h-full gap-8">
      <RadioSelect isSelect={selectState} />
      <span className="text-[14px]">{text}</span>
    </div>
  );
}
