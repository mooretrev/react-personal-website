import React from 'react';
import PreviousPositionsTable from '../../components/Stock/PreviousPositionsTable';
import FindPreviousPositionsForm from '../../components/Stock/FindPreviousPositionsForm';

export default function PreviousPositionsPage() {
  return (
    <>
      <FindPreviousPositionsForm />
      <PreviousPositionsTable />
    </>
  );
}
