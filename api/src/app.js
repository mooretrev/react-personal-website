import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import restfulRouter from './routes/restfulRouter.js';
import Recipe from './model/recipe.js';
import MealPlan from './model/mealPlan';
import Powerlifting from './model/powerlifting.js';
import StockPosition from './routes/stockPosition';
import authRouter from './routes/auth.js';
import scheduleTasks from './scheduleTasks';

// .env config
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// connect to mongodb
if (process.env.NODE_ENV !== 'test') {
  const url = process.env.MONGO_URL;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  /* eslint-disable-next-line no-console */
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    /* eslint-disable-next-line no-console */
    console.log('Sucessfull Connected to DB');
  });
}

const appOrigin = process.env.APP_ORIGIN;

// setup expresss
const app = express();

// view engine setup
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: appOrigin }));

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/recipes', restfulRouter(Recipe));
app.use('/api/powerlifting', restfulRouter(Powerlifting));
app.use('/api/mealplan', restfulRouter(MealPlan));
app.use('/api/stockpositions', StockPosition);
app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

/**
 * Schedule periodic tasks
 */
scheduleTasks();

// Serve any static files
// Handle React routing, return all requests to React app

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
/* eslint-disable no-unused-vars */
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  /* eslint-disable-next-line no-console */
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
