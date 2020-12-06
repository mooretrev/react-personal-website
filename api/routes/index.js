import express from 'express';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';
import dirnamePath from '../dirname.js';

// setup dirnamePath
// const filenameTemp = fileURLToPath(import.meta.url);
// const dirnamePath = dirname(filenameTemp);

const router = express.Router();

/* GET home page. */
router.get('/', () => {
  // join(dirnamePath, '../client/build', 'index.html');
});

export default router;
