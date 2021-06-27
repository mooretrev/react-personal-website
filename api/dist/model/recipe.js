"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var recipeSchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
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
var Recipe = mongoose_1.default.model('Recipe', recipeSchema);
exports.default = Recipe;
