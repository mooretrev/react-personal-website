import mongoose from 'mongoose';

const { Schema } = mongoose;

const shoppingListSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mealPlanId: mongoose.Schema.Types.ObjectId,
  shoppingList: [{
    ingredient: String,
    selected: Boolean,
  }],
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;
