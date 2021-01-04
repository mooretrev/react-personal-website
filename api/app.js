import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import mealPlanRouter from './routes/mealPlan.js';
import powerliftingRouter from './routes/powerlifting.js';
import recipesRouter from './routes/recipes.js';
import indexRouter from './routes/index.js';
import dirnamePath from './dirname.cjs';

// .env config
dotenv.config({ path: `${dirnamePath}/.env` });

// connect to mongodb
if (process.env.NODE_ENV !== 'test') {
  const url = `mongodb+srv://Personal-Website:${process.env.MONGO_DB_PASSWORD}@cluster0.e4wxl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
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
// app.set('views', path.join(dirnamePath, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: appOrigin }));

app.use(express.static(path.join(dirnamePath, '../client/build')));

app.use('/', indexRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/powerlifting', powerliftingRouter);
app.use('/api/mealplan', mealPlanRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(dirnamePath, '../client/build', 'index.html'));
  });
}

// Serve any static files
// Handle React routing, return all requests to React app

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
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
