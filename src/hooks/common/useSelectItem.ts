import { useState } from 'react';

export default function useSelectItem() {
  const [selectedId, setSelectedId] = useState(0);
  // const [selectedIdArray, setSelectedIdArray] = useState<Array<Number>>([]);

  function handleSelectOne(id: number) {
    setSelectedId(id);
  }

  function isSelected(id: number) {
    return selectedId === id;
  }

  return { selectedId, handleSelectOne, isSelected };
}
