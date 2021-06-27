"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
function mealPlanValidator(value) {
    return value === this.mealPlan.length;
}
var mealPlanSchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    date: { type: Date, required: true },
    startDay: { type: String, required: true },
    numDaysPlanned: { type: Number, required: mealPlanValidator },
    mealPlan: [{
            day: String,
            meals: Array,
        }],
});
var Recipe = mongoose_1.default.model('MealPlan', mealPlanSchema);
exports.default = Recipe;
