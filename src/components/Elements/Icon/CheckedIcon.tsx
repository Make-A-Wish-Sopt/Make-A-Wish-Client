import { colors, ColorsTypes } from '@/styles/styles';

export default function CheckedIcon({
  bgColor = 'main_blue',
  iconColor = 'white',
  width = 14,
}: {
  bgColor?: keyof ColorsTypes;
  iconColor?: keyof ColorsTypes;
  width: number;
}) {
  return (
    <svg
      width={width}
      viewBox={'0 0 14 14'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: colors[bgColor], aspectRatio: 1 / 1 }}
    >
      <rect width="14" height="14" rx="7" />
      <rect x="3" y="6.92859" width="1.14286" height="1.14286" fill={colors[iconColor]} />
      <rect x="4.14258" y="8.07141" width="1.14286" height="1.14286" fill={colors[iconColor]} />
      <rect x="5.28516" y="9.21423" width="1.14286" height="1.14286" fill={colors[iconColor]} />
      <rect x="6.42773" y="8.07141" width="1.14286" height="1.14286" fill={colors[iconColor]} />
      <rect x="7.57227" y="6.92859" width="1.14286" height="1.14286" fill={colors[iconColor]} />
      <rect x="8.71484" y="5.78564" width="1.14286" height="1.14286" fill={colors[iconColor]} />
      <rect x="9.85742" y="4.64282" width="1.14286" height="1.14286" fill={colors[iconColor]} />
    </svg>
  );
}

export function WarningCheckedIcon({
  bgColor = 'main_blue',
  iconColor = 'white',
  width = 14,
}: {
  bgColor?: keyof ColorsTypes;
  iconColor?: keyof ColorsTypes;
  width: number;
}) {
  return (
    <svg
      width={width}
      viewBox={'0 0 14 14'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: colors[bgColor], aspectRatio: 1 / 1 }}
    >
      <rect width="14" height="14" rx="7" fill="#BE2121" />
      <path
        d="M6.16829 2.33333H7.00163V9H6.16829V2.33333ZM6.16829 9.83333H7.00163V11.5H6.16829V9.83333Z"
        fill="white"
      />
    </svg>
  );
}
