import Box from '@/components/Common/Box';
import { colors } from '@/styles/styles';

export function MessageBox({ message }: { message: string }) {
  return (
    <Box
      bgColor="background"
      fontColor="gray1"
      font="galmuri"
      styles={{
        height: 'auto',
        minHeight: '5rem',
        padding: '1.2rem',
        border: `1px solid ${colors.dark_green}`,
      }}
    >
      <span className="text-[14px] text-gray1">{message}</span>
    </Box>
  );
}
