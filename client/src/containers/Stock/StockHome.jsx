import React from 'react';
import PositionSizeCalculator from '../../components/Stock/PositionSizeCalculator.jsx';

function StockHome() {
  return (
    <div>
      <PositionSizeCalculator risk={0.02} />
    </div>
  );
}

export default StockHome;
