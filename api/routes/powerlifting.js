import express from 'express';

const router = express.Router();
/* eslint-disable no-unused-vars */

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('recipes');
});

export default router;
