import { PropsWithChildren } from 'react';
import { colors } from '@/styles/styles';
import Box from '../Elements/Box';

export default function BorderBox({ children }: PropsWithChildren) {
  return (
    <Box
      bgColor="background"
      fontColor="gray1"
      font="galmuri"
      styles={{
        height: 'auto',
        padding: '1rem',
        border: `1px solid ${colors.dark_green}`,
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </Box>
  );
}
