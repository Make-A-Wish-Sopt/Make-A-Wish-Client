import StepInputProvider from '@/context/stepInputContext';
import { render } from '@testing-library/react';

export const renderWithContext = (ui: any, options?: any) => {
  render(ui, {
    wrapper: StepInputProvider,
    ...options,
  });
};
