"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var jwtCheck_js_1 = __importDefault(require("../middleware/jwtCheck.js"));
var approvedUser_js_1 = __importDefault(require("../middleware/approvedUser.js"));
function restfulRouter(model) {
    var router = express_1.default.Router();
    /* eslint-disable no-unused-vars */
    /* eslint-disable no-undef */
    router.get('/', function (req, res, next) {
        model.find(function (err, response) {
            if (err)
                return res.status(404);
            var responseJson = JSON.stringify(response);
            res.send(responseJson);
            return 0;
        });
    });
    router.get('/:id', jwtCheck_js_1.default, approvedUser_js_1.default, function (req, res, next) {
        var token = req.headers.authorization;
        model.findById(req.params.id, function (err, response) {
            if (err)
                return res.status(404);
            var responseJson = JSON.stringify(response);
            if (response == null) {
                res.sendStatus(404);
                return 0;
            }
            res.end(responseJson);
            return 0;
        });
    });
    router.post('/', jwtCheck_js_1.default, approvedUser_js_1.default, function (req, res, next) {
        var modelBody = req.body;
        modelBody._id = mongoose_1.default.Types.ObjectId();
        model.create(modelBody, function (err, response) {
            if (err)
                return handleError(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
            return 0;
        });
    });
    router.put('/:id', jwtCheck_js_1.default, approvedUser_js_1.default, function (req, res, next) {
        var responseBody = req.body;
        model.findOneAndUpdate({ _id: req.params.id }, responseBody, function (err, doc) {
            if (err)
                return handleError(err);
            res.end(JSON.stringify(doc));
            return 0;
        });
    });
    router.delete('/:id', jwtCheck_js_1.default, approvedUser_js_1.default, function (req, res, next) {
        model.deleteOne({ _id: req.params.id }, function (err) {
            if (err)
                return res.status(404);
            res.end('Successful Deletion');
            return 0;
        });
    });
    return router;
}
exports.default = restfulRouter;
