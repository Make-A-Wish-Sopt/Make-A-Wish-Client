import IndexPage from '@/app/(main)/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Header Test', () => {
  it('renders a heading', () => {
    render(<IndexPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
