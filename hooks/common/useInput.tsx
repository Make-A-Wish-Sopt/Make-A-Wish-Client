import { useState, useCallback } from 'react';

export default function useInput(initValue: string, inputLimit?: number) {
  const [value, setValue] = useState(initValue);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      if (inputLimit && e.currentTarget.value.length <= inputLimit) {
        setValue(e.currentTarget.value);
      }
    },
    [],
  );
  return [value, handleChangeInput] as const;
}
