import React, { ReactElement } from 'react';
import PreviousPositionsTable from '../../components/Stock/PreviousPositionsTable';
import FindPreviousPositionsForm from '../../components/Stock/FindPreviousPositionsForm';

export default function PreviousPositionsPage(): ReactElement {
  return (
    <>
      <FindPreviousPositionsForm />
      <PreviousPositionsTable />
    </>
  );
}
