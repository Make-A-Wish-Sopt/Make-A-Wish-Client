import WishesCreateContainer from '@/container/wishes/create/wishes-create.container';
import { render, screen } from '@testing-library/react';

describe('이미지 & 가격 & 초성 입력 >> 데이터 입력', () => {
  const handleSubmit = jest.fn();

  it('가격 표시가 되어있는지', () => {
    render(<WishesCreateContainer />);

    
  });
});

// __tests__/Form.test.tsx

// import userEvent from "@testing-library/user-event";
