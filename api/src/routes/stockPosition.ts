import express from 'express';
import jwtCheck from '../middleware/jwtCheck';
import approved from '../middleware/approvedUser';
import StockPosition from '../model/stockPosition';
import saveTradeData from '../scheduledTasks/saveTradeData';
import validStockDate from '../middleware/validStockDate';

export interface StockPositionPostBody {
  startDate: Date;
  endDate: Date;
}

const router = express.Router();

router.get('/', jwtCheck, approved, async (req, res) => {
  try {
    const positions = await StockPosition.find().sort({ exitDate: 'desc', entryDate: 'desc' });
    return res.json(positions);
  } catch (err) {
    res.status(500);
    return res.json({
      errorMessage: 'There was an error in getting the stock position data',
    });
  }
});

router.get('/:id', jwtCheck, approved, async (req, res) => {
  try {
    const position = await StockPosition.findById(req.params.id);
    if (position === null) {
      res.status(404);
      return res.json({
        errorMessage: `Could not find stock position with id ${req.params.id}`,
      });
    }
    return res.json(position.toJSON({ virtuals: true }));
  } catch (err) {
    res.status(500);
    return res.json({
      errorMessage: 'There was an error in trying to find the stock position',
    });
  }
});

router.post('/', jwtCheck, approved, validStockDate, async (req, res) => {
  try {
    await saveTradeData(req.body.startDate, req.body.endDate);
    return res.sendStatus(204);
  } catch (err) {
    res.status(500);
    return res.json({ errorMessage: 'Server side error saving or getting previous stock positions.' });
  }
});

export default router;
