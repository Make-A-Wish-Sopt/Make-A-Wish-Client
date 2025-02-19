import Button, { ButtonProps } from '@/components/Common/Button';
import { MultiStepType } from '@/hooks/common/useFunnel';

interface StepButtonProps extends ButtonProps {
  label?: string;
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

export default function FunnelStepButton({
  nextButtonProps,
  prevButtonProps,
}: {
  nextButtonProps: StepButtonProps;
  prevButtonProps: StepButtonProps;
}) {
  return (
    <div className="flex justify-between gap-10 pb-58">
      <Button
        onClick={prevButtonProps.onPrevStep}
        fontColor={prevButtonProps.fontColor || 'white'}
        {...prevButtonProps}
      >
        {prevButtonProps.label || '이전'}
      </Button>
      <Button
        onClick={nextButtonProps.onNextStep}
        fontColor={nextButtonProps.fontColor || 'white'}
        {...nextButtonProps}
      >
        {nextButtonProps.label || '다음'}
      </Button>
    </div>
  );
}
