import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Recipe from './recipe.js';

// set up dir name
const filenameTemp = fileURLToPath(import.meta.url);
const dirnamePath = dirname(filenameTemp);

// .env config
dotenv.config({ path: `${dirnamePath}/.env` });

// mongoose connect
const url = `mongodb+srv://Personal-Website:${process.env.MONGO_DB_PASSWORD}@cluster0.e4wxl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Sucessfull Connected to DB');
});

Recipe.remove({}, () => { console.log('done'); });

// seeding
const hotCholocate = new Recipe({
  _id: mongoose.Types.ObjectId(),
  recipe_name: 'Hot Cholocate',
  recipe_items: [{
    recipe_item: 'Ingredients',
    ingredients: [
      {
        ingredient: 'Unsweetened Cocoa Powder',
        size: '2 Tbsp',
      },
      {
        ingredient: 'Brown Sugar',
        size: '1.5 Tbsp',
      },
      {
        ingredient: 'Milk',
        size: '1 Cup',
      },
      {
        ingredient: 'Vanilla Extract',
        size: '1/4 Tsp',
      },
      {
        ingredient: 'Milk',
        size: '1 Cup',
      },
      {
        ingredient: 'Salt',
        size: 'A pinch',
      },
    ],
  }],
});

hotCholocate.save((err, item) => {
  if (err) return console.error(err);
  return console.log(item);
});
