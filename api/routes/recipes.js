import express from 'express';
import mongoose from 'mongoose';
import Recipe from '../model/recipe.js';
import jwtCheck from '../jwtCheck.js';

const router = express.Router();

/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

router.get('/', (req, res, next) => {
  Recipe.find((err, recipes) => {
    if (err) return res.status(404);
    const recipeJson = JSON.stringify(recipes);
    res.send(recipeJson);
    return 0;
  });
});


router.get('/:id', (req, res, next) => {
  const token = req.headers.aputhorization;
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) return res.status(404);
    const recipeJson = JSON.stringify(recipe);
    if (recipe == null) {
      res.sendStatus(404);
      return 0;
    }
    res.send(recipeJson);
    return 0;
  });
});

router.post('/', jwtCheck, (req, res, next) => {
  const recipeBody = req.body;
  recipeBody._id = mongoose.Types.ObjectId();
  Recipe.create(recipeBody, (err, recipe) => {
    if (err) return handleError(err);
    res.end(JSON.stringify(recipe));
    return 0;
  });
});

router.put('/:id', jwtCheck, (req, res, next) => {
  const recipeBody = req.body;
  Recipe.findOneAndUpdate({ _id: req.params.id }, recipeBody, (err, doc) => {
    if (err) return handleError(err);
    res.end(JSON.stringify(doc));
    return 0;
  });
});

router.delete('/:id', jwtCheck, (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(404);
    res.end('Successful Deletion');
    return 0;
  });
});

export default router;
