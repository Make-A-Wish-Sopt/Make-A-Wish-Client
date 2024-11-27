import { PropsWithChildren } from 'react';
import Box from '../Common/Box';
import { colors } from '@/styles/styles';

export default function BorderBox({ children }: PropsWithChildren) {
  return (
    <Box
      bgColor="background"
      fontColor="gray1"
      font="galmuri"
      styles={{
        height: 'auto',
        minHeight: '5rem',
        padding: '1rem',
        border: `1px solid ${colors.dark_green}`,
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </Box>
  );
}
