import React, { ReactElement, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GeneralMessage from './GeneralMessage';

export interface UseApiInterface {
    render: () => ReactElement;
    loading: boolean;
    error: boolean;
    success: boolean;
    setLoading: (value: boolean) => void;
    setError: (value: boolean) => void;
    setSuccess: (value: boolean) => void;
    setContent: (value: ReactElement) => void;
}
export default function useApi(): UseApiInterface {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  let content: ReactElement;

  const setContent = (value: ReactElement) => {
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
