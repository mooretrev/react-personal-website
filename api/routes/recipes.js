import express from 'express';
import mongoose from 'mongoose';
import Recipe from '../model/recipe.js';
import jwtCheck from '../jwtCheck.js';

const router = express.Router();

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

router.get('/', (req, res, next) => {
  const token = req.headers.Authorization;
  console.log(`token ${token}`);
  Recipe.find((err, recipes) => {
    if (err) return console.error(err);
    const recipeJson = JSON.stringify(recipes);
    res.send(recipeJson);
    return 0;
  });
});

router.get('/:id', jwtCheck, (req, res, next) => {
  const token = req.headers.aputhorization;
  console.log(`token ${token}`);
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) return console.error(err);
    const recipeJson = JSON.stringify(recipe);
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
    res.end('Done');
    return 0;
  });
});

router.delete('/:id', jwtCheck, (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    res.end('Successful Deletion');
  });
});

export default router;
