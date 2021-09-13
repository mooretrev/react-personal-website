import express from 'express';
import { join } from 'path';

const router = express.Router();

/* GET home page. */
router.get('/', () => {
  join(__dirname, '../client/build', 'index.html');
});

export default router;
