"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    username: mongoose_1.default.Schema.Types.String,
    password: mongoose_1.default.Schema.Types.String,
    email: mongoose_1.default.Schema.Types.String,
    approved: {
        type: mongoose_1.default.Schema.Types.Boolean,
        default: false,
    },
    jwtToken: {
        type: mongoose_1.default.Schema.Types.String,
        default: '',
    },
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
