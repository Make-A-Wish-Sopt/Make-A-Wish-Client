'use client';

import { useState } from 'react';

export default function useSelectItem() {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedIdArray, setSelectedIdArray] = useState<Array<number>>([]);

  function handleSelectOne(id: number) {
    setSelectedId(id);
  }

  function isSelected(id: number) {
    return selectedId === id;
  }

  function addToDeleteIdList(addItemId: number) {
    setSelectedIdArray([...selectedIdArray, addItemId]);
  }

  function removeToDeleteIdList(removeItemId: number) {
    setSelectedIdArray([
      ...selectedIdArray.filter((id) => id !== removeItemId),
    ]);
  }

  return {
    selectedId,
    handleSelectOne,
    isSelected,
    selectedIdArray,
    addToDeleteIdList,
    removeToDeleteIdList,
  };
}
