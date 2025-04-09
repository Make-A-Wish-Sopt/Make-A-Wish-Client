'use client';

import { useEffect, useState } from 'react';
import useModals from './useModals';
import ClipLoader from 'react-spinners/ClipLoader';
import { colors } from '@/styles/styles';

export type FetchStatusType = 'idle' | 'loading' | 'success' | 'error';

export const useFetch = <T, A extends unknown[]>(fetch: (...args: A) => Promise<T>) => {
  const [status, setStatus] = useState<FetchStatusType>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const { Modal, openModal, closeModal } = useModals<['loading']>();

  const changeStatus = (state: FetchStatusType) => {
    setStatus(state);
  };

  const delayFetchData = (delayMs: number, ...args: A) => {
    setStatus('loading');

    setTimeout(() => {
      fetchData(...args);
    }, delayMs || 1000);
  };

  const fetchData = async (...args: A) => {
    setStatus('loading');
    try {
      const result = await fetch(...args);
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'loading') {
      openModal('loading');
    } else {
      closeModal('loading');
    }
  }, [status]);

  const LoadingModal = ({ render }: { render: JSX.Element }) => {
    if (status !== 'loading') return null;

    return (
      <Modal modalKey="loading">
        <Modal.ModalOverlay>{render}</Modal.ModalOverlay>
      </Modal>
    );
  };

  return { status, data, error, fetchData, delayFetchData, changeStatus, LoadingModal };
};
