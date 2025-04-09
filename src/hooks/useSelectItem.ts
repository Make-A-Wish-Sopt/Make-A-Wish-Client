'use client';

import { useCallback, useMemo, useState } from 'react';

export default function useSelectItem() {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedIdArray, setSelectedIdArray] = useState<number[]>([]);

  const handleSelectOne = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const isSelected = useCallback((id: number) => selectedId === id, [selectedId]);

  const addToDeleteIdList = useCallback((addItemId: number) => {
    setSelectedIdArray((prev) => (prev.includes(addItemId) ? prev : [...prev, addItemId]));
  }, []);

  const cancelToDeleteIdList = useCallback((removeItemId: number) => {
    setSelectedIdArray((prev) => prev.filter((id) => id !== removeItemId));
  }, []);

  const value = useMemo(
    () => ({
      selectedId,
      handleSelectOne,
      isSelected,
      selectedIdArray,
      addToDeleteIdList,
      cancelToDeleteIdList,
    }),
    [
      selectedId,
      handleSelectOne,
      isSelected,
      selectedIdArray,
      addToDeleteIdList,
      cancelToDeleteIdList,
    ],
  );

  return value;
}
