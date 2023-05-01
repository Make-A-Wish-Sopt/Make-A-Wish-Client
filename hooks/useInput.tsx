import { useState, useCallback } from 'react';

export default function useInput(initValue: string, inputLimit: number) {
  const [value, setValue] = useState(initValue);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //-1일 경우 입력제한이 없는 Input (ex. 링크, 계좌번호)
    if (e.currentTarget.value.length <= inputLimit || inputLimit === -1) {
      setValue(e.currentTarget.value);
    }
  }, []);
  return [value, changeInput] as const;
}
