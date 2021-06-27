"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var argon2 = __importStar(require("argon2"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_js_1 = __importDefault(require("../model/user.js"));
var jwtCheck_js_1 = __importDefault(require("../middleware/jwtCheck.js"));
var router = express_1.default.Router();
var generateJWT = function (user) {
    var data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        approved: user.approved,
    };
    var signature = process.env.SIGNATURE;
    var expiration = '1h';
    return jsonwebtoken_1.default.sign({ data: data }, signature, { expiresIn: expiration });
};
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, userRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, argon2.hash(req.body.password)];
            case 1:
                hashedPassword = _a.sent();
                return [4 /*yield*/, user_js_1.default.create({
                        _id: mongoose_1.default.Types.ObjectId(),
                        password: hashedPassword,
                        username: req.body.username,
                        email: req.body.email,
                    })];
            case 2:
                userRecord = _a.sent();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    username: userRecord.username,
                    email: userRecord.email,
                }));
                return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRecord, correctPassword, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res.setHeader('Content-Type', 'application/json');
                return [4 /*yield*/, user_js_1.default.findOne({ username: req.body.username })];
            case 1:
                userRecord = _a.sent();
                if (!userRecord) {
                    res.status(401);
                    res.end(JSON.stringify({ token: undefined, error: 'User not found', authenicated: false }));
                    return [2 /*return*/, 0];
                }
                return [4 /*yield*/, argon2.verify(userRecord.password, req.body.password)];
            case 2:
                correctPassword = _a.sent();
                if (!correctPassword) {
                    res.status(401);
                    res.end(JSON.stringify({ token: undefined, error: 'Incorrect password', authenicated: false }));
                    return [2 /*return*/, 0];
                }
                if (!userRecord.approved) {
                    res.status(401);
                    res.end(JSON.stringify({ token: undefined, error: 'User not approved', authenicated: false }));
                    return [2 /*return*/, 0];
                }
                token = generateJWT(userRecord);
                userRecord.jwtToken = token;
                userRecord.save();
                res.cookie('token', token, { httpOnly: true });
                res.end(JSON.stringify({
                    user: {
                        email: userRecord.email,
                        name: userRecord.name,
                    },
                    token: token,
                }));
                return [2 /*return*/, 0];
        }
    });
}); });
router.get('/authenicated', jwtCheck_js_1.default, function (req, res) {
    res.end(JSON.stringify({ authenicated: true }));
});
router.delete('/logout', jwtCheck_js_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.statusCode !== 401)) return [3 /*break*/, 2];
                return [4 /*yield*/, user_js_1.default.findByIdAndUpdate(req.jwtPayload.data._id, { jwtToken: '' })];
            case 1:
                _a.sent();
                res.status(200);
                res.end(JSON.stringify({ message: 'Logout Successful' }));
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
