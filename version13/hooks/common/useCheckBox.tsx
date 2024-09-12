import { useEffect, useState } from 'react';

export default function useCheckBox() {
  const [checkBoxState, setCheckBoxState] = useState(false);

  useEffect(() => {
    setCheckBoxState(false);
  }, []);

  const handleChangeCheckBoxState = () => {
    setCheckBoxState(!checkBoxState);
  };

  return { checkBoxState, handleChangeCheckBoxState };
}
