"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var restfulRouter_js_1 = __importDefault(require("./routes/restfulRouter.js"));
var recipe_js_1 = __importDefault(require("./model/recipe.js"));
var mealPlan_js_1 = __importDefault(require("./model/mealPlan.js"));
var powerlifting_js_1 = __importDefault(require("./model/powerlifting.js"));
var index_js_1 = __importDefault(require("./routes/index.js"));
var auth_js_1 = __importDefault(require("./routes/auth.js"));
var dirname_cjs_1 = __importDefault(require("./dirname.cjs"));
// .env config
dotenv_1.default.config({ path: dirname_cjs_1.default + "/.env" });
// connect to mongodb
if (process.env.NODE_ENV !== 'test') {
    var url = "mongodb+srv://Personal-Website:" + process.env.MONGO_DB_PASSWORD + "@cluster0.e4wxl.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
    mongoose_1.default.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    var db = mongoose_1.default.connection;
    /* eslint-disable-next-line no-console */
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        /* eslint-disable-next-line no-console */
        console.log('Sucessfull Connected to DB');
    });
}
var appOrigin = process.env.APP_ORIGIN;
// setup expresss
var app = express_1.default();
// view engine setup
// app.set('views', path.join(dirnamePath, 'views'));
app.set('view engine', 'jade');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(cors_1.default({ origin: appOrigin }));
app.use(express_1.default.static(path_1.default.join(dirname_cjs_1.default, '../client/build')));
app.use('/', index_js_1.default);
app.use('/api/recipes', restfulRouter_js_1.default(recipe_js_1.default));
app.use('/api/powerlifting', restfulRouter_js_1.default(powerlifting_js_1.default));
app.use('/api/mealplan', restfulRouter_js_1.default(mealPlan_js_1.default));
app.use('/api/auth', auth_js_1.default);
if (process.env.NODE_ENV === 'production') {
    app.get('/*', function (req, res) {
        res.sendFile(path_1.default.join(dirname_cjs_1.default, '../client/build', 'index.html'));
    });
}
// Serve any static files
// Handle React routing, return all requests to React app
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
/* eslint-disable no-unused-vars */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    /* eslint-disable-next-line no-console */
    console.log(err.message);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
