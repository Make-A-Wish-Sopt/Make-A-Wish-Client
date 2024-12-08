import { colors, ColorsTypes } from '@/styles/styles';

export default function CheckedIcon({ bgColor = 'main_blue' }: { bgColor?: keyof ColorsTypes }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: colors[bgColor] }}
    >
      <rect width="14" height="14" rx="7" />
      <rect x="3" y="6.92859" width="1.14286" height="1.14286" fill="white" />
      <rect x="4.14258" y="8.07141" width="1.14286" height="1.14286" fill="white" />
      <rect x="5.28516" y="9.21423" width="1.14286" height="1.14286" fill="white" />
      <rect x="6.42773" y="8.07141" width="1.14286" height="1.14286" fill="white" />
      <rect x="7.57227" y="6.92859" width="1.14286" height="1.14286" fill="white" />
      <rect x="8.71484" y="5.78564" width="1.14286" height="1.14286" fill="white" />
      <rect x="9.85742" y="4.64282" width="1.14286" height="1.14286" fill="white" />
    </svg>
  );
}
