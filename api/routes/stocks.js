import express from 'express';
import Position from '../model/position.js';
import jwtCheck from '../middleware/jwtCheck.js';
import startPositions from './td_api_helpers/startPositions.js';
import closePositions from './td_api_helpers/closePositions.js';

const router = express.Router();
/* eslint-disable no-unused-vars */

/* GET home page. */
router.get('/positions', jwtCheck, async (req, res) => {
  await startPositions();
  await closePositions();
  Position.find((err, recipes) => {
    if (err) return res.status(404);
    const positionJson = JSON.stringify(recipes);
    res.send(positionJson);
    return 0;
  });
});
