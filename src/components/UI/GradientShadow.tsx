export default function GradientShadow({ height }: { height: number }) {
  return (
    <div
      className={`sticky bottom-0 w-full h-${height} bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]`}
    />
  );
}
