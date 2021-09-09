import { Typography } from '@material-ui/core';
import React from 'react';

export interface GeneralMessageProps {
    condition: boolean;
    message: string;
}

export default function GeneralMessage({ condition, message }: GeneralMessageProps) {
  const content = (
    <Typography variant="body1">
      {message}
    </Typography>
  );
  return (
    <>
      {condition && content}
    </>
  );
}
