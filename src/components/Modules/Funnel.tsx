import { ExtractStepNames, FunnelStepsType } from '@/hooks/useFunnel';
import { Children, PropsWithChildren, ReactElement, ReactNode } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface StepButtonsProps extends PropsWithChildren {
  className?: string;
  fixedBottom?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
}

export const Step = ({ name, children }: StepProps) => {
  return <div key={name}>{children}</div>;
};

Step.Title = ({ children, className }: { className?: string } & PropsWithChildren) => {
  return <div className={`${className || ''}`}>{children}</div>;
};

Step.FormSection = ({ children, className }: { className?: string } & PropsWithChildren) => {
  return <section className={`${className || ''}`}>{children}</section>;
};

Step.ButtonWrapper = ({
  className,
  fixedBottom,
  vertical,
  horizontal,
  children,
}: StepButtonsProps) => {
  return (
    <div
      className={`${fixedBottom ? 'fixed bottom-fixed-bottom left-1/2 transform -translate-x-1/2 w-375 px-22' : ''} ${vertical && 'flex flex-col'} ${horizontal && 'flex'} ${className}`}
    >
      {children}
    </div>
  );
};

export const Funnel = <T extends FunnelStepsType>({
  children,
  current,
}: {
  children: ReactNode;
  current: ExtractStepNames<T>;
}) => {
  const matched = Children.toArray(children).find(
    (child) => (child as ReactElement).key === `.$${current}`,
  );

  return <>{matched}</>;
};
