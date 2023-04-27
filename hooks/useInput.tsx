import { useState, useCallback } from 'react';

export default function useInput(initValue: string, maxInput: number) {
  const [value, setValue] = useState(initValue);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length <= maxInput && setValue(e.currentTarget.value);
  }, []);
  return [value, changeInput] as const;
}
