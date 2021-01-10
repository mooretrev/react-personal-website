import express from 'express';
import mongoose from 'mongoose';
import jwtCheck from '../jwtCheck.js';

export default function restfulRouter(model) {
  const router = express.Router();

  /* eslint-disable no-unused-vars */
  /* eslint-disable no-undef */

  router.get('/', (req, res, next) => {
    model.find((err, response) => {
      if (err) return res.status(404);
      const responseJson = JSON.stringify(response);
      res.send(responseJson);
      return 0;
    });
  });

  router.get('/:id', (req, res, next) => {
    const token = req.headers.authorization;
    model.findById(req.params.id, (err, response) => {
      if (err) return res.status(404);
      const responseJson = JSON.stringify(response);
      if (response == null) {
        res.sendStatus(404);
        return 0;
      }
      res.send(responseJson);
      return 0;
    });
  });

  router.post('/', jwtCheck, (req, res, next) => {
    const modelBody = req.body;
    modelBody._id = mongoose.Types.ObjectId();
    model.create(modelBody, (err, response) => {
      if (err) return handleError(err);
      res.end(JSON.stringify(response));
      return 0;
    });
  });

  router.put('/:id', jwtCheck, (req, res, next) => {
    const responseBody = req.body;
    model.findOneAndUpdate({ _id: req.params.id }, responseBody, (err, doc) => {
      if (err) return handleError(err);
      res.end(JSON.stringify(doc));
      return 0;
    });
  });

  router.delete('/:id', jwtCheck, (req, res, next) => {
    model.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return res.status(404);
      res.end('Successful Deletion');
      return 0;
    });
  });

  return router;
}
