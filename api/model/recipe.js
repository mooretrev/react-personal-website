import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  recipe_name: String,
  recipe_items: [{
    recipe_item: String,
    ingredients: [{
      ingredient: String,
      size: String,
      unit: String,
    }],
  }],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
