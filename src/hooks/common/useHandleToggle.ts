import { useModalContext } from '@/Context/modalContext';

export default function useHandleModalState<T>(key: keyof T) {
  const { state, update } = useModalContext<T>();

  function getModalState() {
    return state[key];
  }

  function handleModalState() {
    update({
      ...state,
      [key]: !state[key],
    });
  }

  return { getModalState, handleModalState };
}
