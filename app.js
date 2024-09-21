const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

// MIDDLEWARE
app.use(express.json());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
// error handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`cant find url ${req.originalUrl} on server`, 404));
});
// Global Error handler
app.use(globalErrorHandler);
module.exports = app;
