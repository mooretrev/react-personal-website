import React, { ReactNode, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GeneralMessage from './GeneralMessage';

export interface UseApiInterface {
    render: () => ReactNode;
    loading: boolean;
    error: boolean;
    success: boolean;
    setLoading: (value: boolean) => void;
    setError: (value: boolean) => void;
    setSuccess: (value: boolean) => void;
    setContent: (value: ReactNode) => void;
}
export default function useApi(): UseApiInterface {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  let content: ReactNode;

  const setContent = (value: ReactNode) => {
    content = value;
  };
  const render = () => {
    const condition = !loading && !success && !error;
    return (
      <>
        {loading && <CircularProgress />}
        <GeneralMessage condition={success} message="Operation was successful." />
        <GeneralMessage condition={error} message="Operation failed." />
        {condition && content}
      </>
    );
  };
  return {
    render, loading, error, success, setContent, setLoading, setSuccess, setError,
  };
}
