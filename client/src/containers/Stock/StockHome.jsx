import React from 'react';
import PositionSizeCalculator from '../../components/Stock/PositionSizeCalculator.jsx';
import PreviousPositionsTable from '../../components/Stock/PreviousPositionsTable.tsx';

function StockHome() {
  return (
    <div>
      <PositionSizeCalculator risk={0.02} />
      <PreviousPositionsTable />
    </div>
  );
}

export default StockHome;
