import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PositionSizeCalculator from '../../components/Stock/PositionSizeCalculator.jsx';

function StockHome() {
  const history = useHistory();

  return (
    <div>
      <PositionSizeCalculator risk={0.02} />
      <Button style={{ marginTop: '10px' }} color="primary" variant="contained" onClick={() => history.push('/stock/previousPositions')}>Previous Positions Table</Button>
    </div>
  );
}

export default StockHome;
