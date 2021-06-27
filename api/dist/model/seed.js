"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var path_1 = require("path");
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var recipe_js_1 = __importDefault(require("./recipe.js"));
// set up dir name
var filenameTemp = url_1.fileURLToPath(import.meta.url);
var dirnamePath = path_1.dirname(filenameTemp);
// .env config
dotenv_1.default.config({ path: dirnamePath + "/.env" });
// mongoose connect
var url = "mongodb+srv://Personal-Website:" + process.env.MONGO_DB_PASSWORD + "@cluster0.e4wxl.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose_1.default.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Sucessfull Connected to DB');
});
recipe_js_1.default.remove({}, function () { console.log('done'); });
// seeding
var hotCholocate = new recipe_js_1.default({
    _id: mongoose_1.default.Types.ObjectId(),
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
hotCholocate.save(function (err, item) {
    if (err)
        return console.error(err);
    return console.log(item);
});
