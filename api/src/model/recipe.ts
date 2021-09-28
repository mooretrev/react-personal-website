/* eslint-disable camelcase */
import mongoose, { Schema, Document } from 'mongoose';

export interface Ingredient {
  ingredient: string;
  size: string;
  unit: string;
}

export interface RecipeItem {
  recipe_item: string;
  ingredients: Ingredient[]
}

export interface RecipeModel {
  recipe_name: string;
  recipes_items: RecipeItem[]
}

export interface RecipeInterface extends RecipeModel, Document { }

const recipeSchema = new Schema<RecipeInterface>({
  _id: mongoose.Schema.Types.ObjectId,
  recipe_name: { type: String, required: true },
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
