interface GradientShadowProps {
  height: number | string;
}

export default function GradientShadow({ height }: GradientShadowProps) {
  const computedHeight = typeof height === 'number' ? `${height}rem` : height;

  return (
    <svg
      className="fixed bottom-0 z-[10] left-0 w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: computedHeight }}
    >
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(4,6,31,0)" />
          <stop offset="100%" stopColor="rgba(4,6,31,1)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  );
}
