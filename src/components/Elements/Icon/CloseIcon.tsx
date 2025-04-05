import { colors, ColorsTypes } from '@/styles/styles';

export default function CloseIcon({ color = 'main_blue' }: { color?: keyof ColorsTypes }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: colors[color] }}
    >
      <rect x="2.28125" y="2.28516" width="2.28571" height="2.28571" />
      <rect width="2.28571" height="2.28571" />
      <rect x="13.7188" width="2.28571" height="2.28571" />
      <rect x="11.4297" y="2.28516" width="2.28571" height="2.28571" />
      <rect x="4.57031" y="4.57178" width="2.28571" height="2.28571" />
      <rect width="2.28571" height="2.28571" transform="matrix(1 0 0 -1 2.28125 13.7148)" />
      <rect x="9.14062" y="4.57178" width="2.28571" height="2.28571" />
      <rect width="2.28571" height="2.28571" transform="matrix(1 0 0 -1 0 16)" />
      <rect width="2.28571" height="2.28571" transform="matrix(1 0 0 -1 13.7188 16)" />
      <rect width="2.28571" height="2.28571" transform="matrix(1 0 0 -1 11.4297 13.7148)" />
      <rect width="2.28571" height="2.28571" transform="matrix(1 0 0 -1 4.57031 11.4282)" />
      <rect x="6.85938" y="6.85693" width="2.28571" height="2.28571" />
      <rect width="2.28571" height="2.28571" transform="matrix(1 0 0 -1 9.14062 11.4282)" />
    </svg>
  );
}
