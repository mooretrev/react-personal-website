import express from 'express';
import jwtCheck from '../middleware/jwtCheck.js';
import approved from '../middleware/approvedUser.js';
import StockPosition from '../model/stockPosition';
import saveTradeData from '../scheduledTasks/saveTradeData';

const router = express.Router();

router.get('/', jwtCheck, approved, async (req, res) => {
  try {
    const positions = await StockPosition.find();
    return res.json(positions);
  } catch (err) {
    console.log(err);
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

router.post('/', jwtCheck, approved, async (req, res) => {
  try {
    await saveTradeData();
    return res.sendStatus(204);
  } catch (err) {
    res.status(500);
    return res.json({ errorMesssage: 'There was an error saving the position data' });
  }
});

router.get('/:id');

export default router;
