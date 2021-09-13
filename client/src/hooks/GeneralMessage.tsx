import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';

export interface GeneralMessageProps {
    condition: boolean;
    message: string;
}

export default function GeneralMessage({ condition, message }: GeneralMessageProps): ReactElement {
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
