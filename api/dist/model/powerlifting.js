"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var powerliftingSchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
});
var Powerlifting = mongoose_1.default.model('Powerlifting', powerliftingSchema);
exports.default = Powerlifting;
