import express from 'express';
import mongoose from 'mongoose';
import MealPlan from '../model/mealPlan.js';
import jwtCheck from '../jwtCheck.js';

const router = express.Router();

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

router.get('/', (req, res, next) => {
  MealPlan.find((err, mealPlan) => {
    if (err) return res.status(404);
    const mealPlanJson = JSON.stringify(mealPlan);
    res.send(mealPlanJson);
    return 0;
  });
});

router.get('/:id', (req, res, next) => {
  const token = req.headers.aputhorization;
  MealPlan.findById(req.params.id, (err, mealPlan) => {
    if (err) return res.status(404);
    const mealPlanJson = JSON.stringify(mealPlan);
    if (mealPlan == null) {
      res.sendStatus(404);
      return 0;
    }
    res.send(mealPlanJson);
    return 0;
  });
});

router.post('/', jwtCheck, (req, res, next) => {
  const mealPlanBody = req.body;
  mealPlanBody._id = mongoose.Types.ObjectId();
  MealPlan.create(mealPlanBody, (err, mealPlan) => {
    if (err) return handleError(err);
    res.end(JSON.stringify(mealPlan));
    return 0;
  });
});

router.put('/:id', jwtCheck, (req, res, next) => {
  const mealPlanBody = req.body;
  MealPlan.findOneAndUpdate({ _id: req.params.id }, mealPlanBody, (err, doc) => {
    if (err) return handleError(err);
    res.end(JSON.stringify(doc));
    return 0;
  });
});

router.delete('/:id', jwtCheck, (req, res, next) => {
  MealPlan.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(404);
    res.end('Successful Deletion');
    return 0;
  });
});

export default router;
